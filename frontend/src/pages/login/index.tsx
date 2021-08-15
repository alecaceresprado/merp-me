import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import styles from './styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import { getUser, setLoginErrors, setUserDetails } from '../../store/userReducer';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getUi, setIsActionLoading } from '../../store/uiReducer';
import axios from 'axios';
import { login } from '../../helpers';

const Login = (): React.ReactElement => {
  const classes = styles();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })
  const { loginErrors } = useAppSelector(getUser);
  const { actionLoading } = useAppSelector(getUi);


  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(setIsActionLoading(true));
    axios.post('/user/login', loginData)
      .then(result => {
        login(result.data.token);
        dispatch(setUserDetails(result.data.user));
        history.push("/");
      })
      .catch(error => {
        if (error?.response?.data && typeof error.response.data !== 'string') {
          dispatch(setLoginErrors(error.response.data));
        } else {
          dispatch(setLoginErrors({ general: "Something went wrong! please retry" }));
        }
      })
      .finally(() => {
        dispatch(setIsActionLoading(false));
      });
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginData({
      ...loginData,
      [name]: value
    })
  }

  const isBtnDisabled = (): boolean => (
    actionLoading || !Object.values(loginData).every(field => field.length)
  );
  return (
    <Box className={`${classes.box}`}>
      <Card className={`${classes.card}`}>
        <div className={`${classes.textHolder}`}>
          <Typography variant="h2">
            Welcome back, Traveler!
          </Typography>
          <Typography variant="h6">
            Please, remind this old inkeeper your name
          </Typography>
        </div>
        <form noValidate className={`${classes.form}`} onSubmit={handleSubmit}>
          <TextField
            id="email"
            name="email"
            type="email"
            label="Email"
            className={`${classes.formInput}`}
            helperText={loginErrors?.email}
            error={!!loginErrors?.email}
            value={loginData.email}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            id="password"
            name="password"
            type="password"
            label="Password"
            className={`${classes.formInput}`}
            helperText={loginErrors?.password}
            error={!!loginErrors?.password}
            value={loginData.password}
            onChange={handleChange}
            fullWidth
          />
          {loginErrors?.general && (
            <Typography variant="body2" className={`${classes.generalError}`}>
              {loginErrors?.general}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={`${classes.loginButton}`}
            disabled={isBtnDisabled()}
          >
            {actionLoading ? (<CircularProgress size={30} />) : "Login"}
          </Button>
          <br />
          <small>
            dont have an account ? sign up {<Link to="/signup">here</Link>}
          </small>
        </form>
      </Card>
    </Box>
  );
}
export default Login;