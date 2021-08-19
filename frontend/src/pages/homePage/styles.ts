import { makeStyles } from "@material-ui/core";

export default makeStyles({
  container: {
    marginTop: "5rem",
    padding: '0.25rem',
    display: "flex",
    flexDirection: "column",
    flexWrap: "nowrap",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  charactersContainer: {
    marginTop: '5rem',
    display: 'flex',
    flexWrap: 'wrap',
    alignContent: 'space-around',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
  },
  spinner: {
    marginTop: '5rem'
  }
});