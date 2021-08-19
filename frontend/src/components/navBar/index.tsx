import React from 'react';
import { Link } from 'react-router-dom';

// MUI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { CircularProgress } from '@material-ui/core';

import styles from './styles';
import { Belor } from '../../mocks';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

import { getUi, setIsCriticalLoading } from '../../store/uiReducer';
import { getUser } from '../../store/userReducer';
import { logout } from '../../helpers';


const CharDetails = (): React.ReactElement => {
  const classes = styles();
  const { passiveLoading } = useAppSelector(getUi);
  const { userDetails } = useAppSelector(getUser);
  const dispatch = useAppDispatch();
  const doLogout = () => {
    logout(dispatch)
  }
  const setCriticalLoad = () => {
    dispatch(setIsCriticalLoading(true));
  }
  const loginLogout = userDetails?.userId ?
    <Button color="inherit" onClick={doLogout} component={Link} to="/login">Logout</Button> :
    <Button color="inherit" component={Link} to="/login">login</Button>

  return (
    <AppBar >
      <Toolbar className={classes.toolbar}>
        {passiveLoading && <CircularProgress size={30} color="inherit" />}
        <Button
          color="inherit"
          component={Link}
          onClick={setCriticalLoad}
          to={`${userDetails?.userId ? `/home/${userDetails.userId}` : "/"}`
          }>Home</Button>
        {loginLogout}
        {!userDetails?.userId && <Button color="inherit" component={Link} to="/signup">signUp</Button>}
      </Toolbar>
    </AppBar>
  );
}
export default CharDetails;