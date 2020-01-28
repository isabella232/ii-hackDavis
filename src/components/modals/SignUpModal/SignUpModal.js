import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'Axios'
import Axios from 'Axios';

class signUpModal extends Component {
    state = {

    }

    componentDidMount() {
        // asynchronus so it returns a function
        Axios.post('')
        .then( response => {

        });
    }

    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default signUpModal;