import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

class WithAuth extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        if (!this.props.isLoggedIn) {
            this.props.history.push("/");
        }
    }

    render() {
        return <>{this.props.children}</>;
    }
}

const mapStateToProps = state => ({
    isLoggedIn: state.isLoggedIn
});


export default connect(mapStateToProps)(withRouter(WithAuth));
