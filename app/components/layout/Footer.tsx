import { Card, CardContent } from '../ui/card';

export const Footer = (): JSX.Element => {
  return (
    <footer className="flex w-full max-w-[392px] flex-col items-center bg-[#eeeeee] p-6">
      <div className="relative flex h-[92px] w-full items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <a
            href="https://mr-mr.jp/privacy/"
            target="_blank"
            rel="noopener noreferrer"
            className="tracking-normal text-sm leading-[155%]"
          >
            プライバシーポリシー
          </a>
          <a
            href="https://mr-mr.jp/"
            target="_blank"
            rel="noopener noreferrer"
            className="tracking-normal text-sm leading-[155%]"
          >
            会社概要
          </a>
        </div>
        <img
          className="h-8 w-[112px] object-cover"
          alt="Company logo"
          src="/logo.svg"
          width={112}
          height={32}
        />
      </div>
    </footer>
  );
};
