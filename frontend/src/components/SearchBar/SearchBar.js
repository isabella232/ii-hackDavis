import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import './SearchBar.css'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 700,
    },
  },
  search: {
    backgroundImage: 'url("../../assets/interpreter-pic.jpeg")',
    // backgroundColor: 'pink',
  }

}));


function SearchBar() {
  const classes = useStyles();

  return (
    <div className="SearchBar">
      {/* <Container fixed> */}
        <form className={classes.root} noValidate autoComplete="off">
          <TextField className={classes.search} id="outlined-basic" label="Search" variant="outlined" />
        </form>
      {/* </Container> */}

    </div>
  );
}

export default SearchBar;
