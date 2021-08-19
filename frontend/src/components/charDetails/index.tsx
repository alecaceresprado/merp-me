import React, { ChangeEvent } from 'react';

import Box from '@material-ui/core/Box';
import { TextField } from '@material-ui/core';

import styles from './styles';
import CharStats from '../charStats';
import { Belor } from '../../mocks';
import CharImage from '../charImage';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getSelectedCharacter, updateCharacterProp } from '../../store/characterReducer';


const CharDetails = (): React.ReactElement => {
  const classes = styles();
  const character = useAppSelector(getSelectedCharacter);
  const dispatch = useAppDispatch();

  const updateCharacter = (e: ChangeEvent<HTMLInputElement>): void => {
    const {id, value} = e.target;
    dispatch(updateCharacterProp({id, value: `${value}`}))
  }

  return (
    <Box bgcolor="background.secondary" className={`${classes.container}`}>
      <div className={`${classes.details}`}>
        <div className={`${classes.row}`}>
          <TextField className={`${classes.margRight}`} id="details.name" label="Nombre PJ" value={character?.details.name} onChange={updateCharacter} />
          <TextField className={``} id="playerName" label="details.player" value={character?.details.player} onChange={updateCharacter}/>
        </div>
        <div className={`${classes.row}`}>
          <TextField className={`${classes.margRight}`} id="details.race" label="Raza" value={character?.details.race} onChange={updateCharacter} />
          <TextField className={`${classes.margRight} ${classes.small}`} id="details.height" label="Estatura" value={character?.details.height} onChange={updateCharacter} />
          <TextField className={`${classes.small}`} id="charWeight" label="Peso" value={character?.details.name} onChange={updateCharacter} />
        </div>
        <div className={`${classes.row}`}>
          <TextField className={`${classes.margRight}`} id="details.gender" label="Genero" value={character?.details.gender} onChange={updateCharacter} />
          <TextField className={`${classes.margRight} ${classes.small}`} id="details.age" label="Edad" value={character?.details.age} onChange={updateCharacter} />
          <TextField className={`${classes.margRight}`} id="details.hair" label="Pelo" value={character?.details.hair} onChange={updateCharacter} />
          <TextField className={``} id="details.eyes" label="Ojos" value={character?.details.eyes} onChange={updateCharacter}  />
        </div>
        <div className={`${classes.rows}`}>
          <TextField className={`${classes.large}`} id="details.highlight" label="Especial fisico" value={character?.details.highlight} onChange={updateCharacter} />
          <TextField className={`${classes.large}`} id="details.motivation" label="Motivacion" value={character?.details.motivation} onChange={updateCharacter} />
        </div>
        <div className={`${classes.row}`}>
          <TextField className={`${classes.margRight}`} id="deails.personality" label="Personalidad"  value={character?.details.personality} onChange={updateCharacter}/>
          <TextField className={``} id="details.alignment" label="Alineamiento"  value={character?.details.alignment} onChange={updateCharacter}/>
        </div>
        <div className={`${classes.row}`}>
          <TextField className={`${classes.margRight}`} id="details.status" label="Status"  value={character?.details.status} onChange={updateCharacter} />
          <TextField className={``} id="details.family" label="Familia"  value={character?.details.family} onChange={updateCharacter} />
        </div>
        <div className={`${classes.row}`}>
          <TextField className={`${classes.margRight}`} id="details.class" label="Profesion"  value={character?.details.class} onChange={updateCharacter} />
          <TextField className={`${classes.margRight} ${classes.small}`} id="details.level" label="Nivel"  value={character?.details.level} onChange={updateCharacter} />
          <TextField className={`${classes.small}`} id="details.experience" label="PX"  value={character?.details.experience} onChange={updateCharacter} />
        </div>
      </div>
      <div className={`${classes.portrait}`}>
        <CharImage imgUrl={`${character?.imgUrl}`}></CharImage>
      </div>
      <div className={`${classes.stats}`}>
        <CharStats stats={Belor.stats}></CharStats>
      </div>
    </Box>
  );
}
export default CharDetails;