import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader } from '../../components/ui/card';
import { UnderlinedText } from '../../components/ui/underline-text';
import { YellowCard } from '../../components/ui/yellow-card/YellowCard';
import { FormSection } from '../MainScreen/sections/FormSection';

export const ResultsPage = (): JSX.Element => {
  const [age, setAge] = useState('XX歳');
  const [rent, setRent] = useState('X万円');
  const [income, setIncome] = useState('');

  useEffect(() => {
    // URLパラメータから値を取得
    const searchParams = new URLSearchParams(window.location.search);
    const ageParam = searchParams.get('age');
    const rentParam = searchParams.get('rent');
    const incomeParam = searchParams.get('income');

    if (ageParam) setAge(ageParam);
    if (rentParam) setRent(rentParam);
    if (incomeParam) setIncome(incomeParam);
  }, []);

  return (
    <div className="px-4 pb-16 pt-4">
      <a href="/" className="flex items-center gap-2 hover:opacity-80">
        <img src="/arrow-left.svg" alt="" width={24} height={24} className="size-6" />
        <p className="tracking-0 text-sm leading-[100%]">前の画面に戻る</p>
      </a>
      <section id="result" className="mt-11 flex flex-col items-center justify-center gap-y-8">
        <span className="w-fit rounded-3xl bg-primary px-4 py-2 text-lg leading-[100%] tracking-[0.2em]">
          診断結果
        </span>
        <span className="tracking-0 text-lg font-bold leading-[100%]">
          年齢{age}、家賃{rent}のあなたは…
        </span>
        <div className="w-full space-y-2">
          <Card className="relative w-full rounded-2xl border-4 border-solid border-black bg-primary p-0">
            <CardContent className="border-1 m-2 rounded-md border-2 border-black p-4">
              <div className="space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="tracking-0 text-sm leading-[100%]">月々</span>
                    <div className="flex h-[26px] items-center justify-center rounded border border-solid border-[#333333] bg-white px-2 text-center text-lg leading-[100%]">
                      <span className="tracking-0 text-lg leading-[100%]">XX</span>
                      <span className="tracking-0 text-xs leading-3">万円</span>
                    </div>
                    <span className="tracking-0 text-sm leading-[14px]">を</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="tracking-0 text-sm leading-[100%]">合計</span>
                    <div className="flex h-[26px] items-center justify-center rounded border border-solid border-[#333333] bg-white px-2 text-center text-lg leading-[100%]">
                      <span className="tracking-0 text-lg leading-[100%]">XX</span>
                      <span className="tracking-0 text-xs leading-3">年</span>
                    </div>
                    <span className="tracking-0 text-sm leading-[14px]">支払うとしたら…</span>
                  </div>
                </div>
                <div className="space-y-[6px]">
                  <span className="tracking-0 text-xs font-bold leading-[100%]">おおよそ</span>
                  <div className="flex h-12 w-fit items-end justify-center rounded border border-solid border-[#333333] bg-white px-[10px] py-2 text-center text-lg leading-[100%]">
                    <span className="tracking-0 text-2xl font-bold leading-[100%]">XX,XXXX</span>
                    <span className="tracking-0 text-xs leading-3">万円</span>
                  </div>
                </div>
                <div className="text-xl font-bold leading-[140%] tracking-[0.08em]">
                  この資産の住宅に
                  <br />
                  住める試算です。
                </div>
              </div>

              <div className="absolute right-0 top-0">
                <span className="text-white w-fit rounded-[0px_16px_0px_8px] bg-[#333333] px-4 py-2 text-lg leading-[18px] tracking-[3.60px]">
                  シサシサくん
                </span>
                <div className="mr-[18px] mt-[6px] text-right">
                  <span className="text-xs font-bold leading-[100%] tracking-[0.3em]">
                    診断結果
                  </span>
                </div>
              </div>
              <img
                src="/result-human.svg"
                alt=""
                className="absolute -bottom-2 right-4 h-[172px] w-[128px]"
                width="128"
                height="172"
              />
            </CardContent>
          </Card>
          <span className="tracking-0 mt-4 inline-block text-[10px] leading-[160%]">
            ※ 翌年に35年ローンを組んだ場合のシミュレーション。
            <br />※ 敷金・礼金などのXXXXXXXXXXは含まれません。
          </span>
        </div>
      </section>

      <section id="rent-or-buy" className="mt-11 flex flex-col gap-y-10">
        <div className="flex gap-x-9">
          <div id="rent" className="flex flex-1 flex-col items-center gap-y-3">
            <h2 className="text-center text-lg leading-[18px]">
              <UnderlinedText>ずっと賃貸なら</UnderlinedText>
            </h2>
            <span className="tracking-0 text-center text-sm leading-[160%]">
              平均寿命90歳まで
              <br />
              毎月{rent}支払い
            </span>
            <div>
              <Card className="mb-2 w-40 rounded-2xl border-2 border-solid border-[#999999]">
                <CardHeader className="p-0">
                  <div className="flex h-[34px] w-full items-center justify-center rounded-[16px_16px_0px_0px] border-b-2 border-solid border-[#999999] bg-[#eeeeee]">
                    <h3 className="tracking-0 text-center text-lg font-bold leading-[100%]">
                      支払総額
                    </h3>
                  </div>
                </CardHeader>
                <CardContent className="space-y-1 pb-6 pt-3">
                  <p className="tracking-0 text-center text-lg leading-[100%]">約</p>
                  <p className="text-center text-2xl font-bold leading-[140%]">X,XXX</p>
                  <p className="tracking-0 text-center text-lg leading-[100%]">万円</p>
                </CardContent>
              </Card>
              <div className="relative">
                <img
                  src="/rent-human.svg"
                  alt=""
                  className="absolute -bottom-[120px] left-1/2 size-[140px] -translate-x-1/2"
                  width="140"
                  height="140"
                />
              </div>
              <div className="mt-[128px] flex flex-col items-center rounded-xl bg-[#EEEEEE] p-4">
                <p className="tracking-0 text-center text-sm font-bold leading-[160%]">
                  高額な費用を
                  <br />
                  コツコツ支払っても
                  <br />
                  自分のものには
                  <br />
                  ならない
                </p>
              </div>
            </div>
          </div>
          <div id="buy" className="flex flex-1 flex-col items-center gap-y-3">
            <h2 className="text-center text-lg leading-[18px]">
              <UnderlinedText>もしも買うなら</UnderlinedText>
            </h2>
            <span className="tracking-0 text-center text-sm leading-[160%]">
              住宅ローン完済まで
              <br />
              毎月約X.X万円支払い
            </span>
            <div>
              <Card className="mb-2 w-40 rounded-2xl border-2 border-solid border-primary">
                <CardHeader className="p-0">
                  <div className="flex h-[34px] w-full items-center justify-center rounded-[16px_16px_0px_0px] border-b-2 border-solid border-primary bg-secondary">
                    <h3 className="tracking-0 text-center text-lg font-bold leading-[100%]">
                      支払総額
                    </h3>
                  </div>
                </CardHeader>
                <CardContent className="space-y-1 pb-6 pt-3">
                  <p className="tracking-0 text-center text-lg leading-[100%]">約</p>
                  <p className="text-center text-2xl font-bold leading-[140%]">X,XXX</p>
                  <p className="tracking-0 text-center text-lg leading-[100%]">万円</p>
                </CardContent>
              </Card>
              <div className="relative">
                <img
                  src="/buy-human.svg"
                  alt=""
                  className="absolute -bottom-[120px] left-1/2 size-[140px] -translate-x-1/2"
                  width="140"
                  height="140"
                />
              </div>
              <div className="mt-[128px] flex flex-col items-center rounded-xl bg-[#EEEEEE] p-4">
                <p className="tracking-0 text-center text-sm font-bold leading-[160%]">
                  毎月の家賃が
                  <br />
                  減る上にローン
                  <br />
                  完済後は自分の
                  <br />
                  資産として残る
                </p>
              </div>
            </div>
          </div>
        </div>
        <p className="tracking-0 text-center text-sm leading-[160%]">
          上記診断はあくまで簡易試算による
          <br />
          <span className="font-bold">概算値</span>となります。
        </p>
      </section>
      <div className="mt-10">
        <YellowCard
          headerText="もし、サポートが必要な場合は"
          contentText={
            <>
              <p className="tracking-0 mb-3 text-lg leading-[18px]">専門家が</p>
              <div>
                <p className="tracking-0 text-2xl font-bold leading-[140%]">
                  <UnderlinedText>将来資金対策</UnderlinedText>
                  <span className="text-[20px]">を</span>
                  <br />
                  本格的に
                  <br />
                  伴走します！
                </p>
              </div>
            </>
          }
          imageSrc="/human.png"
        />
      </div>
      <div className="mt-[120px] flex justify-center">
        <p className="trackign-0 text-center text-sm font-bold leading-[160%]">
          下記のフォームより
          <br />
          まずはお気軽にお問い合わせください
        </p>
      </div>
      <div className="mt-10">
        <FormSection />
      </div>
    </div>
  );
};
