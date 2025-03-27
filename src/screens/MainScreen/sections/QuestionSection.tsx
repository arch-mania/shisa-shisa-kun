import { CTAButton } from '../../../components/features/CTAButton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';
import { Separator } from '../../../components/ui/separator';
import { useState } from 'react';

type QuestionProps = {
  number: number;
  question: string;
  children: React.ReactNode;
};

const Question = ({ number, question, children }: QuestionProps): JSX.Element => {
  return (
    <>
      <div className="flex w-full flex-col items-center">
        <div className="mb-3 size-[88px]">
          <div className="relative flex h-full w-full items-center justify-center rounded-full border-[3px] border-solid border-[#ffdc00]">
            <div className="text-black text-center text-[32px] leading-8">Q{number}</div>
          </div>
        </div>
        <div className="tracking-0 mb-6 text-center text-lg leading-[18px]">{question}</div>
        {children}
      </div>
      {number !== 3 && <Separator />}
    </>
  );
};

export const QuestionSection = (): JSX.Element => {
  const [age, setAge] = useState('');
  const [rent, setRent] = useState('');
  const [income, setIncome] = useState('');

  // URLパラメータを構築
  const resultUrl = `/results?age=${encodeURIComponent(age)}&rent=${encodeURIComponent(rent)}&income=${encodeURIComponent(income)}`;

  return (
    <section id="question" className="flex w-full flex-col items-center gap-y-10 px-[58px] pt-10">
      <Question number={1} question="あなたの年齢は？">
        <Select onValueChange={(value) => setAge(value)}>
          <SelectTrigger className="h-12 w-full rounded-lg border border-solid border-[#999999] bg-white px-3.5 py-3.5 text-lg data-[placeholder]:text-[#999999]">
            <SelectValue
              placeholder="年齢を選んでください"
              className="tracking-0 text-lg leading-[18px]"
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="20歳〜25歳">20歳〜25歳</SelectItem>
            <SelectItem value="26歳〜30歳">26歳〜30歳</SelectItem>
            <SelectItem value="31歳〜35歳">31歳〜35歳</SelectItem>
            <SelectItem value="36歳〜40歳">36歳〜40歳</SelectItem>
            <SelectItem value="41歳〜45歳">41歳〜45歳</SelectItem>
            <SelectItem value="46歳〜50歳">46歳〜50歳</SelectItem>
          </SelectContent>
        </Select>
      </Question>

      <Question number={2} question="毎月の家賃は？">
        <div className="w-full">
          <Select onValueChange={(value) => setRent(value)}>
            <SelectTrigger className="h-12 w-full rounded-lg border border-solid border-[#999999] bg-white px-3.5 py-3.5 text-lg data-[placeholder]:text-[#999999]">
              <SelectValue placeholder="家賃を選んでください" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5万円未満">5万円未満</SelectItem>
              <SelectItem value="5万円〜6万円">5万円〜6万円 台</SelectItem>
              <SelectItem value="6万円〜7万円">6万円〜7万円 台</SelectItem>
              <SelectItem value="7万円〜8万円">7万円〜8万円 台</SelectItem>
              <SelectItem value="8万円〜9万円">8万円〜9万円 台</SelectItem>
              <SelectItem value="9万円〜10万円">9万円〜10万円 台</SelectItem>
              <SelectItem value="10万円〜11万円">10万円〜11万円 台</SelectItem>
              <SelectItem value="11万円〜12万円">11万円〜12万円 台</SelectItem>
              <SelectItem value="12万円以上">12万円以上</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Question>

      <Question number={3} question="現在の年収は？">
        <Select onValueChange={(value) => setIncome(value)}>
          <SelectTrigger className="h-12 w-full rounded-lg border border-solid border-[#999999] bg-white px-3.5 py-3.5 text-lg data-[placeholder]:text-[#999999]">
            <SelectValue
              placeholder="年収を選んでください"
              className="tracking-0 text-lg leading-[18px]"
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
      </Question>

      <div className="my-8 flex justify-center px-4">
        <CTAButton href={resultUrl} text="回答を送信して結果を見る" />
      </div>
    </section>
  );
};
