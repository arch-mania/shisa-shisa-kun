/**
 * reCAPTCHAトークンを検証するためのサーバーサイドサービス
 */

/**
 * Google reCAPTCHA APIを使用してトークンを検証する
 * @param token reCAPTCHAトークン
 * @returns 検証が成功したかどうか
 */
export async function verifyRecaptcha(token: string): Promise<boolean> {
  try {
    // 開発環境かどうかを確認
    const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
    
    // テスト用トークンの場合は常に成功とする（開発環境のみ）
    if (isDevelopment && token === '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI') {
      console.log('開発環境: reCAPTCHA検証をスキップします');
      return true;
    }
    
    // 環境変数からreCAPTCHAシークレットキーを取得
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    
    if (!secretKey) {
      console.error('RECAPTCHA_SECRET_KEYが設定されていません');
      return false;
    }
    
    // Google reCAPTCHA APIにリクエストを送信
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
      }).toString(),
    });
    
    // レスポンスをJSONとして解析
    const data = await response.json();
    
    // 検証が成功したかどうかを返す
    return data.success === true;
  } catch (error) {
    console.error('reCAPTCHA検証中にエラーが発生しました:', error);
    return false;
  }
} 