import React, { Component } from 'react';
import classes from './css/SignUpModal.module.css';

import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import AddIcon from '@material-ui/icons/Add';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';

import Button from '../shared/Button';
import FileUploader from '../shared/FileUploader';
import CircularProgress from '@material-ui/core/CircularProgress';

import { withSnackbar } from 'notistack';

import { signUpClient, signUpInterpreter } from '../../services/UserService';

class SignUpModal extends Component {
    constructor(props) {
        super();
        this.state = {
            window: 1,
            kind: 'Client',
            open: props.open,
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            avatar: null,
            languages: [{
                language: '',
                fluency: 1
            }],
            location: '',
            phone: '',
            summary: '',
            services: {
                Simultaneous: false,
                Consecutive: false,
                Relay: false,
                Translating: false
            },
            loading: false
        }

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.clickShowPassword = this.clickShowPassword.bind(this);
        this.switchToLogin = this.switchToLogin.bind(this);
        this.changeInput = this.changeInput.bind(this);
        this.changeWindow = this.changeWindow.bind(this);
        this.fileUpload = this.fileUpload.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.open !== prevProps.open) {
            this.setState({ open: this.props.open });
        }
    }

    openModal = () => { this.props.switchSignUpModal(); }

    closeModal = () => { this.props.switchSignUpModal(); }

    load = () => { this.setState({ loading: true }); }

    unload = () => { this.setState({ loading: false }); }

    clickShowPassword = (event) => {
        event.preventDefault();
        const val = !this.state.showPassword
        this.setState({ showPassword: val });
    }

    switchToLogin = () => {
        this.props.switchSignUpModal();
        this.props.openLogin();
    }

    changeWindow = () => {
        const currentWindow = this.state.window;
        this.setState({ window: (currentWindow === 1) ? 2 : 1 });
    }

    pushLangField = () => {
        const languages = this.state.languages;
        languages.push({ language: '', fluency: 1 });
        this.setState({ languages: languages });
    }

    popLangField = () => {
        const languages = this.state.languages;
        languages.pop();
        this.setState({ languages: languages });
    }

    changeInput = (e) => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    }

    changeKindRadio = (e) => {
        e.preventDefault();
        this.setState({ kind: e.target.value });
    }

    changeLanguage = (e, i) => {
        e.preventDefault();
        const languages = this.state.languages;
        languages[i].language = e.target.value;
        this.setState({ languages: languages });
    }

    changeFluency = (e, i) => {
        e.preventDefault();
        const languages = this.state.languages;
        languages[i].fluency = e.target.value;
        this.setState({ languages: languages });
    }

    changeServices = (e) => {
        e.preventDefault();
        const services = { ...this.state.services };
        services[e.target.name] = e.target.checked;
        this.setState({ services: services });
    }

    fileUpload = (fileItem) => {
        this.setState({ avatar: fileItem });
    }

    clearAllFields = () => {
        const state = {
            window: 1,
            kind: 'Client',
            open: this.props.open,
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            showPassword: '',
            avatar: null,
            languages: [{
                language: '',
                fluency: 1
            }],
            location: '',
            phone: '',
            summary: '',
            services: {
                Simultaneous: false,
                Consecutive: false,
                Relay: false,
                Translating: false
            }
        };
        for (const field in state) {
            this.setState({ [field]: state[field] });
        }
    }

    submitClient = async (data) => {
        this.load();
        signUpClient(data)
            .then(data => {
                this.props.enqueueSnackbar(`Success! Please check your email for account verification.`, {
                    variant: 'success',
                    persist: true
                });
                this.clearAllFields();
                this.props.switchSignUpModal();
                this.unload();
            })
            .catch(e => {
                this.props.enqueueSnackbar(e.message, { variant: 'error' });
                this.unload();
            })
    }

    submitInterpreter = async (data) => {
        let check = true;
        for (const lang in this.state.languages) {
            if (lang.language === '' || lang.fluency === '') {
                check = false;
                this.props.enqueueSnackbar("Please fill out all of the language fields.", { variant: 'info' });
                break;
            }
        }

        let services = [];
        for (const [key, val] of Object.entries(this.state.services)) {
            if (val) {
                services.push(key);
            }
        }

        if (services.length === 0) {
            check = false;
            this.props.enqueueSnackbar(`Please mark your interpreting services.`, { variant: 'info' });
        }

        if (this.state.location === '') {
            check = false;
            this.props.enqueueSnackbar(`Please fill out your location.`, { variant: 'info' });
        } else if (this.state.phone !== '' && !/\d{3}-\d{3}-\d{4}/.test(this.state.phone)) {
            check = false;
            this.props.enqueueSnackbar(`Phone number must be in the ###-###-#### format.`, { variant: 'info' });
        }

        if (check) {
            this.load();
            data.languages = this.state.languages;
            data.location = this.state.location;
            data.phone = this.state.phone;
            data.services = services;
            data.summary = this.state.summary;
            signUpInterpreter(data)
                .then(data => {
                    this.props.enqueueSnackbar(`Success! Please check your email for account verification.`,
                        { variant: 'success', persist: true });
                    this.clearAllFields();
                    this.props.switchSignUpModal();
                    this.unload();
                })
                .catch(e => {
                    this.props.enqueueSnackbar(e.message, { variant: 'error' });
                    this.unload();
                })
        }
    }

    submitForm = async () => {
        if (!this.state.name) {
            this.props.enqueueSnackbar(`Please fill out your name.`, { variant: 'info' });
        } else if (!this.state.email) {
            this.props.enqueueSnackbar(`Please fill out your email.`, { variant: 'info' });
        } else if (!this.state.password) {
            this.props.enqueueSnackbar(`Please fill out your password.`, { variant: 'info' });
        } else if (this.state.password.length < 8) {
            this.props.enqueueSnackbar(`Password must be at least 8 characters.`, { variant: 'info' });
        } else if (this.state.password !== this.state.confirmPassword) {
            this.props.enqueueSnackbar(`Passwords do not match. Check again.`, { variant: 'info' });
        } else if (!this.state.avatar) {
            this.props.enqueueSnackbar(`Please upload your avatar.`, { variant: 'info' });
        } else {
            const data = {
                kind: this.state.kind,
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                avatar: this.state.avatar
            }

            if (this.state.kind === 'Client') {
                this.submitClient(data);
            } else if (this.state.kind === 'Interpreter') {
                this.submitInterpreter(data);
            }
        }
    }

    render() {
        const singleWindow = <>
            <RadioGroup aria-label="kind" name={'kind'} value={this.state.kind} onChange={this.changeInput}>
                <div className={classes.kindArea}>
                    <div className={classes.label}>I am a:</div>
                    <FormControlLabel value="Client" control={<Radio checked={this.state.kind === 'Client'} color="primary" />} label="Client" />
                    <FormControlLabel value="Interpreter" control={<Radio checked={this.state.kind === 'Interpreter'} color="primary" />} label="Interpreter" />
                </div>
            </RadioGroup>

            <Grid container spacing={2} justify='center'>
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
                        type={this.state.showPassword ? 'text' : 'password'}
                        required
                        margin="dense"
                        value={this.state.password}
                        fullWidth
                        variant="outlined"
                        onChange={this.changeInput}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">
                                <IconButton onClick={this.clickShowPassword}>
                                    {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }} />
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
            </div>
        </>;
        const singleBack = <Button content={'Back'} inverted click={this.switchToLogin} />;
        const singleNext = <Button content={'Sign Up'} click={this.submitForm} />;

        const menuItems = [];
        for (let i = 1; i <= 5; i++) {
            menuItems.push(<MenuItem id={`sign-up-menu-item-${i}`} value={i} key={`menu-item-${i}`}>{i}</MenuItem>)
        }
        const addIcon = <AddIcon className={classes.langFieldIcon} color="primary" onClick={this.pushLangField} />;
        const removeIcon = <HighlightOffIcon className={classes.langFieldIcon} color="error" onClick={this.popLangField} />;

        const langFields = this.state.languages.map((lang, i) => (
            <div key={`sign-up-lang-grid-${i}`}>
                <Grid container spacing={2}>
                    <Grid item xs={7}>
                        <TextField label="Language"
                            name="language"
                            required
                            value={lang.language}
                            margin="dense"
                            fullWidth
                            variant="outlined"
                            onChange={(e) => this.changeLanguage(e, i)} />
                    </Grid>

                    <Grid item xs={3}>
                        <FormControl variant="outlined" fullWidth margin="dense">
                            <InputLabel>Fluency</InputLabel>
                            <Select label="Age"
                                value={lang.fluency}
                                onChange={(e) => this.changeFluency(e, i)}>
                                {menuItems}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={2}>
                        <div className={classes.langFieldIcons}>
                            {(i > 0) ? removeIcon : null}
                            {(this.state.languages.length === 1 || i === this.state.languages.length - 1) ? addIcon : null}
                        </div>
                    </Grid>
                </Grid>
            </div>)
        );

        const secondWindow = <>
            {langFields}

            <div className={classes.serviceArea}>
                <div className={classes.serviceLabel}>Services:</div>
                <FormGroup row>
                    <FormControlLabel control={<Checkbox color="primary" checked={this.state.services.Simultaneous} onChange={this.changeServices} name="Simultaneous" />} label="Simultaneous" />
                    <FormControlLabel control={<Checkbox color="primary" checked={this.state.services.Consecutive} onChange={this.changeServices} name="Consecutive" />} label="Consecutive" />
                    <FormControlLabel control={<Checkbox color="primary" checked={this.state.services.Relay} onChange={this.changeServices} name="Relay" />} label="Relay" />
                    <FormControlLabel control={<Checkbox color="primary" checked={this.state.services.Translating} onChange={this.changeServices} name="Translating" />} label="Translating" />
                </FormGroup>
            </div>

            <TextField label="Location"
                name="location"
                required
                value={this.state.location}
                margin="dense"
                fullWidth
                variant="outlined"
                onChange={this.changeInput} />

            <TextField label="Phone Number (###-###-####)"
                name="phone"
                value={this.state.phone}
                margin="dense"
                fullWidth
                variant="outlined"
                onChange={this.changeInput} />

            <TextField label="Summary"
                name="summary"
                value={this.state.summary}
                margin="dense"
                fullWidth
                variant="outlined"
                multiline
                rows={5}
                onChange={this.changeInput} />
        </>;

        const doubleWindow = (this.state.window === 1) ?
            singleWindow
            : secondWindow;
        const doubleBack = (this.state.window === 1) ?
            singleBack
            : <Button content={'Back'} inverted click={this.changeWindow} />;
        const doubleNext = (this.state.window === 1) ?
            <Button content={'Next'} click={this.changeWindow} />
            : singleNext;

        const window = (this.state.kind === 'Client') ? singleWindow : doubleWindow;
        const backButton = (this.state.kind === 'Client') ? singleBack : doubleBack;
        const nextButton = (this.state.kind === 'Client') ? singleNext : doubleNext;

        return <>
            <Modal className={classes.Modal}
                open={this.state.open}
                onClose={this.closeModal}
                BackdropComponent={Backdrop}
                BackdropProps={{ timeout: 200 }}>
                <Fade in={this.state.open}>
                    <div className={classes.card}>
                        <div className={classes.header}>
                            <div className={classes.title}>Join Us!</div>
                            {this.state.loading ? <CircularProgress color="primary" size={25} /> : null}
                        </div>

                        {window}

                        <div className={classes.footer}>
                            <div className={classes.buttons}>
                                {backButton}
                                {nextButton}
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </>
    }
}

export default withSnackbar(SignUpModal);
