import { Badge } from '../../../components/ui/badge';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Textarea } from '../../../components/ui/textarea';
import { formFields, formSchema } from '../../../constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { CTAButton } from '../../../components/features/CTAButton';
import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { useFetcher } from '@remix-run/react';
import { getUserData } from '../../../utils/storage';
import { ClientOnly } from '~/components/ClientOnly';

// 遅延読み込み用のimportに変更
const ReactGoogleRecaptcha = lazy(() => import('react-google-recaptcha'));

type FormValues = z.infer<typeof formSchema>;
type FormField = {
  id: string;
  label: string;
  placeholder: string;
  required: boolean;
};

// fetcherのレスポンスの型定義
type FetcherResponse = {
  success?: boolean;
  message?: string;
  errors?: Record<string, string>;
};

// クライアント側のグローバル環境変数の型定義
declare global {
  interface Window {
    ENV: {
      RECAPTCHA_SITE_KEY: string;
    };
    grecaptcha?: {
      render: (...args: any[]) => any;
      reset: (id?: number) => void;
      execute: (id?: number) => void;
      ready: (callback: () => void) => void;
    };
  }
}

// reCAPTCHAコンポーネント（遅延読み込み）
const RecaptchaComponent = ({
  onChange,
  siteKey,
}: {
  onChange: (token: string | null) => void;
  siteKey: string;
}) => {
  const [isRecaptchaLoaded, setIsRecaptchaLoaded] = useState(false);
  const recaptchaRef = useRef<any>(null);

  // reCAPTCHAが読み込まれているか確認
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkRecaptchaLoaded = () => {
        // windowオブジェクトのgrecaptchaプロパティをオプショナルチェーンで確認
        if (window?.grecaptcha?.render) {
          setIsRecaptchaLoaded(true);
        } else {
          // 100ms後に再試行
          setTimeout(checkRecaptchaLoaded, 100);
        }
      };

      checkRecaptchaLoaded();
    }
  }, []);

  if (!isRecaptchaLoaded) {
    return (
      <div className="flex h-[78px] w-full items-center justify-center bg-gray-100">
        reCAPTCHA読み込み中...
      </div>
    );
  }

  // Suspenseを使用してreCAPTCHAコンポーネントを表示
  return (
    <Suspense
      fallback={
        <div className="flex h-[78px] w-full items-center justify-center bg-gray-100">
          reCAPTCHA読み込み中...
        </div>
      }
    >
      <ReactGoogleRecaptcha
        ref={recaptchaRef}
        sitekey={siteKey}
        onChange={onChange}
        hl="ja"
      />
    </Suspense>
  );
};

