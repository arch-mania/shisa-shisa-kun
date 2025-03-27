import { saveContactForm } from '../services/contact.server';
import { formSchema } from '../constants';

export async function POST(request: Request) {
  try {
    // リクエストからJSONデータを取得
    const body = await request.json();

    // zod schemaを使用してバリデーション
    const validationResult = formSchema.safeParse(body);

    if (!validationResult.success) {
      return Response.json(
        {
          message: 'バリデーションエラー',
          errors: validationResult.error.format(),
        },
        { status: 400 }
      );
    }

    // 追加フィールドを含むデータ
    const formData = {
      ...validationResult.data,
      age: body.age,
      rent: body.rent,
      annualIncome: body.annualIncome,
    };

    // メール送信処理
    await saveContactForm(formData);

    return Response.json(
      {
        message: 'お問い合わせありがとうございます。担当者より連絡させていただきます。',
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact API error:', error);

    let message = 'お問い合わせの送信に失敗しました。時間をおいて再度お試しください。';
    if (error instanceof Error) {
      message = error.message;
    }

    return Response.json(
      {
        message,
        success: false,
      },
      { status: 500 }
    );
  }
}
