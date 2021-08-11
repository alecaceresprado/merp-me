import React from 'react';
import { TextField } from '@material-ui/core';

import styles from './styles';
import { Stats, statsMapping } from '../../types';

const Character = ({ stats }: { stats: Stats }): React.ReactElement => {
  const classes = styles();
  return (
    <table>
      <thead>
        <tr>
          <th>Caracteristicas</th>
          <th>Valor</th>
          <th>Bonif</th>
          <th>Raza</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(stats).map((stat: string) => {
          const statVal: number = stats[(stat as keyof Stats)];
          const statValueCut = Object.keys(statsMapping).reverse().findIndex(cut => statVal >= parseInt(cut));
          const statBonusArr = Object.values(statsMapping).reverse();
          const statBonus = statBonusArr[statValueCut];
          const raceValue = 5;
          return (
            <tr key={`stat-${stat}`}>
              <td>{stat}</td>
              <td><TextField className={`${classes.stat}`} id={`inputStat-${stat}`} value={statVal} /></td>
              <td>{statBonus}</td>
              <td>{raceValue}</td>
              <td>{statBonus + raceValue}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  );
}
export default Character;