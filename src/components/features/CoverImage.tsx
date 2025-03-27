import { CTAButton } from './CTAButton';

export const CoverImage = (): JSX.Element => {
  return (
    <div className="fixed left-0 top-0 hidden pt-10 md:block md:w-[calc(100%-40px-390px)] lg:w-[calc(100%-280px-390px)]">
      <img
        src="/background-image.png"
        alt="背景画像"
        width="576"
        height="330"
        className="hidden w-[576px] pr-4 md:block"
      />
      <div className="mt-10 hidden flex-col items-center gap-y-4 px-4 md:flex">
        <a href="/#question" className="transition-opacity duration-200 hover:opacity-80">
          <img src="/cta.png" alt="CTA" className="w-[487px]" width="487" height="261" />
        </a>
        <CTAButton text="まずは診断する" />
      </div>
    </div>
  );
};
