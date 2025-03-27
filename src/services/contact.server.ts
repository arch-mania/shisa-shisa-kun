import { sendEmail } from '../lib/email.server';
import { FormData } from '../types';

class EmailError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly target: 'admin' | 'user',
    public readonly originalError?: unknown
  ) {
    super(message);
    this.name = 'EmailError';
  }
}

export const saveContactForm = async (data: FormData) => {
  try {
    try {
      await sendEmail({
        to: process.env.ADMIN_EMAIL as string,
        subject: `【シサシサくん】${data.name}様よりお問い合わせがありました`,
        text: `新規のお問い合わせがありました。

────────────────────
お名前(カナ): ${data.name}
メールアドレス: ${data.email}
電話番号: ${data.phone ? `${data.phone}` : `-`}
ご要望/確認事項: ${data.message || '-'}

${data.age ? `年齢:${data.age}` : ''}
${data.rent ? `家賃:${data.rent}` : ''}
${data.annualIncome ? `年収:${data.annualIncome}` : ''}
────────────────────`,
      });
    } catch (error) {
      throw new EmailError(
        '管理者向けメールの送信に失敗しました',
        'ADMIN_EMAIL_FAILED',
        'admin',
        error
      );
    }

    // ユーザー向けメールの送信
    try {
      await sendEmail({
        to: data.email,
        subject: '【シサシサくん】お問い合わせありがとうございます',
        text: `${data.name} 様

お問い合わせいただき、ありがとうございます。
以下の内容で承りました。
担当者より順次ご連絡させていただきます。

────────────────────
お名前(カナ): ${data.name}
メールアドレス: ${data.email}
電話番号: ${data.phone ? `${data.phone}` : `-`}
ご要望/確認事項: ${data.message || '-'}

${data.age ? `年齢:${data.age}` : ''}
${data.rent ? `家賃:${data.rent}` : ''}
${data.annualIncome ? `年収:${data.annualIncome}` : ''}
────────────────────
  
※このメールは自動送信されています。
※返信はお受けできませんので、ご了承ください。
`,
      });
    } catch (error) {
      throw new EmailError(
        'お客様向け自動返信メールの送信に失敗しました',
        'USER_EMAIL_FAILED',
        'user',
        error
      );
    }
  } catch (error) {
    console.error('Contact form save error:', error);

    if (error instanceof EmailError) {
      let userMessage = '';

      if (error.target === 'admin') {
        userMessage =
          'お問い合わせの受付処理に失敗しました。お手数ですが、時間をおいて再度お試しいただくか、お電話にてお問い合わせください。';
      } else {
        userMessage =
          '確認メールの送信に失敗しました。お問い合わせは受け付けていますので、担当者から別途ご連絡させていただきます。';
      }

      throw new Error(userMessage);
    }

    throw new Error('予期せぬエラーが発生しました。お手数ですが、時間をおいて再度お試しください。');
  }
};
