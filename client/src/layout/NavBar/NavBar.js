import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import classes from "./NavBar.module.css";
import { signOut } from '../../services/UserService';

import Button from '../../components/shared/Button/Button';
import SignUpModal from '../../components/HomePage/SignUpModal/SignUpModal';
import LoginModal from '../../components/HomePage/LoginModal/LoginModal';

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

    processLogin = async (userKind) => {
        this.props.login();
        this.switchLoginModal();
        if (this.state.userKind === 'Admin') {
            this.props.history.push('/admin');
        } else {
            this.props.history.push('/profile');
        }
    }

    processLogout = async () => {
        await signOut()
        this.props.logout();
        this.props.history.push('/');
    }

    render() {
        return (
            <div className={classes.NavBar}>
                <Link className={classes.logo} to={"/"}>Logo</Link>
                <div className={classes.items}>
                    <Link className={classes.item} to={"/about"}>About</Link>
                    {this.state.userKind === 'Admin' ? <Link className={classes.item} to={"/admin"}>Admin</Link> : null}
                    {this.state.userKind === 'Client' ? <Link className={classes.item} to={"/profile"}>Profile</Link> : null}
                    <Link className={classes.item} to={"/search"}>Search</Link>

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
                    switchLoginModal={this.switchLoginModal} />
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
