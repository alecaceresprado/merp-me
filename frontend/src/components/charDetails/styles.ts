import { makeStyles } from "@material-ui/core";

import {theme} from '../../theme'

export default makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.25rem',
    [theme.breakpoints.down('xs')]: {
      flexWrap: 'wrap',
      flexDirection: 'column'
    },
  },
  details: {
    width: '40%',
    [theme.breakpoints.down('xs')]: {
      width: '60%'
    },
  }, portrait: {
    width: '20%', 
    margin: '2rem'
  }, stats: {
    width: '40%',
    display: 'flex', 
    justifyContent: 'flex-end'
  },
  row: {
    'display': 'flex',
    'flex-wrap': 'nowrap',
    'align-content': 'center',
    'justify-content': 'flex-start',
    'align-items': 'center',
  },
  rows: {
    'display': 'flex',
    'flex-direction': 'column',
    'flex-wrap': 'nowrap',
    'align-content': 'stretch',
    'justify-content': 'flex-start',
    'align-items': 'flex-start',
  },
  margRight: {
    marginRight: '1rem',
  },
  small: {
    width: '19%',
    maxWidth: '5.5rem'
  },
  large: {
    width: '100%',
    maxWidth: '25rem'
  }
});