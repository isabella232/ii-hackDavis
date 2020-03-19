import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import classes from "./NavBar.module.css";
import { signOut } from '../../services/UserService';
import { hj } from '../../services/UserService';

import Button from '../../components/shared/Button/Button';
import LoginModal from '../../components/HomePage/LoginModal/LoginModal';

class NavBar extends Component {
    constructor(props) {
        super();
        this.state = {
            modalStatus: false,
            userKind: props.userKind,
            isLoggedIn: props.isLoggedIn,
        }

        this.switchModalStatus = this.switchModalStatus.bind(this);
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

    switchModalStatus = () => {
        const status = this.state.modalStatus;
        this.setState({
            modalStatus: !status
        });
    }

    processLogin = async (userKind) => {
        this.props.login();
        this.switchModalStatus();
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
                <Link className={classes.logo} to={"/"}>Logo - {this.state.userKind}</Link>
                <div className={classes.items}>
                    {/* <Link className={classes.item} to={"/about"}>About</Link> */}
                    <div onClick={hj} className={classes.item}>Hj</div>
                    {this.state.userKind === 'Admin' ? <Link className={classes.item} to={"/admin"}>Admin</Link> : null}
                    {this.state.userKind === 'Client' ? <Link className={classes.item} to={"/profile"}>Profile</Link> : null}
                    <Link className={classes.item} to={"/search"}>Search</Link>

                    <div className={classes.button}>
                        {!this.state.isLoggedIn ? <Button content='Login' click={this.switchModalStatus} />
                            : <Button content='Logout' inverted click={this.processLogout} />}
                    </div>
                </div>
                <LoginModal open={this.state.modalStatus} isLoggedOut={!this.state.isLoggedIn} processLogin={this.processLogin} />
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
