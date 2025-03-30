import { Routes, Route } from 'react-router-dom';
import { Layout } from '../../components/layout/Layout';
import { InterviewPage } from '../pages/Interview';
import { ResultsPage } from '../pages/Results';

export const MainScreen = (): JSX.Element => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<InterviewPage />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </Layout>
  );
};
