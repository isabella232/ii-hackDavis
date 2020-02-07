import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

import LogInModal from "../../components/modals/LogInModal/LogInModal";

import classes from "./Navigation.module.css";

const NavElement = props => {
  return (
    <ul
      className={props.activeNav === props.name ? classes.active : null}
      onClick={() => props.clicked(props.name, !props.src)}
    >
      <Link to={props.to}>
        {props.src ? <img src={props.src} /> : props.name}
      </Link>
    </ul>
  );
};

class Navigation extends Component {
  state = {
    showLogInModal: false,
    activeNav: "Search"
  };

  toggleLogInModalHandler = () => {
    console.log("Was clicked!");

    const doesShow = this.state.showLogInModal;
    this.setState({ showLogInModal: !doesShow });
  };

  turnOffLogInModalHandler = () => {
    this.setState({ showLogInModal: false });
  };

  navButtonClickedHandler = (navName, changeName = true) => {
    this.setState({ showLogInModal: false });
    if (changeName) this.setState({ activeNav: navName });
  };

  render() {
    let lim = null;

    if (this.state.showLogInModal) {
      lim = <LogInModal />;
    }

    return (
      <header className={classes.Navigation}>
        <nav>
          <div className={classes.leftSideNav}>
            {/* <NavElement
              // name="Img"
              to="#"
              src=""
              activeNav={this.state.activeNav}
              clicked={this.navButtonClickedHandler}
            /> */}
            <NavElement
              name="Search"
              to="/search"
              activeNav={this.state.activeNav}
              clicked={this.navButtonClickedHandler}
            />
            <NavElement
              name="Webinar"
              to="/webinar"
              activeNav={this.state.activeNav}
              clicked={this.navButtonClickedHandler}
            />
            <NavElement
              name="Contact Us"
              to="/contactus"
              activeNav={this.state.activeNav}
              clicked={this.navButtonClickedHandler}
            />
            {/* TODO: insert logic for switching between profile
                            and log in button */}
            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={this.toggleLogInModalHandler}
            >
              Log In
            </Button>
          </div>
        </nav>
        {lim}
        <br />
      </header>
    );
  }
}

export default Navigation;
