import { json, ActionFunction } from '@remix-run/node';
import { saveContactForm } from '~/services/contact.server';
import { verifyRecaptcha } from '~/services/recaptcha.server';

/**
 * お問い合わせフォームの送信を処理するAPIエンドポイント
 */
export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData) as unknown as {
    name: string;
    email: string;
    phone?: string;
    message?: string;
    propertyTitle?: string;
    propertyId?: string;
    assignedAgent?: string;
    inquiryType?: string;
    inquiryContent?: string;
    recaptchaToken?: string;
    [key: string]: string | undefined;
  };

  const errors: Record<string, string> = {};

  if (!data.name) {
    errors.name = 'お名前を入力してください';
  }

  if (!data.email) {
    errors.email = 'メールアドレスを入力してください';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = '正しいメールアドレスを入力してください';
  }

  if (!data.message) {
    data.message = '未入力';
  }

  if (data.inquiryType === 'other' && !data.inquiryContent) {
    errors.inquiryContent = 'その他の内容を入力してください';
  }

  // reCAPTCHAトークンのバリデーション
  if (!data.recaptchaToken) {
    errors.recaptchaToken = 'reCAPTCHAの確認が必要です';
  } else {
    try {
      // reCAPTCHAの検証
      const recaptchaValid = await verifyRecaptcha(data.recaptchaToken);
      if (!recaptchaValid) {
        errors.recaptchaToken = 'reCAPTCHAの検証に失敗しました。もう一度お試しください。';
      }
    } catch (error) {
      console.error('reCAPTCHA検証エラー:', error);
      errors.recaptchaToken = 'reCAPTCHAの検証に失敗しました。もう一度お試しください。';
    }
  }

  if (Object.keys(errors).length > 0) {
    return json({ errors, success: false }, { status: 400 });
  }

  try {
    await saveContactForm({
      ...data,
      message: data.message,
    });

    return json(
      {
        success: true,
        message: 'お問い合わせ誠にありがとうございます。お問い合わせを受け付けました。',
        errors: null,
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-cache',
        },
      }
    );
  } catch (error) {
    return json(
      {
        success: false,
        errors: {
          _form:
            error instanceof Error
              ? error.message
              : 'エラーが発生しました。時間をおいて再度お試しください。',
        },
      },
      {
        status: 500,
      }
    );
  }
};
