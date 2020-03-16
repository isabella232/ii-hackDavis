import React, { Component } from "react";
import { Link } from "react-router-dom";
import classes from "./NavBar.module.css";

import Button from '../../components/shared/Button/Button';
import LoginModal from '../../components/HomePage/LoginModal/LoginModal';

class NavBar extends Component {
    constructor() {
        super();
        this.state = {
            modalStatus: false,
            isLoggedIn: false,
            userKind: 'Client'
        }

        this.changeModalStatus = this.changeModalStatus.bind(this);
        this.processLogin = this.processLogin.bind(this);
    }

    changeModalStatus = () => {
        const status = this.state.modalStatus;
        this.setState({
            modalStatus: !status
        })
    }

    processLogin = (data) => {
        this.setState({
            modalStatus: false,
            isLoggedIn: true,
            userKind: data.userKind
        })
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
                    <Link className={classes.item} to={"/contactus"}>Contact Us</Link>

                    <div className={classes.button}>
                        {!this.state.isLoggedIn ? <Button content='Login' click={this.changeModalStatus} /> : <Button content='Logout' inverted />}
                    </div>
                </div>
                <LoginModal open={this.state.modalStatus} processLogin={this.processLogin} />
            </div>
        )
    }
}

export default NavBar;