export const FormSection = (): JSX.Element => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const fetcher = useFetcher<FetcherResponse>();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  // クライアントサイドでのみ実行されるように条件分岐を追加
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // fetcher の状態を監視して UI を更新
      if (fetcher.state === 'submitting') {
        setIsSubmitting(true);
      } else if (fetcher.state === 'idle' && fetcher.data) {
        setIsSubmitting(false);
        if (fetcher.data.success) {
          setSubmitSuccess(true);
          reset();
        } else if (fetcher.data.errors) {
          setSubmitError(
            Object.values(fetcher.data.errors).join('\n') || 'お問い合わせの送信に失敗しました'
          );
        }
      }
    }
  }, [fetcher.state, fetcher.data, reset]);

  const onSubmit = async (data: FormValues) => {
    try {
      if (!recaptchaToken) {
        setSubmitError('reCAPTCHAの確認を行ってください');
        return;
      }

      setIsSubmitting(true);
      setSubmitError(null);

      // URLパラメータから追加情報を取得
      const searchParams = new URLSearchParams(window.location.search);
      const ageParam = searchParams.get('age');
      const birthYearParam = searchParams.get('birthYear');
      const rentParam = searchParams.get('rent');
      const incomeParam = searchParams.get('income');

      // ローカルストレージから保存されたユーザーデータを取得
      const userData = getUserData();

      // 追加情報をフォームデータに追加
      const formData = new FormData();

      // 基本フォームデータ
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value as string);
        }
      });

      // データ優先順位: URLパラメータ > ローカルストレージ
      // 年齢情報
      if (ageParam) {
        formData.append('age', ageParam);
      } else if (userData.age) {
        formData.append('age', userData.age);
      }

      // 生年情報
      if (birthYearParam) {
        formData.append('birthYear', birthYearParam);
      } else if (userData.birthYear) {
        formData.append('birthYear', userData.birthYear);
      }

      // 家賃情報
      if (rentParam) {
        formData.append('rent', rentParam);
      } else if (userData.rent) {
        formData.append('rent', userData.rent);
      }

      // 年収情報
      if (incomeParam) {
        formData.append('annualIncome', incomeParam);
      } else if (userData.income) {
        formData.append('annualIncome', userData.income);
      }

      // reCAPTCHAトークンをフォームデータに追加
      formData.append('recaptchaToken', recaptchaToken);

      // fetcher を使用してフォームデータを送信
      fetcher.submit(formData, { method: 'post', action: '/api/contact' });
    } catch (error) {
      console.error('Error:', error);
      setSubmitError(error instanceof Error ? error.message : 'お問い合わせの送信に失敗しました');
      setIsSubmitting(false);
    }
  };

  // reCAPTCHAの変更ハンドラー
  const handleRecaptchaChange = (token: string | null) => {
    if (token) {
      setRecaptchaToken(token);
      setValue('recaptchaToken', token);
    } else {
      setRecaptchaToken(null);
      setValue('recaptchaToken', '');
    }
  };

  return (
    <div className="flex w-full flex-col items-center gap-6 px-8">
      <div className="w-full space-y-10">
        {submitSuccess ? (
          <div className="rounded-lg bg-green-50 p-4 text-center">
            <p className="text-base font-medium text-green-700">
              お問い合わせありがとうございます。
              <br />
              担当者より連絡させていただきます。
            </p>
          </div>
        ) : (
          <fetcher.Form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
            {formFields.map((field: FormField) => (
              <div key={field.id} className="flex w-full flex-col items-start gap-1">
                <div className="flex w-full items-center justify-between px-2 py-0">
                  <Label
                    htmlFor={field.id}
                    className="w-fit text-center text-xs font-medium leading-[18.6px] tracking-[1.20px]"
                  >
                    {field.label}
                  </Label>
                  <Badge
                    className={`${field.required ? 'bg-primary' : 'bg-[#eeeeee]'} rounded-[2px] px-2 py-0 shadow-none`}
                  >
                    <span
                      className={`w-fit text-center text-xs leading-[18.6px] tracking-[1.20px]`}
                    >
                      {field.required ? '必須' : '任意'}
                    </span>
                  </Badge>
                </div>
                <Input
                  id={field.id}
                  {...register(field.id as keyof FormValues)}
                  placeholder={field.placeholder}
                  className={`h-auto rounded-lg border border-solid tracking-normal ${
                    errors[field.id as keyof FormValues] ? 'border-red-500' : `border-[#999999]`
                  } bg-white px-4 py-2.5 text-base leading-[28.8px]`}
                />
                {errors[field.id as keyof FormValues] && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors[field.id as keyof FormValues]?.message}
                  </p>
                )}
              </div>
            ))}

            <div className="flex w-full flex-col items-start gap-1">
              <div className="flex w-full items-center justify-between px-2 py-0">
                <Label
                  htmlFor="message"
                  className="w-fit text-center text-xs font-medium leading-[18.6px] tracking-[1.20px]"
                >
                  ご質問・ご要望
                </Label>
                <Badge className="rounded-sm bg-[#eeeeee] px-2 py-0">
                  <span className="w-fit text-center text-xs leading-[18.6px] tracking-[1.20px]">
                    任意
                  </span>
                </Badge>
              </div>
              <Textarea
                id="message"
                {...register('message')}
                className={`h-[180px] rounded-lg border border-solid ${
                  errors.message ? 'border-red-500' : 'border-[#999999]'
                } bg-white px-4 py-2.5`}
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
              )}
            </div>

            <div className="flex w-full flex-col items-center gap-4">
              <ClientOnly
                fallback={
                  <div className="flex h-[78px] w-full items-center justify-center bg-gray-100">
                    reCAPTCHA読み込み中...
                  </div>
                }
              >
                {() => {
                  // window.ENVからreCAPTCHAのサイトキーを取得
                  const siteKey =
                    typeof window !== 'undefined' && window.ENV
                      ? window.ENV.RECAPTCHA_SITE_KEY
                      : '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'; // フォールバック

                  return <RecaptchaComponent onChange={handleRecaptchaChange} siteKey={siteKey} />;
                }}
              </ClientOnly>
              {errors.recaptchaToken && (
                <p className="mt-1 text-sm text-red-500">{errors.recaptchaToken.message}</p>
              )}
            </div>

            <div className="flex w-full flex-col items-center gap-3">
              <a
                href="https://mr-mr.jp/privacy/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit text-[10px] leading-[normal] tracking-normal text-[#0000ff] [font-family:'Inter',Helvetica]"
              >
                プライバシーポリシーについて
              </a>
              <CTAButton
                text={isSubmitting ? '送信中...' : '上記に同意して申し込む'}
                badgeText="無料"
                onSubmit={handleSubmit(onSubmit)}
                disabled={isSubmitting || !recaptchaToken}
              />
            </div>

            {submitError && (
              <div className="rounded-lg bg-red-50 p-4">
                <p className="text-sm font-bold text-red-500">{submitError}</p>
              </div>
            )}

            {Object.keys(errors).length > 0 && (
              <div className="rounded-lg bg-red-50 p-4">
                <p className="text-sm font-bold text-red-500">
                  入力内容に誤りがあります。確認してください。
                </p>
              </div>
            )}
          </fetcher.Form>
        )}
      </div>
    </div>
  );
};
