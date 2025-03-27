import React from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface CTAButtonProps {
  href?: string;
  text: string;
  badgeText?: string;
  onSubmit?: () => void;
  disabled?: boolean;
}

export const CTAButton: React.FC<CTAButtonProps> = ({
  text,
  badgeText = '無料',
  href = '/#question',
  onSubmit,
  disabled = false,
}) => {
  return (
    <a href={href} className="flex w-full justify-center">
      <Button
        className="h-[46px] w-full max-w-[322px] rounded-xl bg-[#ffdc00] shadow-[inset_0px_-2px_0px_#00000040] hover:bg-[#ffdc00]/80"
        onClick={onSubmit}
        disabled={disabled}
      >
        <div className="flex items-center justify-center gap-x-2">
          <span className="font-bold leading-[100%] tracking-[0.04em]">{text}</span>
          <Badge className="rounded-sm border border-solid border-foreground p-[3px]">
            <span className="text-sm font-bold leading-[100%] tracking-[0.15em]">{badgeText}</span>
          </Badge>
        </div>
      </Button>
    </a>
  );
};
