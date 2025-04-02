import { useState } from 'react';
import { z } from 'zod';
import { Select, SelectItem, SelectValue, SelectContent, SelectTrigger } from '../ui/select';
import { Separator } from '../ui/separator';
import { RENT_OPTIONS } from '../../constants';
import { UnderlinedText } from '../ui/underline-text';
import { CTAButton } from '../features/CTAButton';

const formSchema = z.object({
  birthYear: z.string().min(1, '生年月日を選択してください'),
  rent: z.string().min(1, '家賃を選択してください'),
  income: z.string().min(1, '年収を選択してください'),
});

type FormData = z.infer<typeof formSchema>;

type QuestionProps = {
  number: number;
  question: string;
  children: React.ReactNode;
};

const Question = ({ number, question, children }: QuestionProps): JSX.Element => (
  <>
    <div className="flex w-full flex-col items-center">
      <div className="mb-3 size-[88px]">
        <div className="relative flex h-full w-full items-center justify-center rounded-full border-[3px] border-solid border-[#ffdc00]">
          <div className="text-center text-[32px] leading-8 text-black">Q{number}</div>
        </div>
      </div>
      <div className="mb-6 text-center text-lg leading-[18px] tracking-normal">{question}</div>
      {children}
    </div>
    {number !== 3 && <Separator />}
  </>
);

const generateYearOptions = (): { value: string; label: string }[] => {
  const currentYear = new Date().getFullYear();
  const startYear = currentYear - 60; // 60歳までカバー
  const endYear = currentYear - 20; // 20歳までを想定

  const years = [];
  for (let year = endYear; year >= startYear; year--) {
    years.push({
      value: year.toString(),
      label: `${year}年`,
    });
  }

  return years;
};

const BIRTH_YEAR_OPTIONS = generateYearOptions();

export const QuestionSection = (): JSX.Element => {
  const [birthYear, setBirthYear] = useState('');
  const [rent, setRent] = useState('');
  const [rentNumber, setRentNumber] = useState('');
  const [income, setIncome] = useState('');
  const [wasValidated, setWasValidated] = useState(false);
  const [errors, setErrors] = useState<{
    birthYear?: string;
    rent?: string;
    income?: string;
  }>({});

  const handleRentChange = (value: string) => {
    setRent(value);
    const selectedOption = RENT_OPTIONS.find((option) => option.value === value);
    if (selectedOption) {
      setRentNumber(selectedOption.numberValue);
    }
  };

  const validateForm = (): boolean => {
    const result = formSchema.safeParse({ birthYear, rent, income });

    if (result.success) {
      setErrors({});
      return true;
    }

    const formattedErrors: {
      birthYear?: string;
      rent?: string;
      income?: string;
    } = {};

    result.error.errors.forEach((error) => {
      const path = error.path[0] as keyof FormData;
      formattedErrors[path] = error.message;
    });

    setErrors(formattedErrors);
    return false;
  };

  const handleSubmit = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    e.preventDefault();
    setWasValidated(true);

    const isValid = validateForm();

    if (isValid) {
      window.location.href = resultUrl;
    }
  };

  const resultUrl = `/results?birthYear=${encodeURIComponent(birthYear)}&rent=${encodeURIComponent(rentNumber)}万円&income=${encodeURIComponent(income)}`;

  return (
    <>
      <section id="question" className="flex w-full flex-col items-center gap-y-10 px-[58px] pt-10">
        <Question number={1} question="あなたの生まれ年は？">
          <div className="w-full">
            <Select onValueChange={(value) => setBirthYear(value)}>
              <SelectTrigger className="h-12 w-full rounded-lg border border-solid border-[#999999] bg-white px-3.5 py-3.5 text-lg data-[placeholder]:text-[#999999]">
                <SelectValue
                  placeholder="生まれ年を選んでください"
                  className="text-lg leading-[18px] tracking-normal"
                />
              </SelectTrigger>
              <SelectContent className="scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-400 max-h-[240px] overflow-y-auto">
                {BIRTH_YEAR_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {wasValidated && errors.birthYear && (
              <p className="mt-1 text-sm text-red-500">{errors.birthYear}</p>
            )}
          </div>
        </Question>

        <Question number={2} question="毎月の家賃は？">
          <div className="w-full">
            <Select onValueChange={handleRentChange}>
              <SelectTrigger className="h-12 w-full rounded-lg border border-solid border-[#999999] bg-white px-3.5 py-3.5 text-lg data-[placeholder]:text-[#999999]">
                <SelectValue placeholder="家賃を選んでください" />
              </SelectTrigger>
              <SelectContent>
                {RENT_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {wasValidated && errors.rent && (
              <p className="mt-1 text-sm text-red-500">{errors.rent}</p>
            )}
          </div>
        </Question>

        <Question number={3} question="現在の年収は？">
          <div className="w-full">
            <Select onValueChange={(value) => setIncome(value)}>
              <SelectTrigger className="h-12 w-full rounded-lg border border-solid border-[#999999] bg-white px-3.5 py-3.5 text-lg data-[placeholder]:text-[#999999]">
                <SelectValue
                  placeholder="年収を選んでください"
                  className="text-lg leading-[18px] tracking-normal"
                />
              </SelectTrigger>
              <SelectContent className="scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-400 overflow-y-auto">
                <SelectItem value="300万円未満">300万円未満</SelectItem>
                <SelectItem value="300万〜350万円">300万〜350万円</SelectItem>
                <SelectItem value="350万〜400万円">350万〜400万円</SelectItem>
                <SelectItem value="400万〜450万円">400万〜450万円</SelectItem>
                <SelectItem value="450万〜500万円">450万〜500万円</SelectItem>
                <SelectItem value="500万〜550万円">500万〜550万円</SelectItem>
                <SelectItem value="550万〜600万円">550万〜600万円</SelectItem>
                <SelectItem value="600万円以上">600万円以上</SelectItem>
              </SelectContent>
            </Select>
            {wasValidated && errors.income && (
              <p className="mt-1 text-sm text-red-500">{errors.income}</p>
            )}
          </div>
        </Question>

        <div className="flex justify-center px-4">
          <CTAButton href="#" text="回答を送信して結果を見る" onSubmit={handleSubmit} />
        </div>
      </section>
      <div className="w-full space-y-4 pt-12 text-center">
        <p className="text-text text-center text-[32px] font-bold leading-[44.8px] tracking-normal">
          専門家に
          <br />
          <UnderlinedText>無料相談</UnderlinedText>ができます
        </p>
        <p className="text-center text-sm leading-[160%] tracking-widest">
          お家に関わる「将来資金対策」を
          <br />
          丁寧にサポートします
        </p>
      </div>
    </>
  );
};
