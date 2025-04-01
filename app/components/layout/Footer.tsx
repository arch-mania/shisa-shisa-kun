export const Footer = (): JSX.Element => (
  <footer className="flex w-full max-w-[392px] flex-col items-center bg-[#eeeeee] p-6 pb-10">
    <div className="relative flex w-full flex-col items-center gap-y-10">
      <div className="flex flex-row items-center gap-x-3">
        <a
          href="https://mr-mr.jp/privacy/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs leading-[155%] tracking-normal"
        >
          プライバシーポリシー
        </a>
        <hr className="h-4 w-px bg-[#333333]" />
        <a
          href="https://mr-mr.jp/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs leading-[155%] tracking-normal"
        >
          会社概要
        </a>
      </div>
      <img
        className="h-6 w-[181px] object-cover"
        alt="Company logo"
        src="/logo.svg"
        width={181}
        height={24}
      />
    </div>
  </footer>
);
