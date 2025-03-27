import { Card, CardContent } from '../../../components/ui/card';
import { Separator } from '../../../components/ui/separator';
import { CTAButton } from '../../../components/features/CTAButton';
import { UnderlinedText } from '../../../components/ui/underline-text';
import { THOUGHT_BUBBLES } from '../../../constants';

type ThoughtBubble = {
  icon: string;
  text: string;
  highlightedText: string;
};

type ThoughtBubbleProps = {
  thought: ThoughtBubble;
};

const ThoughtBubbleItem = ({ thought }: ThoughtBubbleProps): JSX.Element => (
  <div className="flex items-center gap-x-4">
    <div className="mt-1 h-[19px] w-6 bg-[url(/checked.png)] bg-[100%_100%]" />
    <div>
      <p className="tracking-0 text-sm leading-[150%]">
        {thought.text}
        <br />
        <span className="tracking-0 text-xl font-bold leading-[150%]">
          {thought.highlightedText}
        </span>
      </p>
    </div>
  </div>
);

export const ProblemSection = (): JSX.Element => {
  return (
    <section id="problem" className="w-full bg-[#eeeeee] px-3 py-12">
      <div className="flex flex-col items-center gap-y-10">
        <div className="space-y-8">
          <h2 className="tracking-0 text-center text-xl font-bold leading-[160%]">
            買う？借りる？
            <br />
            その前に、まず住まいのことを
            <br />
            知って考える時間を。
          </h2>

          <Card className="mb-8 w-full rounded-2xl border-2 border-primary bg-white">
            <CardContent className="p-6">
              <ThoughtBubbleItem thought={THOUGHT_BUBBLES[0]} />
              <Separator className="my-[18px] border-dotted" />
              <ThoughtBubbleItem thought={THOUGHT_BUBBLES[1]} />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4 text-center">
          <p className="tracking-0 text-lg font-bold leading-[160%]">
            決める前に、知ってほしい。
            <br />
            <UnderlinedText>「なんとなく」から抜け出そう。</UnderlinedText>
          </p>
          <CTAButton text="まずは診断する" />
        </div>
      </div>
    </section>
  );
};
