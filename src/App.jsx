import Game from './Game';
import { Box } from '@mui/material';

const App = () => (
  <Box 
    sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      margin: 2
    }}>
    <Game />
  </Box>
)

export default App;