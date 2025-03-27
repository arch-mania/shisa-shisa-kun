import { z } from 'zod';

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
