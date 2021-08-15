import { makeStyles } from "@material-ui/core";

export default makeStyles({
  card: {
    width: "fit-content",
    padding: '2rem'
  },
  box: {
    marginTop: '15%',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignOtems: 'center'
  },
  textHolder: {
    marginBottom: '1rem'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  formInput: {
    width: '50%',
    margin: '1rem 0'
  },
  loginButton: {
    marginTop: '1rem'
  },
  generalError: {
    color: 'red',
    'font-size':'.75em'
  }
});