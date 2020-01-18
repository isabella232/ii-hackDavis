import React from 'react';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";

class Navigation extends Component {
    render() {
        return (
            <nav className = "navBar">
                <a>
                    <img src=""/>
                </a>
                <Link to="/">Indigenous Interpreters</Link>
                <ul>
                    <li>
                        <Link to="Search"/>
                    </li>
                    <li>
                        <Link to="Resources"/>
                    </li>
                    <li>
                        <Link to="Contact Us"/>
                    </li>
                    <button>Log In</button>
                </ul>
            </nav>
        )
    }
}