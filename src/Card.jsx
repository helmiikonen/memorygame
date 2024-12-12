import { Button } from '@mui/material';

const Card = (props) => {

  const {id, name, color, pairsFound, setPairsFound, attempts, setAttempts, timeRunning, visibleCard, setVisibleCard, emptyCard } = props;

  const visible = JSON.parse(window.sessionStorage.getItem('shuffled')).find(s => s.id === id).visible;

  const card = {id: id, name: name, color: color, isVisible: visible}

  const visibleCount = JSON.parse(window.sessionStorage.getItem('shuffled')).filter(i => i.visible === true).length;

  const handleClick = () => {
    const cardsObj = window.sessionStorage.getItem('activeCards');
    
    if (! card.isVisible && (visibleCount - (pairsFound * 2) < 2)) {
      setVisibleCard(card);
      const shuffledCopy = JSON.parse(window.sessionStorage.getItem('shuffled'));
      const index = shuffledCopy.findIndex(s => s.id === id);
      shuffledCopy[index].visible = true;
      window.sessionStorage.setItem('shuffled', JSON.stringify(shuffledCopy));

      if (cardsObj === '' || JSON.parse(cardsObj).length ==! 1) {
        window.sessionStorage.setItem('activeCards', JSON.stringify([card]));
      } else {
        const cards = JSON.parse(cardsObj);
        const newCards = [...cards, card]
        window.sessionStorage.setItem('activeCards', JSON.stringify(newCards));

        if (newCards[0].name === newCards[1].name) {
          const pairs = pairsFound + 1;
          setPairsFound(pairs);
          
        } else {
          // no pair found, close open cards
          setVisibleCard(emptyCard);
          const shuffledCopy = JSON.parse(window.sessionStorage.getItem('shuffled'));
          
          const indexA = shuffledCopy.findIndex(c => c.id === JSON.parse(window.sessionStorage.getItem('activeCards'))[0].id);
          const indexB = shuffledCopy.findIndex(c => c.id === JSON.parse(window.sessionStorage.getItem('activeCards'))[1].id);

          shuffledCopy[indexA].visible = false;
          shuffledCopy[indexB].visible = false;
          
          setTimeout(() => {
            window.sessionStorage.setItem('shuffled', JSON.stringify(shuffledCopy));
          }, 200)
          
        }            
        window.sessionStorage.setItem('activeCards', Array(0));
        setAttempts(attempts + 1);
        
      }
    }    
  }

  return (
    <Button 
      variant='contained' 
      onClick={handleClick}
      disabled={! timeRunning}
      fullWidth={true}
      sx={{backgroundColor: (card.isVisible || visibleCard.id === card.id) ? card.color : '#e7ecef', minHeight: 120}}
      > 
      {(card.isVisible || visibleCard.id === card.id) ? card.name : ''}
    </Button>
  )

}

export default Card;