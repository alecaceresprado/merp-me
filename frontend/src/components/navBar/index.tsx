import React from 'react';
import { Link } from 'react-router-dom';

// MUI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { CircularProgress } from '@material-ui/core';

import styles from './styles';
import { Belor } from '../../mocks';
import { useAppSelector } from '../../store/hooks';
import { getUi } from '../../store/uiReducer';


const CharDetails = (): React.ReactElement => {
  const classes = styles();
  const character = Belor;
  const { passiveLoading } = useAppSelector(getUi);

  return (
    <AppBar >
      <Toolbar className={classes.toolbar}>
        {passiveLoading && <CircularProgress size={30} color="inherit" />}
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/login">Login</Button>
        <Button color="inherit" component={Link} to="/signup">signUp</Button>
      </Toolbar>
    </AppBar>
  );
}
export default CharDetails;