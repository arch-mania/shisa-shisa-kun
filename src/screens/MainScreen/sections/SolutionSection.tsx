import { CTAButton } from '../../../components/features/CTAButton';
import { UnderlinedText } from '../../../components/ui/underline-text';
import { YellowCard } from '../../../components/ui/yellow-card/YellowCard';

export const SolutionSection = (): JSX.Element => {
  return (
    <section id="solution">
      <div className="flex flex-col items-center gap-y-2 px-4 py-12 pb-10">
        <p className="text-center text-sm leading-[160%] tracking-widest">
          日本人の住まいを比較すると…
        </p>
        <div className="relative w-full text-center">
          <p className="tracking-0 text-center text-[32px] font-bold leading-[44.8px] text-text">
            実は<UnderlinedText>6割以上</UnderlinedText>が
            <br />
            持ち家
          </p>
        </div>
        <img
          src="/owned-or-rented.png"
          alt="持ち家と賃貸の割合"
          className="mt-8 h-[240px] w-[334px]"
          width={334}
          height={240}
        />
        <p className="mt-14 text-center text-sm leading-[160%] tracking-widest">
          しかも、マイホーム購入時の年齢は
        </p>
        <div className="relative w-full text-center">
          <p className="tracking-0 text-center text-[32px] font-bold leading-[44.8px] text-text">
            30代が<UnderlinedText>半分以上</UnderlinedText>を
            <br />
            占める
          </p>
        </div>
        <img
          src="/age-percent.png"
          alt="持ち家時の年齢の割合"
          className="mt-8 h-[248px] w-[342px]"
          width={342}
          height={248}
        />
        <div className="mt-12 w-full">
          <div className="relative mb-6 text-center">
            <div className="tracking-0 whitespace-nowrap text-center text-base font-semibold leading-[25.6px]">
              なぜ持ち家にする人が多い？
            </div>
            <img
              className="absolute right-[51px] top-0 h-[27px] w-[17px]"
              alt=""
              src="/left-slash.svg"
            />
            <img
              className="absolute left-[51px] top-0 h-[27px] w-[17px]"
              alt=""
              src="/right-slash.svg"
            />
          </div>

          <YellowCard
            headerText="30〜40代から持ち家にできるなら"
            contentText={
              <>
                <p className="tracking-0 mb-3 text-lg leading-[18px]">生涯にかかる出費が</p>
                <div>
                  <p className="tracking-0 text-2xl font-bold leading-[140%]">
                    賃貸よりも
                    <br />
                    <UnderlinedText>「安く」なるから</UnderlinedText>
                  </p>
                </div>
              </>
            }
            imageSrc="/human.png"
          />
        </div>
      </div>
      <div className="relative mt-[120px] space-y-6 bg-[#EEEEEE] pb-8 pt-6">
        <div className="relative z-10 flex flex-col items-center gap-y-3">
          <p className="text-center text-2xl font-bold leading-[160%] tracking-widest">
            あなたにとって
            <br />
            ベストな選択を！
          </p>
          <p className="text-center text-sm leading-[160%] tracking-widest">
            必ずしも「持ち家」がいいとは限りません
            <br />
            人によっては「賃貸」の方が
            <br />
            おすすめという場合もあります
          </p>
          <img
            src="/worry-person.svg"
            alt=""
            className="h-[159px] w-[114px]"
            width={114}
            height={159}
          />
        </div>
        <div className="space-y-4">
          <p className="text-center text-lg font-bold leading-[160%] tracking-widest">
            資産を総合的に判断して、
            <br />
            ベストな選択をしましょう
          </p>
          <CTAButton text="まずは診断する" />
        </div>
        <div className="absolute -top-10 left-1/2 aspect-square w-[90%] -translate-x-1/2 rounded-full bg-white" />
      </div>
      <div className="flex flex-col items-center gap-y-2 px-4 py-12 pb-10">
        <div className="relative mt-[120px] w-full text-center">
          <p className="tracking-0 text-center text-[32px] font-bold leading-[44.8px] text-text">
            毎月の家賃が
            <br />
            <UnderlinedText>「4万円以上」なら</UnderlinedText>
            <br />
            ぜひ見直しを！
          </p>
        </div>
        <p className="text-center text-sm leading-[160%] tracking-widest">
          最後まで楽しく豊かな一生を送るために、
          <br />
          たとえ結婚しなくても、
          <br />
          老後の対策を考えはじめましょう
        </p>
        <img className="mt-8 h-4 w-3.5" alt="" src="/bottom-arrow.png" />
      </div>
      <a href="#question" className="transition-opacity duration-200 hover:opacity-80">
        <img src="/cta.png" alt="CTA" className="w-full" width={390} height={209} />
      </a>
    </section>
  );
};
