export const UnderlinedText = ({ children }: { children: React.ReactNode }): JSX.Element => (
  <span className="relative">
    <span className="relative z-20">{children}</span>
    <div className="absolute bottom-0 left-0 right-0 z-10 h-1.5 bg-primary" />
  </span>
);
