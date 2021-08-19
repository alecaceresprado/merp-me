import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';


import store from './store/store';

import styles from './styles';
import {theme} from './theme'

import NavBar from './components/navBar';
import AuthRoute from './components/authRoute';

import Character from './pages/character';
import HomePage from './pages/homePage';
import Login from './pages/login';
import Signup from './pages/signup';

function App() {
  const classes = styles();
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <NavBar />
            <div className={"appContainer"}>
              <Switch>
                <AuthRoute path="/character" component={Character} />
                <AuthRoute path="/home/:userId" component={HomePage} />
                <Route path="/signup" component={Signup} />
                <Route path="/login" component={Login} />
                <Route path="/" component={HomePage} />
              </Switch>
            </div>
          </Router>
        </Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
