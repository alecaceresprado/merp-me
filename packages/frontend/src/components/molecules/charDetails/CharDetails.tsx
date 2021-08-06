import React from 'react';
import Box from '@material-ui/core/Box';
import { TextField } from '@material-ui/core';

import styles from './styles';
import CharStats from '../charStats/CharStats';
import { Belor } from '../../../mocks';


const CharDetails = (): React.ReactElement => {
  const classes = styles();
  const character = Belor;

  return (
    <Box bgcolor="background.secondary" className={`${classes.container}`}>
      <div className={`${classes.details}`}>
        <div className={`${classes.row}`}>
          <TextField className={`${classes.margRight}`} id="charName" label="Nombre PJ" />
          <TextField className={``} id="playerName" label="Jugador" />
        </div>
        <div className={`${classes.row}`}>
          <TextField className={`${classes.margRight}`} id="charRace" label="Raza" />
          <TextField className={`${classes.margRight} ${classes.small}`} id="charHeight" label="Estatura" />
          <TextField className={`${classes.small}`} id="charWeight" label="Peso" />
        </div>        
        <div className={`${classes.row}`}>
          <TextField className={`${classes.margRight}`} id="charGender" label="Genero" />
          <TextField className={`${classes.margRight} ${classes.small}`} id="charAge" label="Edad" />
          <TextField className={`${classes.margRight}`} id="charHair" label="Pelo" />
          <TextField className={``} id="charEyes" label="Ojos" />
        </div>
        <div className={`${classes.rows}`}>
          <TextField className={`${classes.large}`} id="charHighlight" label="Especial fisico" />
          <TextField className={`${classes.large}`} id="charMotivation" label="Motivacion" />
        </div>
        <div className={`${classes.row}`}>
          <TextField className={`${classes.margRight}`} id="charPersonality" label="Personalidad" />
          <TextField className={``} id="charAlignment" label="Alineamiento" />
        </div>
        <div className={`${classes.row}`}>
          <TextField className={`${classes.margRight}`} id="charStatus" label="Status" />
          <TextField className={``} id="charFamily" label="Familia" />
        </div>
        <div className={`${classes.row}`}>
          <TextField className={`${classes.margRight}`} id="charClass" label="Profesion" />
          <TextField className={`${classes.margRight} ${classes.small}`} id="charLvl" label="Nivel" />
          <TextField className={`${classes.small}`} id="charExp" label="PX" />
        </div>
      </div>
      <div className={`${classes.portrait}`}>

      </div>
      <div className={`${classes.stats}`}>
        <CharStats stats={character.stats}></CharStats>
      </div>
    </Box>
  );
}
export default CharDetails;