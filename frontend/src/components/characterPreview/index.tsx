import React from 'react';

// MUI
import { Box } from '@material-ui/core';

import styles from './styles';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

import { getUi } from '../../store/uiReducer';
import { getUser } from '../../store/userReducer';
import { Character, setSelecterCharacter } from '../../store/characterReducer';
import { useHistory } from 'react-router-dom';
import CharImage from '../charImage';


const CharPreview = ({ character }: { character: Character }): React.ReactElement => {
  const classes = styles();
  const history = useHistory();
  const { passiveLoading } = useAppSelector(getUi);
  const { userDetails } = useAppSelector(getUser);
  const dispatch = useAppDispatch();
  const attributesToDisplay: Record<string, string> = {
    'Race': character.details.race,
    'Class': character.details.class,
    'Level': character.details.level,
    'Exp.': character.details.experience
  };

  const handleCharacterClick=() => {
      dispatch(setSelecterCharacter(character.id));
      history.push(`/character/${character.id}`);
  }


  return (
      <div className={`${classes.container}`} onClick={handleCharacterClick}>
        <CharImage imgUrl={character.imgUrl}></CharImage>
        <Box className={`${classes.detailsContainer}`}>
          <h4 className={`${classes.charName}`}>
            {character.details.name}
          </h4>
          {
            Object.keys(attributesToDisplay).map((attr: string) => (
              <div id={`char-${character.id}-${attr}`} className={`${classes.attributeRow}`}>
                <span>{attr}</span>
                <span>{attributesToDisplay[attr]}</span>
              </div>
            ))
          }
        </Box>
      </div>
  );
}
export default CharPreview;