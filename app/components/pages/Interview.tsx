import { FirstViewSection } from '../sections/FirstViewSection';
import { FormSection } from '../sections/FormSection';
import { ProblemSection } from '../sections/ProblemSection';
import { QuestionSection } from '../sections/QuestionSection';
import { SolutionSection } from '../sections/SolutionSection';

export const InterviewPage = () => (
  <>
    <FirstViewSection />
    <ProblemSection />
    <SolutionSection />
    <QuestionSection />
    <FormSection />
  </>
);
