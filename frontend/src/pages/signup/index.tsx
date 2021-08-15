import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import styles from './styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import { useAppDispatch } from '../../store/hooks';
import { setUserDetails } from '../../store/userReducer';
import { login } from '../../helpers';
import axios from 'axios';

const Signup = (): React.ReactElement => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const classes = styles();
  const [signupData, setSignupData] = useState({
    email: '',
    userName: '',
    password: '',
    confirmPassword: ''
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<
    { 
      email?: string,
      userName?: string,
      password?: string, 
      confirmPassword?: string, 
      general?: string 
    }
  >({});
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    axios.post('/user', signupData)
      .then(result => {
        login(result.data.token);
        dispatch(setUserDetails(result.data.user));
        history.push("/");
      })
      .catch(error => {
        if (error?.response?.data && typeof error.response.data !== 'string') {
          setErrors(error.response.data);
        } else {
          setErrors({ general: "Something went wrong! please retry" });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSignupData({
      ...signupData, 
      [name]: value
    })
  }

  const isBtnDisabled = (): boolean => (
    loading || !Object.values(signupData).every(field => field.length)
  );

  return (
    <Box className={`${classes.box}`}>
      <Card className={`${classes.card}`}>
        <div className={`${classes.textHolder}`}>
          <Typography variant="h2">
            Hello Stranger!
          </Typography>
          <Typography variant="h6">
            Before you come in, Let's see some IDs
          </Typography>
        </div>
        <form noValidate className={`${classes.form}`} onSubmit={handleSubmit}>
        <TextField
            id="email"
            name="email"
            type="email"
            label="Email"
            className={`${classes.formInput}`}
            helperText={errors.email}
            error={!!errors.email}
            value={signupData.email}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            id="userName"
            name="userName"
            type="text"
            label="userName"
            className={`${classes.formInput}`}
            helperText={errors.userName}
            error={!!errors.userName}
            value={signupData.userName}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            id="password"
            name="password"
            type="password"
            label="Password"
            className={`${classes.formInput}`}
            helperText={errors.password}
            error={!!errors.password}
            value={signupData.password}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="confirm password"
            className={`${classes.formInput}`}
            helperText={errors.confirmPassword}
            error={!!errors.confirmPassword}
            value={signupData.confirmPassword}
            onChange={handleChange}
            fullWidth
          />
          {errors.general && (
            <Typography variant="body2" className={`${classes.generalError}`}>
              {errors.general}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={`${classes.loginButton}`}
            disabled={isBtnDisabled()}
          >
            {loading ? (<CircularProgress size={30} />) : "Signup"}
          </Button>
          <br /> 
          <small>
            Already have an account ? Login {<Link to="/signup">here</Link>}
          </small>
        </form>
      </Card>
    </Box>
  );
}
export default Signup;