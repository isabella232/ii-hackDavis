import React, { Component } from 'react';
import classes from './SignUpModal.module.css';

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

import Button from '../../shared/Button/Button';
import FileUploader from '../../shared/FileUploader/FileUploader';
import CircularProgress from '@material-ui/core/CircularProgress';

import { signUpClient, signUpInterpreter } from '../../../services/UserService';

class SignUpModal extends Component {
    constructor(props) {
        super();
        this.state = {
            // open: true,
            // window: 2,
            // kind: 'Interpreter',

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
                Relate: false,
                Translating: false
            },
            loading: false
        }

        this.closeModal = this.closeModal.bind(this);
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
            avatar: null,
            languages: [{
                language: '',
                fluency: 1
            }],
            location: '',
            summary: '',
            services: {
                Simultaneous: false,
                Consecutive: false,
                Relate: false,
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
                this.clearAllFields();
                this.props.switchSignUpModal();
                this.props.openLogin();
                this.unload();
            })
            .catch(e => {
                alert('You cannot be signed up at this time.');
                this.unload();
            })
    }

    submitInterpreter = async (data) => {
        let check = true;
        for (const lang in this.state.languages) {
            if (lang.language === '' || lang.fluency === '') {
                check = false;
                alert("Please fill out all of the language fields.");
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
            alert(`Please fill out your interpreting services.`);
        }

        if (this.state.location === '') {
            check = false;
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
                    this.clearAllFields();
                    this.props.switchSignUpModal();
                    this.props.openLogin();
                    this.unload();
                })
                .catch(e => {
                    alert('You cannot be signed up at this time.')
                    this.unload();
                })
        }
    }

    submitForm = async () => {
        if (!this.state.email) {
            alert(`Please fill out your email.`);
        } else if (!this.state.password) {
            alert(`Please fill out your password.`);
        } else if (!this.state.avatar) {
            alert(`Please upload your avatar.`);
        } else if (this.state.password !== this.state.confirmPassword) {
            alert(`Please check your password.`);
        } else if (this.state.length < 8 || this.state.confirmPassword.length < 8) {
            alert(`Password must be at least 8 characters.`);
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
            </div>
        </>;
        const singleBack = <Button content={'Back'} inverted click={this.switchToLogin} />;
        const singleNext = <Button content={'Sign Up'} click={this.submitForm} />;

        const menuItems = [];
        for (let i = 1; i <= 5; i++) {
            menuItems.push(<MenuItem id={`menu-item-${i}`} value={i}>{i}</MenuItem>)
        }
        const addIcon = <AddIcon className={classes.langFieldIcon} color="primary" onClick={this.pushLangField} />;
        const removeIcon = <HighlightOffIcon className={classes.langFieldIcon} color="error" onClick={this.popLangField} />;

        const langFields = this.state.languages.map((lang, i) =>
            <Grid container spacing={2} key={`lang-outer-grid-${i}`}>
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
        );

        const secondWindow = <>
            {langFields}

            <div className={classes.serviceArea}>
                <div className={classes.serviceLabel}>Services:</div>
                <FormGroup row>
                    <FormControlLabel control={<Checkbox color="primary" checked={this.state.services.Simultaneous} onChange={this.changeServices} name="Simultaneous" />} label="Simultaneous" />
                    <FormControlLabel control={<Checkbox color="primary" checked={this.state.services.Consecutive} onChange={this.changeServices} name="Consecutive" />} label="Consecutive" />
                    <FormControlLabel control={<Checkbox color="primary" checked={this.state.services.Relate} onChange={this.changeServices} name="Relate" />} label="Relate" />
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

            <TextField label="Phone Number"
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
                            <div className={classes.title}>Sign Up</div>
                            {this.state.loading ? <CircularProgress color="primary" /> : null}
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

export default SignUpModal;
