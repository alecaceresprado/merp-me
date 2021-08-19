import React, { useEffect } from 'react';

import { Link } from 'react-router-dom';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import styles from './styles';
import axios from 'axios';
import { getUi, setIsCriticalLoading } from '../../store/uiReducer';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getUser } from '../../store/userReducer';
import { getCharacter, setCharacters } from '../../store/characterReducer';
import CharPreview from '../../components/characterPreview';

const HomePage = (): React.ReactElement => {

  const dispatch = useAppDispatch();
  const { userDetails } = useAppSelector(getUser);
  const { criticalLoading } = useAppSelector(getUi);
  const { characters } = useAppSelector(getCharacter);

  useEffect(() => {
    dispatch(setIsCriticalLoading(true));
    axios.get('/character')
      .then(result => {
        dispatch(setCharacters(result.data));
      })
      .catch(error => {
        console.log(error)
        //  TODO: HANDLE ERROR SCENARIOS
      })
      .finally(() => {
        dispatch(setIsCriticalLoading(false));
      });
  }, [userDetails])
  const classes = styles();

  if(Array.isArray(characters) && criticalLoading) {
    dispatch(setIsCriticalLoading(false));
  }

  return (
    <Box bgcolor="background.main" className={`${classes.container}`}>
      <Typography variant="h2">
        Your characters await!
      </Typography>
      <div className={`${classes.charactersContainer}`}>
        {criticalLoading ?
          <CircularProgress size={80} className={`${classes.spinner}`} /> :
          characters?.map(character => (<CharPreview character={character}></CharPreview>)) }
      </div>
      {/* <Button color="inherit">Create New! </Button> */}
    </Box>
  );
}
export default HomePage;