import React from 'react';

import Box from '@material-ui/core/Box';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

import styles from './styles';

const HomePage = (): React.ReactElement => {
  const classes = styles();
  return (
    <Box bgcolor="background.main" className={`${classes.container}`}>
      <div className={`${classes.box}`}>
        <Button color="inherit" component={Link} to="/character">character</Button>
      </div>
    </Box>
  );
}
export default HomePage;