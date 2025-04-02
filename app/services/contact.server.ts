import nodemailer from 'nodemailer';
import { calculateTotalLoanAmount, calculateTotalRentAmount } from '../utils/loan-calculator';

type ContactFormData = {
  name: string;
  email: string;
  phone?: string;
  message?: string;
  propertyTitle?: string;
  propertyId?: string;
  assignedAgent?: string;
  inquiryType?: string;
  inquiryContent?: string;
  age?: string;
  birthYear?: string;
  rent?: string;
  annualIncome?: string;
  [key: string]: string | undefined;
};

/**
 * 年齢から生年（西暦）を計算する
 * @param age 年齢
 * @returns 生年（西暦）
 */
const calculateBirthYear = (age: number): number => {
  return new Date().getFullYear() - age;
};

/**
 * お問い合わせフォームのデータを保存し、メール通知を送信する
 * @param formData フォームデータ
 */
export async function saveContactForm(formData: ContactFormData) {
  try {
    // 環境変数からメール設定を取得
    const emailHost = process.env.SMTP_HOST || 'smtp.example.com';
    const emailPort = parseInt(process.env.SMTP_PORT || '587', 10);
    const emailUser = process.env.SMTP_USER || 'user@example.com';
    const emailPass = process.env.SMTP_PASS || 'password';
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';

    // 開発環境かどうかを確認（NODE_ENVが設定されていない場合は開発環境とみなす）
    const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

    // 管理者向けメール内容の基本部分
    let adminMailText = `以下の内容で、資産を試算「シサシサくん」からお問い合わせがありました。

新規のお客様がお待ちです。1営業日以内に【必ず返信・お電話】してください。

━━━ お問い合わせ内容 ━━━━━━━━━━━━━━━━
【お名前】${formData.name}
【電話番号】${formData.phone || '未入力'}
【メールアドレス】${formData.email}
【ご質問・ご要望】${formData.message || '特になし'}
`;

    // 顧客向け自動返信メール内容の基本部分
    let customerMailText = `※このメールはシステムからの自動返信です

${formData.name}様

お世話になっております。
LIVE THE LIFE株式会社 お客様サポート窓口です。

この度は、資産を試算「シサシサくん」をご利用いただきまして
誠にありがとうございます。

以下の内容でお問い合わせをお受けいたしましたので、

近日中に、弊社エキスパートよりあらためてご挨拶させていただきます。

━━━ お問い合わせ内容 ━━━━━━━━━━━━━━━━
【お名前】${formData.name}
【電話番号】${formData.phone || '未入力'}
【メールアドレス】${formData.email}
【ご質問・ご要望】
${formData.message || '特になし'}
`;

    if (formData.age) {
      let age = parseInt(formData.age, 10);
      let birthYear: number;

      if (formData.birthYear) {
        birthYear = parseInt(formData.birthYear, 10);
        age = new Date().getFullYear() - birthYear;
      } else {
        birthYear = calculateBirthYear(age);
      }

      const rent = formData.rent ? parseInt(formData.rent, 10) : 10;
      const annualIncome = formData.annualIncome ? parseInt(formData.annualIncome, 10) : 500;

      const years = 35;

      const estimatedAssetValue = Math.round(calculateTotalLoanAmount(rent));
      const lifeRentTotal = Math.round(calculateTotalRentAmount(rent, age));

      // 管理者向けメールに診断結果を追加
      adminMailText += `
━━━ お客様の基本情報 ━━━━━━━━━━━━━━━━━
【生年月日】${birthYear}年生まれ
【年齢】${age}歳
【毎月の家賃】${rent}万円台
【現在の年収】${annualIncome}万円
【診断結果】

月々【${rent}万円】を合計【${years}年】支払うとした場合、
おおよその資産【${estimatedAssetValue}万円】の住宅に住める試算です。

仮に、現在の賃貸に、平均寿命90歳まで住み続けた場合、
毎月【${rent}万円】の家賃を支払続けると支払総額は【約${lifeRentTotal}万円】です。

※上記はあくまで簡易資産による概算値となります。あらかじめご了承ください。
`;

      // 顧客向けメールに診断結果を追加
      customerMailText += `
━━━ 資産の診断結果 ━━━━━━━━━━━━━━━━━━
【生年月日】${birthYear}年生まれ
【毎月の家賃】${rent}万円台
【現在の年収】${annualIncome}万円
【診断結果】
年齢${age}歳、家賃${rent}万円のあなたは…

月々【${rent}万円】を合計【${years}年】支払うとした場合、
おおよその資産【${estimatedAssetValue}万円】の住宅に住める試算です。

仮に、現在の賃貸に、平均寿命90歳まで住み続けた場合、
毎月【${rent}万円】の家賃を支払続けると支払総額【約${lifeRentTotal}万円】です。

※上記はあくまで簡易資産による概算値となります。あらかじめご了承ください。
`;
    }

    // 管理者向けメールのフッター
    adminMailText += `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

以上、ご確認のほどよろしくお願いいたします。`;

    // 顧客向けメールのフッター
    customerMailText += `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

その他、ご不明点、追加のご質問等がございましたら、

<a href="https://ltlx.jp/contact/">こちらのフォーム</a>よりお気軽にお問い合わせください。

———————————————————————

LIVE THE LIFE株式会社

お客様サポート窓口「シサシサくん係」

MAIL：info@ltlx.jp

公式HP：<a href="https://ltlx.jp">https://ltlx.jp</a>

———————————————————————`;

    const customerMailHtml = customerMailText;

    if (!isDevelopment) {
      // 開発環境では実際のメール送信をスキップし、コンソールにログを出力
      console.log('\n===== 開発モード: メール送信がシミュレートされました =====');
      console.log('\n【管理者向けメール】');
      console.log(`宛先: ${adminEmail}`);
      console.log(`件名: 【反響営業】資産を試算「シサシサくん」からのお問い合わせ`);
      console.log('本文:');
      console.log(adminMailText);

      console.log('\n【顧客向けメール】');
      console.log(`宛先: ${formData.email}`);
      console.log('件名: 【資産を試算「シサシサくん」】お問い合わせを承りました');
      console.log('本文:');
      console.log(customerMailText);
      console.log('\n===== メールシミュレーション終了 =====\n');
    } else {
      // 本番環境では実際にメールを送信
      const transporter = nodemailer.createTransport({
        host: emailHost,
        port: emailPort,
        secure: emailPort === 465,
        auth: {
          user: emailUser,
          pass: emailPass,
        },
      });

      // 管理者向けメールを送信
      await transporter.sendMail({
        from: `"シサシサくん" <${emailUser}>`,
        to: adminEmail,
        subject: `【反響営業】資産を試算「シサシサくん」からのお問い合わせ`,
        text: adminMailText,
      });

      // 顧客向け自動返信メールを送信
      await transporter.sendMail({
        from: `"LIVE THE LIFE株式会社" <${emailUser}>`,
        to: formData.email,
        subject: '【資産を試算「シサシサくん」】お問い合わせを承りました',
        text: customerMailText,
        html: customerMailHtml,
      });
    }

    return { success: true };
  } catch (error) {
    console.error('Error sending contact form emails:', error);
    throw new Error('メール送信中にエラーが発生しました。時間をおいて再度お試しください。');
  }
}
