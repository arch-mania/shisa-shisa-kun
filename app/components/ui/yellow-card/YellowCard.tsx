import { Card, CardContent } from '../card';

type YellowCardProps = {
  headerText: string;
  contentText: React.ReactNode;
  imageSrc?: string;
};

export const YellowCard = ({ headerText, contentText, imageSrc }: YellowCardProps): JSX.Element => {
  return (
    <Card className="w-full rounded-2xl border-2 border-solid border-[#eebb00]">
      <div className="flex h-[46px] w-full items-center justify-center rounded-t-[14px] border-b-2 border-solid border-[#eebb00] bg-[#fff5b8]">
        <div className="tracking-normal whitespace-nowrap text-center text-lg font-bold leading-[18px]">
          {headerText}
        </div>
      </div>
      <CardContent className="relative space-y-2 px-6 py-[18px]">
        {contentText}
        {imageSrc && (
          <img
            className="absolute -bottom-20 right-0 h-[180px] w-[171px] object-cover"
            alt=""
            src={imageSrc}
            width={171}
            height={180}
          />
        )}
      </CardContent>
    </Card>
  );
};
