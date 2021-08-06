import { makeStyles } from "@material-ui/core";

export default makeStyles({
  container: {
    'display': 'flex',
    'flex-direction': 'row',
    'flex-wrap': 'nowrap',
    'align-content': 'center',
    'justify-content': 'space-between',
    'padding': '0.25rem'
  },
  details: {
    width: '40%'
  }, portrait: {
    width: '20%'
  }, stats: {
    width: '40%'
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