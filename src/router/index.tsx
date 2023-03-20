import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { WebPage } from './pages';

const HomePage = lazy(() => import('../pages/home'));
const TablePage = lazy(() => import('../pages/table'));
const TutorialPage = lazy(() => import('../pages/tutorials'));

export function Router(): JSX.Element {
  return (
    <BrowserRouter>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Routes>
          <Route path={WebPage.HOME} element={<HomePage />} />
          <Route path={WebPage.TABLE} element={<TablePage />} />
          <Route path={WebPage.TUTORIAL} element={<TutorialPage />} />
          <Route path="*" element={<div>No such route.</div>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
