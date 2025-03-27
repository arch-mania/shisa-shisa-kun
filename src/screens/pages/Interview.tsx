import { FirstViewSection } from '../MainScreen/sections/FirstViewSection';
import { SolutionSection } from '../MainScreen/sections/SolutionSection';
import { QuestionSection } from '../MainScreen/sections/QuestionSection';
import { ProblemSection } from '../MainScreen/sections/ProblemSection';
import { FormSection } from '../MainScreen/sections/FormSection';

export const InterviewPage = () => {
  return (
    <>
      <FirstViewSection />
      <ProblemSection />
      <SolutionSection />
      <QuestionSection />
      <FormSection />
    </>
  );
};
