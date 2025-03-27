import { Badge } from '../../../components/ui/badge';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Textarea } from '../../../components/ui/textarea';
import { formFields, formSchema } from '../../../constants';
import { UnderlinedText } from '../../../components/ui/underline-text';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { CTAButton } from '../../../components/features/CTAButton';
import { useState } from 'react';

type FormValues = z.infer<typeof formSchema>;
type FormField = {
  id: string;
  label: string;
  placeholder: string;
  required: boolean;
};

export const FormSection = (): JSX.Element => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);
      
      // URLパラメータから追加情報を取得
      const searchParams = new URLSearchParams(window.location.search);
      const ageParam = searchParams.get('age');
      const rentParam = searchParams.get('rent');
      const incomeParam = searchParams.get('income');
      
      // 追加情報をフォームデータに追加
      const formData = {
        ...data,
        age: ageParam || undefined,
        rent: rentParam || undefined,
        annualIncome: incomeParam || undefined
      };
      
      console.log('送信データ:', formData);
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'お問い合わせの送信に失敗しました');
      }
      
      // 送信成功
      setSubmitSuccess(true);
      reset(); // フォームをリセット
    } catch (error) {
      console.error('Error:', error);
      setSubmitError(error instanceof Error ? error.message : 'お問い合わせの送信に失敗しました');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex w-full flex-col items-center gap-6 px-8">
      <div className="w-full space-y-10">
        <div className="w-full space-y-4 text-center">
          <p className="text-text tracking-0 text-center text-[32px] font-bold leading-[44.8px]">
            専門家に
            <br />
            <UnderlinedText>無料相談</UnderlinedText>ができます
          </p>
          <p className="text-center text-sm leading-[160%] tracking-widest">
            お家に関わる「将来資金対策」を
            <br />
            丁寧にサポートします
          </p>
        </div>
        
        {submitSuccess ? (
          <div className="rounded-lg bg-green-50 p-4 text-center">
            <p className="text-green-700 text-base font-medium">
              お問い合わせありがとうございます。担当者より連絡させていただきます。
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
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
                    <span className={`w-fit text-center text-xs leading-[18.6px] tracking-[1.20px]`}>
                      {field.required ? '必須' : '任意'}
                    </span>
                  </Badge>
                </div>
                <Input
                  id={field.id}
                  {...register(field.id as keyof FormValues)}
                  placeholder={field.placeholder}
                  className={`tracking-0 h-auto rounded-lg border border-solid ${
                    errors[field.id as keyof FormValues] ? 'border-red-500' : `border-[#999999]`
                  } bg-white px-4 py-2.5 text-base leading-[28.8px]`}
                />
                {errors[field.id as keyof FormValues] && (
                  <p className="text-red-500 mt-1 text-sm">
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
              {errors.message && <p className="text-red-500 mt-1 text-sm">{errors.message.message}</p>}
            </div>
            
            <div className="flex w-full flex-col items-center gap-3">
              <a
                href="https://mr-mr.jp/privacy/"
                target="_blank"
                rel="noopener noreferrer"
                className="tracking-0 w-fit text-[10px] leading-[normal] text-[#0000ff] [font-family:'Inter',Helvetica]"
              >
                プライバシーポリシーについて
              </a>
              <CTAButton
                text={isSubmitting ? '送信中...' : '送信する'}
                badgeText="無料"
                onSubmit={handleSubmit(onSubmit)}
                disabled={isSubmitting}
              />
            </div>

            {submitError && (
              <div className="rounded-lg bg-red-50 p-4">
                <p className="text-red-500 text-sm font-bold">
                  {submitError}
                </p>
              </div>
            )}
            
            {Object.keys(errors).length > 0 && (
              <div className="rounded-lg bg-red-50 p-4">
                <p className="text-red-500 text-sm font-bold">
                  入力内容に誤りがあります。確認してください。
                </p>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
};
