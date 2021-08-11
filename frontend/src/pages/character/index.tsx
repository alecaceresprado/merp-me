import React from 'react';
import Box from '@material-ui/core/Box';

import styles from './styles';
import CharDetails from '../../components/charDetails';

const Character = (): React.ReactElement => {
  const classes = styles();
  return (
    <Box bgcolor="background.main" className={`${classes.container}`}>
      <div className={`${classes.box}`}>
        <CharDetails></CharDetails>
      </div>
    </Box>
  );
}
export default Character;