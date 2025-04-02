/**
 * reCAPTCHAトークンを検証するためのユーティリティ
 */

/**
 * Google reCAPTCHA APIを使用してトークンを検証する
 * @param token reCAPTCHAトークン
 * @returns 検証が成功したかどうか
 */
export async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    console.error('RECAPTCHA_SECRET_KEY is not set');
    return false;
  }

  return getRecaptchaScore(token, secretKey);
}

/**
 * Google reCAPTCHA APIにリクエストを送信してスコアを取得する
 * @param token reCAPTCHAトークン
 * @param key シークレットキー
 * @returns スコアが0.5を超える場合true
 */
async function getRecaptchaScore(token: string, key: string): Promise<boolean> {
  let res;
  const captchData = new URLSearchParams({
    secret: key,
    response: token,
  });

  try {
    res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: captchData,
    });

    res = await res.json();
  } catch (e) {
    console.log('recaptcha error:', e);
  }

  if (res && res.success && res.score > 0.5) {
    return true;
  } else {
    return false;
  }
}
