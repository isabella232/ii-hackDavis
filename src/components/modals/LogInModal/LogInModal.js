import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

class LogInModal extends Component{
    render () {
        return(
            <div>
                <p>Log in to view your profile</p>
                <TextField
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    color="primary" />
                <TextField
                    id="outlined-basic"
                    label="Password"
                    variant="outlined"
                    color="primary" />
            </div>
        )
    }
}

export default LogInModal;
