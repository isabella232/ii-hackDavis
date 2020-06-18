import React, { Component } from 'react';
import classes from './UserFields.module.css'

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FileUploader from '../shared/FileUploader/FileUploader';

const UserFields = (props) => (
    <div className={classes.Container}>
        <Grid container spacing={2} justify='center'>
            <Grid item xs={6}>
                <TextField label="Name"
                    name="name"
                    required
                    value={props.name}
                    margin="dense"
                    fullWidth
                    variant="outlined"
                    onChange={props.changeInput} />
                <TextField label="Email"
                    name="email"
                    required
                    value={props.email}
                    margin="dense"
                    fullWidth
                    variant="outlined"
                    onChange={props.changeInput} />
            </Grid>

            <Grid item xs={6}>
                <TextField label="Password"
                    name="password"
                    type="password"
                    required
                    margin="dense"
                    value={props.password}
                    fullWidth
                    variant="outlined"
                    onChange={props.changeInput} />
                <TextField label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    required
                    margin="dense"
                    value={props.confirmPassword}
                    fullWidth
                    variant="outlined"
                    onChange={props.changeInput} />
            </Grid>
        </Grid>

        <div className={classes.fileUpload}>
            <div className={classes.label}>Avatar</div>
            <FileUploader upload={props.fileUpload} />
        </div>
    </div>
)

export default UserFields;
