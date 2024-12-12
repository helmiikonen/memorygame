import { Grid2 as Grid, Box, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import Clock from './Clock';
import Card from './Card';

const Game = () => {

  function useSessionStorageState(key, defaultValue) {
    const [state, setState] = useState(() => {
      const savedState = window.sessionStorage.getItem(key);
      if (savedState) {
        return JSON.parse(savedState);
      } else {
        return defaultValue;
      }
    });
  
    const resetState = () => {
      setState(defaultValue);
      window.sessionStorage.setItem(key, JSON.stringify(defaultValue));
    };
  
    useEffect(() => {
      window.sessionStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);
  
    return [state, setState, resetState];
  }  

  const cardContent = [ 
    {id: 'card1', name: 'A', color: '#bd5843', visible: false}, 
    {id: 'card2', name: 'A', color: '#bd5843', visible: false}, 
    {id: 'card3', name: 'B', color: '#fc9a8d', visible: false}, 
    {id: 'card4', name: 'B', color: '#fc9a8d', visible: false},
    {id: 'card5', name: 'C', color: '#a9cff4', visible: false}, 
    {id: 'card6', name: 'C', color: '#a9cff4', visible: false},
    {id: 'card7', name: 'D', color: '#0064a8', visible: false}, 
    {id: 'card8', name: 'D', color: '#0064a8', visible: false},
    {id: 'card9', name: 'E', color: '#4b7f52', visible: false}, 
    {id: 'card10', name: 'E', color: '#4b7f52', visible: false},
    {id: 'card11', name: 'F', color: '#ffd275', visible: false}, 
    {id: 'card12', name: 'F', color: '#ffd275', visible: false},
    {id: 'card13', name: 'G', color: '#a4036f', visible: false}, 
    {id: 'card14', name: 'G', color: '#a4036f', visible: false}, 
    {id: 'card15', name: 'H', color: '#fae1dd', visible: false}, 
    {id: 'card16', name: 'H', color: '#fae1dd', visible: false},
  ]

  if (window.sessionStorage.getItem('shuffled') === undefined) {
    window.sessionStorage.setItem('shuffled', JSON.stringify(cardContent.map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)))
  }

  const [shuffled, setShuffled] = useSessionStorageState('shuffled', Array(0));

  const [pairsFound, setPairsFound] = useState(0);

  const [attempts, setAttempts] = useState(0);

  const [bestAttempts, setBestAttempts] = useSessionStorageState('bestAttempts', 0);

  const [newBestResult, setNewBestResult] = useState(false);

  const [time, setTime] = useState(0); 

  const [timeString, setTimeString] = useState('00:00');

  const [minutes, setMinutes] = useState(0);

  const [seconds, setSeconds] = useState(0);

  const [timeRunning, setTimeRunning] = useState(false);

  const [gameIsActive, setGameIsActive] = useState(false);

  const [bestTime, setBestTime] = useSessionStorageState('bestTime', 0);

  const [bestTimeString, setBestTimeString] = useSessionStorageState('bestTimeString', '00:00');

  const [latestTimeString, setLatestTimeString] = useState('00:00');

  const [newBestTime, setNewBestTime] = useState(false);

  const emptyCard = {id: 'card0', name: 'empty', color: '#fff', isVisible: false};

  const [visibleCard, setVisibleCard] = useState(emptyCard);

  const shuffleCards = () => {
    const copy = shuffled;
    copy.forEach(s => s.visible = false);
    const shuffledCopy = copy.map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)
    setShuffled(shuffledCopy);
    window.sessionStorage.setItem('shuffled', JSON.stringify(shuffledCopy));
  }

  useEffect(() => {
    if (pairsFound === 8) {
      // Game ends when all pairs have been found
      setTimeRunning(false);
      setGameIsActive(false);
      setLatestTimeString(timeString);
      setTimeString('00:00');
      setTime(0);
      setVisibleCard(emptyCard);
      if (bestAttempts === 0 || attempts < bestAttempts) {
        setBestAttempts(attempts);
        window.sessionStorage.setItem('bestAttempts', attempts);
        setNewBestResult(true);
      } 
      if (bestTime === 0 || time < bestTime) {
        setBestTime(time);
        window.sessionStorage.setItem('bestTime', time);
        setBestTimeString(timeString);
        window.sessionStorage.setItem('bestTimeString', timeString);
        setNewBestTime(true);
      }
    }
  }, [pairsFound])
  

  useEffect(() => {
    // Reset to default values when browser is refreshed
    shuffleCards();
    setShuffled(JSON.parse(window.sessionStorage.getItem('shuffled')));
    setTime(0);
    setTimeRunning(false);
    setGameIsActive(false);
    setPairsFound(0);
    setAttempts(0);
    setNewBestResult(false);
    setNewBestTime(false);
    window.sessionStorage.setItem('activeCards', Array(0));
    setVisibleCard(emptyCard);
  }, [])

  return (
    <>
    <Box sx={{display: 'flex', flexDirection: 'column'}}>
      <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        <Typography variant='h4' sx={{margin: 2}}>
          Memory game
        </Typography>
        <Typography sx={{marginBottom: 1}}>
          Find pairs by clicking the cards
        </Typography>
      </Box>
      
      <Clock shuffleCards={shuffleCards} useSessionStorageState={useSessionStorageState} 
              setPairsFound={setPairsFound} setAttempts={setAttempts} setNewBestResult={setNewBestResult}
              setNewBestTime={setNewBestTime} time={time} setTime={setTime} minutes={minutes} seconds={seconds}
              setMinutes={setMinutes} setSeconds={setSeconds} timeRunning={timeRunning} setTimeRunning={setTimeRunning} 
              gameIsActive={gameIsActive} setGameIsActive={setGameIsActive} timeString={timeString} setTimeString={setTimeString} 
              setVisibleCard={setVisibleCard} emptyCard={emptyCard} setLatestTimeString={setLatestTimeString}/>

      <Box sx={{justifyContent: 'left'}}>
        { newBestResult && newBestTime ? <Typography>{pairsFound}/8 pairs found on {attempts} attempts and time {latestTimeString} - New best result and best time!</Typography> 
        : newBestResult ? <Typography>{pairsFound}/8 pairs found on {attempts} attempts and time {latestTimeString} - New best result!</Typography> 
        : newBestTime ? <Typography>{pairsFound}/8 pairs found on {attempts} attempts and time {latestTimeString} - New best time!</Typography> 
        : <Typography>{pairsFound}/8 pairs found on {attempts} attempts {! gameIsActive && latestTimeString !== '00:00' ? ' and time ' + latestTimeString : <></>}</Typography>}
        { bestAttempts > 0 && bestTime > 0 ? <Typography> Best result: {bestAttempts} attempts / Best time: {bestTimeString}</Typography> : <></>}
      </Box>
           
      <Grid container maxWidth={550} spacing={1} columns={4}>
        {Array.from(shuffled.map(({id, name, color}) => (
          <Grid key={id} size={1}>
            <Card id={id} name={name} color={color} pairsFound={pairsFound} setPairsFound={setPairsFound}
                  attempts={attempts} setAttempts={setAttempts} timeRunning={timeRunning} 
                  visibleCard={visibleCard} setVisibleCard={setVisibleCard} emptyCard={emptyCard}/>
          </Grid>
        )))}
      </Grid>
    </Box>
      
    </>
  )
}

export default Game;