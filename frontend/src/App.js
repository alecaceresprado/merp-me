import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import styles from './styles';

import NavBar from './components/navBar';

import Character from './pages/character';
import HomePage from './pages/homePage';
import Login from './pages/login';
import Signup from './pages/signup';

function App() {
  const theme = createTheme({
    palette: {
      // primary: {
      //   main: grey[800],
      // },
      // background: {
      //   main: grey[800],
      //   secondary: 'white'
      // },
      // text: {
      //   main: grey['A200'],
      // },
    },
  });
  const classes = styles();
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <NavBar />
          <div className={"appContainer"}>
            <Switch>
              <Route path="/character" component={Character} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/" component={HomePage} />
            </Switch>
          </div>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
