import {Button} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const Result = () => {
  const navigate = useNavigate();
  const {state} = useLocation();
  const {level, ok, ng} = state;

  return (
    <div className='letter-container'>
      <div className='letter'>
        <h2>Welldone, you've completed {level} levels</h2>
        <div className='result'>
          <div style={{ color: '#4caf50'}}>Correct answer: {ok}</div>
          <div style={{ color: "#f50057"}}>Incorrect answer: {ng}</div>
        </div>
        
        <div className='btn-group' style={{
          marginTop: 20
        }}>
          <Button onClick={() => navigate('/letter')} variant="contained">Retake the test</Button>
          <Button variant="outlined"
            onClick={() => navigate('/')}
            style={{
              marginLeft: 10
            }}
          >
            Back to home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Result;
