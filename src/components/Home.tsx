import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className='main'>
      <h1>Please select your test</h1>
      <div className='test-container'>
        <Button onClick={() => navigate('/letter')} variant="contained">Letter search</Button>
        <Button variant="contained">Math Puzzler</Button>
      </div>
    </div>
  );
};

export default Home;
