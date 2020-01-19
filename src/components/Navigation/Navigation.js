import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";

class Navigation extends Component {
    render() {
        return (
            <div className="">
                <Router>
                    <nav className = "navBar">
                        <a>
                            <img src=""/>
                        </a>
                        <Link to="/">Indigenous Interpreters</Link>
                        <ul>
                            <li>
                                <Link to="Search"> Search </Link>
                            </li>
                            <li>
                                <Link to="Resources"> Resources </Link>
                            </li>
                            <li>
                                <Link to="Contact Us"> Contact Us </Link>
                            </li>
                            <button>Log In</button>
                        </ul>
                    </nav>
                </Router>
            </div>
        )
    }
}

export default Navigation;