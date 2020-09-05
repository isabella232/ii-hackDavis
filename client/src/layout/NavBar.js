import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import classes from "./css/NavBar.module.css";
import logo from '../assets/MII_logo.png'

import Button from '../components/shared/Button';
import SignUpModal from '../components/HomePage/SignUpModal';
import LoginModal from '../components/HomePage/LoginModal';

import { signOut } from '../services/UserService';

class NavBar extends Component {
    constructor(props) {
        super();
        this.state = {
            loginModal: false,
            signUpModal: false,
            userKind: props.userKind,
            isLoggedIn: props.isLoggedIn,
        }

        this.switchLoginModal = this.switchLoginModal.bind(this);
        this.switchSignUpModal = this.switchSignUpModal.bind(this);
        this.processLogin = this.processLogin.bind(this);
        this.processLogout = this.processLogout.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.userKind !== prevProps.userKind) {
            const isLoggedIn = (this.props.userKind !== 'Visitor') ? true : false;
            this.setState({
                userKind: this.props.userKind,
                isLoggedIn: isLoggedIn
            })
        }
    }

    switchLoginModal = () => {
        const status = this.state.loginModal;
        this.setState({
            loginModal: !status
        });
    }

    switchSignUpModal = () => {
        const status = this.state.signUpModal;
        this.setState({
            signUpModal: !status
        });
    }

    processLogin = () => {
        this.props.login();
        this.switchLoginModal();
        if (this.state.userKind === 'Admin') {
            this.props.history.push('/admin');
        } else if (this.state.userKind === 'Interpreter') {
            this.props.history.push('/interpreter');
        } else if (this.state.userKind === 'Client') {
            this.props.history.push('/client');
        }
    }

    processLogout = async () => {
        await signOut()
        this.props.logout();
        this.props.history.push('/');
    }

    render() {
        const classNameAboutUs = this.props.location.pathname === '/aboutus' ? classes.activeItem : classes.item;
        const classNameAdmin = this.props.location.pathname === '/admin' ? classes.activeItem : classes.item;
        const classNameInterpreter = this.props.location.pathname === '/interpreter' ? classes.activeItem : classes.item;
        const classNameClient = this.props.location.pathname === '/client' ? classes.activeItem : classes.item;
        const classNameSearch = this.props.location.pathname === '/search' ? classes.activeItem : classes.item;


        return (
            <div className={classes.NavBar}>
                <Link className={classes.logo} to={"/"}>
                    <img src={logo} alt="MII Logo" width={'70px'} />
                </Link>
                <div className={classes.items}>
                    <Link className={classNameAboutUs} to={"/aboutus"}>About Us</Link>
                    {this.state.userKind === 'Admin' ? <Link className={classNameAdmin} to={"/admin"}>Admin</Link> : null}
                    {this.state.userKind === 'Interpreter' ? <Link className={classNameInterpreter} to={"/interpreter"}>Profile</Link> : null}
                    {this.state.userKind === 'Client' ? <Link className={classNameClient} to={"/client"}>Profile</Link> : null}
                    <Link className={classNameSearch} to={"/search"}>Search</Link>

                    <div className={classes.button}>
                        {!this.state.isLoggedIn ? <Button content='Login' click={this.switchLoginModal} />
                            : <Button content='Logout' inverted click={this.processLogout} />}
                    </div>
                </div>
                <LoginModal open={this.state.loginModal}
                    isLoggedOut={!this.state.isLoggedIn}
                    processLogin={this.processLogin}
                    switchLoginModal={this.switchLoginModal}
                    openSignUp={this.switchSignUpModal} />
                <SignUpModal open={this.state.signUpModal}
                    switchSignUpModal={this.switchSignUpModal}
                    openLogin={this.switchLoginModal} />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    userKind: state.userKind,
    isLoggedIn: state.isLoggedIn
});

const mapDispatchToProps = dispatch => {
    return {
        login: () => dispatch({ type: 'LOGIN' }),
        logout: () => dispatch({ type: 'LOGOUT' })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NavBar));
