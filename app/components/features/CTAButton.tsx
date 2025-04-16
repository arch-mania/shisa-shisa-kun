import React from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { QuestionLink } from './QuestionLink';

interface CTAButtonProps {
  href?: string;
  text: string;
  badgeText?: string;
  onSubmit?: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
}

export const CTAButton: React.FC<CTAButtonProps> = ({
  text,
  badgeText = '無料',
  href = '/#question',
  onSubmit,
  disabled = false,
  onClick,
  type = 'button',
}) => {
  const button = (
    <Button
      type={type}
      className="h-[46px] w-full max-w-[322px] rounded-xl bg-[#ffdc00] shadow-[inset_0px_-2px_0px_#00000040] hover:bg-[#ffdc00]/80"
      disabled={disabled}
      onClick={onClick}
    >
      <div className="flex items-center justify-center gap-x-2">
        <span className="font-bold leading-[100%] tracking-[0.04em]">{text}</span>
        <Badge className="rounded-[2px] border border-solid border-foreground p-[3px]">
          <span className="text-sm font-bold leading-[100%] tracking-[0.15em]">{badgeText}</span>
        </Badge>
      </div>
    </Button>
  );

  if (disabled) {
    return <div className="flex w-full justify-center">{button}</div>;
  }

  if (type === 'submit') {
    return <div className="flex w-full justify-center">{button}</div>;
  }

  if (href === '/#question') {
    return (
      <QuestionLink>
        <div className="flex w-full justify-center">{button}</div>
      </QuestionLink>
    );
  }

  return (
    <a href={href} className="flex w-full justify-center" onClick={onSubmit}>
      {button}
    </a>
  );
};
