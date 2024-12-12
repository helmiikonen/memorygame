import { useState, useEffect } from 'react';
import { Button, Box, Typography, Dialog, DialogActions, DialogTitle } from '@mui/material';

const Clock = (props) => {
  
  const { shuffleCards, setPairsFound, setAttempts, setNewBestResult, setNewBestTime,
          time, setTime, timeRunning, setTimeRunning, gameIsActive, setGameIsActive,
          minutes, setMinutes, seconds, setSeconds, timeString, setTimeString,
          setVisibleCard, emptyCard, setLatestTimeString } = props;

  const [openQuitDialog, setOpenQuitDialog] = useState(false);

  const handleOpenQuitDialog = () => {
    setOpenQuitDialog(true);
  }

  const handleCloseQuitDialog = () => {
    setOpenQuitDialog(false);
  }

  const handleQuitGame = () => {
    // user confirms they want to quit the game
    setLatestTimeString(timeString);
    setTime(0);
    setMinutes(0);
    setSeconds(0);
    setTimeString('00:00');
    setGameIsActive(false);
    handleCloseQuitDialog();
    setVisibleCard(emptyCard);
  }

  const handleContinueGame = () => {
    setTimeRunning(true);
    handleCloseQuitDialog();
  }

  const clickButton = () => {
    if(! timeRunning) {
      // Starting new game
      shuffleCards();
      setTime(0);
      setMinutes(0);
      setSeconds(0);
      setTimeString('00:00');
      setAttempts(0);
      setPairsFound(0);
      setNewBestResult(false);
      setNewBestTime(false);
      setTimeRunning(true);
      setGameIsActive(true);
      setVisibleCard(emptyCard);
    } else {
      // Quitting current game
      setTimeRunning(false);
      handleOpenQuitDialog();
    }
  }

  useEffect(() => {
    let intervalId;
    // Update time
    if (timeRunning) {
      intervalId = setInterval(() => {
        setTime(time + 1)
        setSeconds(seconds + 1)
        if (seconds === 59) {
          setMinutes(minutes + 1);
          setSeconds(0);
        }
        var mm = minutes;
        var ss = seconds;
        if (mm < 10) {
          mm = '0' + mm;
        }
        if (ss < 10) {
          ss = '0' + ss;
        }
        setTimeString(mm + ':' + ss);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [timeRunning, time, minutes, seconds, setTime, setMinutes, setSeconds, setTimeString])

  return (
    <Box sx={{display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
      <Button variant='contained' sx={{margin: 1}} onClick={clickButton} >
        {gameIsActive ? 'Quit game' : 'Start game'}
      </Button>
      <Typography sx={{margin: 2}}>{timeString}</Typography>
      <Dialog 
        open={openQuitDialog}
        onClose={handleCloseQuitDialog}
        sx={{margin: 2}}>
        <DialogTitle>{'Are you sure you want to quit the game?'}</DialogTitle>
        <DialogActions>
          <Button variant='contained' onClick={handleContinueGame} >
            No, continue the game
          </Button>
          <Button variant='outlined' onClick={handleQuitGame} >
            Yes, quit the game
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default Clock;