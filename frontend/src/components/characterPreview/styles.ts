import { makeStyles } from "@material-ui/core";

export default makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer'
  },
  imageContainer: {
    backgroundColor: 'dimgrey',
    borderRadius: '10rem',
    width: '10rem',
    height: '10rem',
    border: 'groove',
    zIndex: 1
  },
  detailsContainer: {
    boxShadow: '3px 5px 5px lightgrey',
    backgroundColor: 'white',
    border: 'groove',
    minWidth: '15rem',
    marginTop: '-5rem',
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    '&:hover': {
      boxShadow: '3px 5px 5px darkgrey'
    },
  },
  charName: {
    marginTop: '7rem'
  },
  attributeRow: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '90%',
    margin: '0.5rem',
    borderBottom: '1px dotted'
  }
});