import Character from './components/templates/character/Character';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

import styles from './styles';

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: grey[800],
      },
      background: {
        main: grey[800],
        secondary: 'white'
      },
      text: {
        main: grey['A200'],
      },
    },
  });
  const classes = styles();
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
         <Character></Character>
      </ThemeProvider>
    </div>
  );
}

export default App;
