import { createBrowserRouter } from 'react-router-dom';
import { Homepage } from './components/Homepage';
import { AnimalPage } from './components/AnimalPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Homepage></Homepage>,
  },
  {
    path: '/animals/:id',
    element: <AnimalPage></AnimalPage>,
  }
]);
