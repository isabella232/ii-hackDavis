import React from 'react';
import { TextField, NoSsr } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

//import classes from './StyledTextField.module.css';

const useStyles = makeStyles({
  root: {
    margin: '10px',
    color: '#03A0B5',
    width: '400px'
  },
  
});

const StyledTextField = (props) => {
  const classes = useStyles();

  return (
    <NoSsr>
      <TextField 
        classes={{
          root: classes.root
        }}
        label={props.content} 
        variant="outlined" 
        id="deterministic-outlined-input" />
    </NoSsr>
  )
}

export default StyledTextField;