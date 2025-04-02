import { lazy, useRef, useState, Suspense, useEffect, useCallback } from 'react';
import { useFetcher } from '@remix-run/react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { formFields, formSchema } from '../../constants';
import { CTAButton } from '../features/CTAButton';
import { getUserData } from '../../utils/storage';
import { ClientOnly } from '../../utils/components/ClientOnly';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

const ReactGoogleRecaptcha = lazy(() => import('react-google-recaptcha'));

type FormValues = z.infer<typeof formSchema>;
type FormField = {
  id: string;
  label: string;
  placeholder: string;
  required: boolean;
};

type FetcherResponse = {
  success?: boolean;
  message?: string;
  errors?: Record<string, string>;
};

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

const RecaptchaComponent = ({
  onChange,
  siteKey,
}: {
  onChange: (token: string | null) => void;
  siteKey: string;
}) => {
  const [isRecaptchaLoaded, setIsRecaptchaLoaded] = useState(false);
  const recaptchaRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkRecaptchaLoaded = () => {
        if (window?.grecaptcha?.render) {
          setIsRecaptchaLoaded(true);
        } else {
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

  return (
    <Suspense
      fallback={
        <div className="flex h-[78px] w-full items-center justify-center bg-gray-100">
          reCAPTCHA読み込み中...
        </div>
      }
    >
      <ReactGoogleRecaptcha ref={recaptchaRef} sitekey={siteKey} onChange={onChange} hl="ja" />
    </Suspense>
  );
};

const FormContent = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const fetcher = useFetcher<FetcherResponse>();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      return;
    }

    const token = await executeRecaptcha('contact_form');
    setRecaptchaToken(token);
    setValue('recaptchaToken', token);
  }, [executeRecaptcha, setValue]);

  useEffect(() => {
    handleReCaptchaVerify();
  }, [handleReCaptchaVerify]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
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

      const searchParams = new URLSearchParams(window.location.search);
      const ageParam = searchParams.get('age');
      const birthYearParam = searchParams.get('birthYear');
      const rentParam = searchParams.get('rent');
      const incomeParam = searchParams.get('income');

      const userData = getUserData();

      const formData = new FormData();

      formData.append('recaptchaToken', recaptchaToken);

      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value as string);
        }
      });

      if (ageParam) {
        formData.append('age', ageParam);
      } else if (userData.age) {
        formData.append('age', userData.age);
      }

      if (birthYearParam) {
        formData.append('birthYear', birthYearParam);
      } else if (userData.birthYear) {
        formData.append('birthYear', userData.birthYear);
      }

      if (rentParam) {
        formData.append('rent', rentParam);
      } else if (userData.rent) {
        formData.append('rent', userData.rent);
      }

      if (incomeParam) {
        formData.append('annualIncome', incomeParam);
      } else if (userData.income) {
        formData.append('annualIncome', userData.income);
      }

      fetcher.submit(formData, { method: 'post', action: '/api/contact' });
    } catch (error) {
      console.error('Error:', error);
      setSubmitError(error instanceof Error ? error.message : 'お問い合わせの送信に失敗しました');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex w-full flex-col items-center gap-6 px-8 pb-16">
      <div className="w-full space-y-10">
        {submitSuccess ? (
          <div className="rounded-lg bg-green-50 p-4 text-center">
            <p className="p-3 text-sm font-medium text-green-700">
              お問い合わせありがとうございました。
              <br />
              ご担当者よりご連絡しますので
              <br />
              しばらくお待ちください。
            </p>
          </div>
        ) : (
          <fetcher.Form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
            {recaptchaToken && <input type="hidden" name="recaptchaToken" value={recaptchaToken} />}
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
                    <span className="w-fit text-center text-xs leading-[18.6px] tracking-[1.20px]">
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
                type="submit"
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

export const FormSection = (): JSX.Element => {
  return <ClientOnly fallback={<div>Loading...</div>}>{() => <FormContent />}</ClientOnly>;
};
