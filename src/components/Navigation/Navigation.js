import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import { Button } from '@material-ui/core';

import LandingPage from '../../containers/LandingPage/LandingPage';
import SearchPage from '../../containers/SearchPage/SearchPage';
import ContactUsPage from '../../containers/ContactUsPage/ContactUsPage';
import WebinarPage from '../../containers/WebinarPage/WebinarPage';

import LogInModal from '../modals/LogInModal/LogInModal';

import classes from './Navigation.module.css'

class Navigation extends Component {

    state = {
        showLogInModal: false
    }

    toggleLogInModalHandler = () => {
        console.log('Was clicked!');

        const doesShow = this.state.showLogInModal;
        this.setState({showLogInModal: !doesShow});
    }

    turnOffLogInModalHandler = () => {
        this.setState({showLogInModal: false});
    }

    render() {
        let lim = null;

        if (this.state.showLogInModal) {
            lim = <LogInModal />
        }

        return (
            <div className="">
                <Router>
                    <nav className = "navBar">
                        <a onClick={this.turnOffLogInModalHandler}>
                            <img src=""/>
                        </a>
                        <Link to="/" onClick={this.turnOffLogInModalHandler}>Indigenous Interpreters</Link>
                        <ul>
                            <li onClick={this.turnOffLogInModalHandler}>
                                <Link to="/search"> Search </Link>
                            </li>
                            <li onClick={this.turnOffLogInModalHandler}>
                                <Link to="/webinar"> Webinar </Link>
                            </li>
                            <li onClick={this.turnOffLogInModalHandler}>
                                <Link to="/contactus"> Contact Us </Link>
                            </li >
                            {/* TODO: insert logic for switching between profile
                            and log in button */}
                            <Button 
                                variant="contained" 
                                onClick={this.toggleLogInModalHandler}
                                color="primary">
                                    Log In
                            </Button>
                            {lim}
                        </ul>
                    </nav>
                    <br/>
                    <Route path="/" exact component={LandingPage} />
                    <Route path="/search"  exact component={SearchPage} />
                    <Route path="/webinar"  exact component={WebinarPage} />
                    <Route path="/contactus" component={ContactUsPage} />
                </Router>
            </div>
        );
    }
}

export default Navigation;