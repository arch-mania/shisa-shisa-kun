import { z } from 'zod';
import { RentOption } from '../types';

export const THOUGHT_BUBBLES = [
  {
    icon: '/checked.png',
    text: '今の給与では老後に向けた',
    highlightedText: '貯金や資産運用は難しい…',
  },
  {
    icon: '/checked.png',
    text: 'NISAやIDECOはやっているけど',
    highlightedText: '老後の資金は足りるだろうか',
  },
];

export const RENT_OPTIONS: RentOption[] = [
  { value: '5万円未満', label: '5万円未満', numberValue: '5' },
  { value: '5万円〜6万円', label: '5万円〜6万円 台', numberValue: '6' },
  { value: '6万円〜7万円', label: '6万円〜7万円 台', numberValue: '7' },
  { value: '7万円〜8万円', label: '7万円〜8万円 台', numberValue: '8' },
  { value: '8万円〜9万円', label: '8万円〜9万円 台', numberValue: '9' },
  { value: '9万円〜10万円', label: '9万円〜10万円 台', numberValue: '10' },
  { value: '10万円〜11万円', label: '10万円〜11万円 台', numberValue: '11' },
  { value: '11万円〜12万円', label: '11万円〜12万円 台', numberValue: '12' },
  { value: '12万円以上', label: '12万円以上', numberValue: '13' },
];

export const formFields = [
  {
    id: 'name',
    label: 'お名前(カナ)',
    placeholder: 'タナカ　タロウ',
    required: true,
  },
  {
    id: 'phone',
    label: '電話番号',
    placeholder: '08000000000',
    required: true,
  },
  {
    id: 'email',
    label: 'メールアドレス',
    placeholder: 'info@xxxx.jp',
    required: true,
  },
];

export const formSchema = z.object({
  name: z
    .string()
    .min(1, 'お名前を入力してください')
    .max(50, 'お名前は50文字以内で入力してください'),
  email: z
    .string()
    .min(1, 'メールアドレスを入力してください')
    .email('正しいメールアドレス形式で入力してください'),
  phone: z
    .string()
    .min(1, '電話番号を入力してください')
    .regex(/^[0-9-]{10,13}$/, '正しい電話番号形式で入力してください'),
  message: z
    .string()
    .optional()
    .transform((e) => (e === '' ? undefined : e)), // 空文字列をundefinedに変換
});
