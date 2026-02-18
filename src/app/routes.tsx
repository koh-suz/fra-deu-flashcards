import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../components/Layout/Layout';
import { StudyPage } from '../features/study/StudyPage';
import { QuizPage } from '../features/quiz/QuizPage';
import { StatisticsPage } from '../features/statistics/StatisticsPage';
import { AddCardPage } from '../features/addcard/AddCardPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <StudyPage /> },
      { path: 'study', element: <StudyPage /> },
      { path: 'quiz', element: <QuizPage /> },
      { path: 'statistics', element: <StatisticsPage /> },
      { path: 'add-card', element: <AddCardPage /> },
    ],
  },
]);
