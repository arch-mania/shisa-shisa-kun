import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    const data = await resend.emails.send({
      from: 'Shisa Shisa Kun <onboarding@resend.dev>',
      to: ['recipient@example.com'],
      subject: `新しい問い合わせ: ${name}様より`,
      text: `
      名前: ${name}
      メールアドレス: ${email}
      メッセージ:
      ${message}
      `,
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
