import React from 'react';
import Box from '@material-ui/core/Box';

import styles from './styles';

const Signup = (): React.ReactElement => {
  const classes = styles();
  return (
    <Box bgcolor="background.main" className={`${classes.container}`}>
      <div className={`${classes.box}`}>
        Signup
      </div>
    </Box>
  );
}
export default Signup;