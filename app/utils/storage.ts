/**
 * ブラウザストレージユーティリティ
 * LocalStorage、SessionStorage、Cookieを使用するための便利な関数群
 */

// ストレージのキープレフィックス（アプリケーション固有の識別子）
const STORAGE_PREFIX = 'shisa-shisa-kun-';

/**
 * LocalStorageに値を保存する
 * @param key キー名
 * @param value 保存する値
 */
export const saveToLocalStorage = <T>(key: string, value: T): void => {
  try {
    const prefixedKey = STORAGE_PREFIX + key;
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(prefixedKey, serializedValue);
  } catch (error) {
    console.error('LocalStorageへの保存に失敗しました:', error);
  }
};

/**
 * LocalStorageから値を取得する
 * @param key キー名
 * @param defaultValue デフォルト値
 * @returns 保存されている値またはデフォルト値
 */
export const getFromLocalStorage = <T>(key: string, defaultValue?: T): T | undefined => {
  try {
    const prefixedKey = STORAGE_PREFIX + key;
    const serializedValue = localStorage.getItem(prefixedKey);
    if (serializedValue === null) return defaultValue;
    return JSON.parse(serializedValue) as T;
  } catch (error) {
    console.error('LocalStorageからの取得に失敗しました:', error);
    return defaultValue;
  }
};

/**
 * LocalStorageから項目を削除する
 * @param key キー名
 */
export const removeFromLocalStorage = (key: string): void => {
  try {
    const prefixedKey = STORAGE_PREFIX + key;
    localStorage.removeItem(prefixedKey);
  } catch (error) {
    console.error('LocalStorageからの削除に失敗しました:', error);
  }
};

/**
 * SessionStorageに値を保存する
 * @param key キー名
 * @param value 保存する値
 */
export const saveToSessionStorage = <T>(key: string, value: T): void => {
  try {
    const prefixedKey = STORAGE_PREFIX + key;
    const serializedValue = JSON.stringify(value);
    sessionStorage.setItem(prefixedKey, serializedValue);
  } catch (error) {
    console.error('SessionStorageへの保存に失敗しました:', error);
  }
};

/**
 * SessionStorageから値を取得する
 * @param key キー名
 * @param defaultValue デフォルト値
 * @returns 保存されている値またはデフォルト値
 */
export const getFromSessionStorage = <T>(key: string, defaultValue?: T): T | undefined => {
  try {
    const prefixedKey = STORAGE_PREFIX + key;
    const serializedValue = sessionStorage.getItem(prefixedKey);
    if (serializedValue === null) return defaultValue;
    return JSON.parse(serializedValue) as T;
  } catch (error) {
    console.error('SessionStorageからの取得に失敗しました:', error);
    return defaultValue;
  }
};

/**
 * SessionStorageから項目を削除する
 * @param key キー名
 */
export const removeFromSessionStorage = (key: string): void => {
  try {
    const prefixedKey = STORAGE_PREFIX + key;
    sessionStorage.removeItem(prefixedKey);
  } catch (error) {
    console.error('SessionStorageからの削除に失敗しました:', error);
  }
};

/**
 * Cookieに値を保存する
 * @param key キー名
 * @param value 保存する値
 * @param days 有効期限（日数）
 */
export const setCookie = (key: string, value: string, days = 30): void => {
  try {
    const prefixedKey = STORAGE_PREFIX + key;
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);

    const cookieValue = encodeURIComponent(value) + 
      (days ? `; expires=${expirationDate.toUTCString()}` : '') + 
      '; path=/';
    
    document.cookie = `${prefixedKey}=${cookieValue}`;
  } catch (error) {
    console.error('Cookieの設定に失敗しました:', error);
  }
};

/**
 * Cookieから値を取得する
 * @param key キー名
 * @returns 保存されている値
 */
export const getCookie = (key: string): string | null => {
  try {
    const prefixedKey = STORAGE_PREFIX + key;
    const nameEQ = prefixedKey + '=';
    const cookies = document.cookie.split(';');
    
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1, cookie.length);
      }
      
      if (cookie.indexOf(nameEQ) === 0) {
        return decodeURIComponent(cookie.substring(nameEQ.length, cookie.length));
      }
    }
    return null;
  } catch (error) {
    console.error('Cookieの取得に失敗しました:', error);
    return null;
  }
};

/**
 * Cookieから項目を削除する
 * @param key キー名
 */
export const removeCookie = (key: string): void => {
  try {
    const prefixedKey = STORAGE_PREFIX + key;
    document.cookie = `${prefixedKey}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  } catch (error) {
    console.error('Cookieの削除に失敗しました:', error);
  }
};

// ユーザーデータの型定義
export interface UserData {
  birthYear?: string;
  age?: string; 
  rent?: string;
  income?: string;
}

/**
 * ユーザーの診断関連データを保存する
 * @param data 保存するデータ
 */
export const saveUserData = (data: UserData): void => {
  saveToLocalStorage<UserData>('userData', data);
};

/**
 * ユーザーの診断関連データを取得する
 * @returns 保存されているユーザーデータ
 */
export const getUserData = (): UserData => {
  return getFromLocalStorage<UserData>('userData', {}) || {};
};

/**
 * ユーザーの診断関連データを削除する
 */
export const clearUserData = (): void => {
  removeFromLocalStorage('userData');
}; 