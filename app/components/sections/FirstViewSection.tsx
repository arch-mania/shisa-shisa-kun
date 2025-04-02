import { CTAButton } from '../features/CTAButton';

export const FirstViewSection = (): JSX.Element => (
  <section id="first-view" className="flex flex-col items-center gap-y-6 px-4 pb-[52px]">
    <p className="text-center text-sm leading-[160%] tracking-widest">
      ご存知ですか？
      <br />
      人生における5000万円の差
    </p>

    <img className="size-[240px]" alt="ユーザー" src="/user.png" width={240} height={240} />
    <div className="text-center text-2xl leading-9 tracking-[1.20px] [font-family:'Hiragino_Sans-Regular',Helvetica]">
      <p className="font-bold">
        <span className="relative z-0 block text-2xl leading-[180%] tracking-wider">
          老後もその部屋にひとり？
          <div className="absolute bottom-2 left-0 -z-10 h-1.5 w-full bg-primary" />
        </span>
        <span className="block text-base leading-[220%] tracking-wider">
          老後の自分が、いま一番聞きたいこと。
          <br />
          未来の自分に今、なにする？
        </span>
      </p>
    </div>
    <p className="text-center text-xs leading-[160%] tracking-normal">
      あなたの今の賃料・年齢・年収から逆算して
      <br />
      老後に必要な資金を算出し今できる対策を提案します
    </p>
    <CTAButton text="まずは診断する" />
  </section>
);
