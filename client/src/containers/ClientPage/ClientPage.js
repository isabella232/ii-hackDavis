import React, { Component } from 'react';
import classes from './ClientPage.module.css'

import Grid from '@material-ui/core/Grid';
import Button from '../../components/shared/Button/Button';
import TextField from '@material-ui/core/TextField';
import Avatar from '../../components/shared/Avatar/Avatar';
import FileUploader from '../../components/shared/FileUploader/FileUploader';
import UserFields from '../../components/UserFields/UserFields';

import { fetchClientPage } from '../../services/ClientService';

class ClientPage extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            confirmedPassword: '',
            avatar: '',
            file: '',  // for avatar
            bookmarks: [],
            window: 0
        }

        this.loadData = this.loadData.bind(this);
        this.changeInput = this.changeInput.bind(this);
        this.fileUpload = this.fileUpload.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.switchWindow = this.switchWindow.bind(this);
    }

    loadData = () => {
        fetchClientPage()
            .then(data => {
                this.setState({
                    name: data.name,
                    email: data.email,
                    avatar: data.avatar,
                    bookmarks: data.bookmarks
                })
            }).catch(error => {
                console.log(error);
            })
    }

    fileUpload = (fileItem) => {
        this.setState({ file: fileItem });
    }

    componentDidMount() {
        this.loadData();
    }

    changeInput = (e) => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    }

    submitForm = () => {

    }

    switchWindow = (e, i) => {
        this.setState({ window: i });
    }

    render() {
        const menuItems = ['Events', 'Account Update'];
        const menu = menuItems.map((item, i) => <h3 id={`menu-item-${i}`} value={i} onClick={(e) => this.switchWindow(e, i)}>{menuItems[i]}</h3>);

        const eventWindow = <div>event</div>;

        const updateWindow = <>
            {/* <Grid container spacing={2} justify='center'>
                <Grid item xs={6}>
                    <TextField label="Name"
                        name="name"
                        required
                        value={this.state.name}
                        margin="dense"
                        fullWidth
                        variant="outlined"
                        onChange={this.changeInput} />
                    <TextField label="Email"
                        name="email"
                        required
                        value={this.state.email}
                        margin="dense"
                        fullWidth
                        variant="outlined"
                        onChange={this.changeInput} />
                </Grid>

                <Grid item xs={6}>
                    <TextField label="Password"
                        name="password"
                        type="password"
                        required
                        margin="dense"
                        value={this.state.password}
                        fullWidth
                        variant="outlined"
                        onChange={this.changeInput} />
                    <TextField label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        required
                        margin="dense"
                        value={this.state.confirmPassword}
                        fullWidth
                        variant="outlined"
                        onChange={this.changeInput} />
                </Grid>
            </Grid>

            <div className={classes.fileUpload}>
                <div className={classes.label}>Avatar</div>
                <FileUploader upload={this.fileUpload} />
            </div> */}

            <UserFields name={this.state.name} email={this.state.email}
                password={this.state.password} confirmedPassword={this.state.confirmedPassword}
                changeInput={this.changeInput} fileUpload={this.fileUpload} />

            <Button content={'Update'} click={this.submitForm} />
        </>;

        const windows = [eventWindow, updateWindow];

        return (
            <div className={classes.Container}>
                <Grid container spacing={0}>
                    <Grid item xs={3}>
                        <div className={classes.menu}>
                            <h2>{this.state.name}</h2>
                            {menu}
                        </div>
                    </Grid>

                    <Grid item xs={9}>
                        {windows[this.state.window]}
                    </Grid>
                </Grid>
            </div >
        )
    }
}

export default ClientPage;

