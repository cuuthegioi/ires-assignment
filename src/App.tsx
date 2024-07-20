import React from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home';
import './index.css';
import Letter from './components/Letter';
import Symbol from './components/Symbol';
import Result from './components/Result';

const router = createHashRouter([
  {
      path: '/',
      element: <Home />,
  },
  {
      path: '/letter',
      element: <Letter />,
  },
  {
      path: '/symbol',
      element: <Symbol />,
  },
  {
      path: '/result',
      element: <Result />,
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
