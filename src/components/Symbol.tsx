import React, { useEffect, useState } from 'react';
import {Button} from '@mui/material';
import { useNavigate } from 'react-router-dom';

type characterElement = {
  key: number;
  value: string;
  status: 'OK' | 'NG' | null;
}

const Symbol: React.FC = () => {
  const navigate = useNavigate();
  const [level, setLevel] = useState(1);
  const [letter, setLetter] = useState('');
  const [letterGrid, setLetterGrid] = useState<characterElement[]>([]);
  const [okCount, setOkCount] = useState(0);
  const [ngCount, setNgCount] = useState(0);
  const [levelCompleted, setLevelCompleted] = useState(false);

  useEffect(() => {
    makeLetterGrid();
  }, [level])

  const nextLevel = () => {
    setLevel(level+1);
    setLevelCompleted(false);
  }

  const checkLevelCompleted = () => {
    const unfinished = letterGrid.findIndex((l) => {
      return l.value === letter && l.status !== 'OK';
    })
    if (unfinished < 0) setLevelCompleted(true);
  }

  const makeLetterGrid = () => {
    const randomLetter = generateRandomSymbol(0);
    setLetter(randomLetter.value);
    const grid = Array.from({length: level*10}, (_, index) => generateRandomSymbol(index));
    //Guarantee there is at least 1 valid answer
    grid[Math.floor(Math.random()*grid.length)] = randomLetter;
    setLetterGrid(grid);
  }

  const generateRandomSymbol = (index: number) => {
    var characters = '⏴⏵⏷⏸⏹⏺▲△▣★♠♣♥♦'.split('');
    return {
      key: index,
      value: characters[Math.floor(Math.random() * characters.length)],
      status: null,
    }
  }

  const checkValid = (index: number) => {
    const newGrid = [...letterGrid];
    if (newGrid[index].status) return;
    if (newGrid[index].value === letter.toUpperCase()) {
      newGrid[index].status = 'OK';
      setOkCount(okCount+1);
    } else {
      newGrid[index].status = 'NG';
      setNgCount(ngCount+1);
    }
    checkLevelCompleted();
    setLetterGrid(newGrid);
  }

  return (
    <div className='letter-container'>
      <div className='letter'>
        <p style={{textAlign: 'right'}}>Level: {level}</p>
        <h1 style={{
          alignSelf: 'center'
        }}>Find the symbol {letter}</h1>
        <div className='test'>
          <div className='grid-container'>
            <div className='grid'>
              {
                letterGrid.map((character, index) => 
                  <>
                    <div className='character' onClick={() => checkValid(index)}
                      style={
                        character.status === 'OK' ? {
                          color: "#4caf50"
                        } : character.status === 'NG' ? {
                          color: "#f50057"
                        } : {}
                      }  
                    >
                      {character.value}
                    </div>
                  </>
                )
              }
            </div>
          </div>
          <div className='btn-group'>
            <Button variant="outlined"
              onClick={() => navigate('/result', {
                state: {
                  level: level,
                  ok: okCount,
                  ng: ngCount,
                }
              })}
            >
              Finish
            </Button>
            <Button variant="contained"
              disabled={!levelCompleted}
              onClick={() => nextLevel()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Symbol;
