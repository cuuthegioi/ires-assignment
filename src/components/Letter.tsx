import React, { useEffect, useState } from 'react';
import {Button} from '@mui/material';
import { useNavigate } from 'react-router-dom';

type characterElement = {
  key: number;
  value: string;
  status: 'OK' | 'NG' | null;
}

const Letter: React.FC = () => {
  const navigate = useNavigate();
  const [level, setLevel] = useState(1);
  const [letter, setLetter] = useState('');
  const [letterGrid, setLetterGrid] = useState<characterElement[]>([]);
  const [okCount, setOkCount] = useState(0);
  const [ngCount, setNgCount] = useState(0);

  useEffect(() => {
    makeLetterGrid();
  }, [level])

  const nextLevel = () => {
    setLevel(level+1);
  }

  const isLetter = () => {
    return level % 2 === 0;
  }

  const makeLetterGrid = () => {
    const randomLetter = isLetter() ? generateRandomLetter(0) : generateRandomSymbol(0);
    setLetter(randomLetter.value);
    const grid = Array.from({length: level*10}, (_, index) => isLetter() ? generateRandomLetter(index) : generateRandomSymbol(index));
    //Guarantee there is at least 1 valid answer
    grid[Math.floor(Math.random()*grid.length)] = randomLetter;
    setLetterGrid(grid);
  }


  const generateRandomLetter = (index: number) => {
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    return {
      key: index,
      value: characters[Math.floor(Math.random() * characters.length)],
      status: null,
    }
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
    setLetterGrid(newGrid);
  }

  return (
    <div className='letter-container'>
      <div className='letter'>
        <p style={{textAlign: 'right'}}>Level: {level}</p>
        <h1 style={{
          alignSelf: 'center'
        }}>Find the {isLetter() ? 'letter' : 'symbol'} {letter}</h1>
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
              disabled={letter===''}
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
              disabled={letter===''}
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

export default Letter;
