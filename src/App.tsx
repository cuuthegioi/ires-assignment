import React from 'react';
import { BrowserRouter as Router, Route, Routes, createHashRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home';
import './index.css';
import Letter from './components/Letter';
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
      path: '/result',
      element: <Result />,
  },
]);

const App: React.FC = () => {
  // return (
  //   <Router>
  //     <Routes>
  //       <Route path="/" element={<Home />} />
  //       <Route path="/letter" element={<Letter />} />
  //       <Route path="/result" element={<Result />} />
  //     </Routes>
  //   </Router>
  // );
  return <RouterProvider router={router} />;
};

export default App;
