import React from 'react';

import styles from './styles';

const CharImage = ({ imgUrl }: { imgUrl: string }): React.ReactElement => {
  const classes = styles();

  return (<img className={`${classes.imageContainer}`} src={imgUrl} />)
}

export default CharImage;