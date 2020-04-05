import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';

export const withAuth = (WrappedComponent) => {
    const AuthedComponent = props => {
        const redirect = (!props.isLoggedIn) ? <Redirect to='/' /> : null;

        return (
            <>
                {redirect}
                <WrappedComponent />
            </>

        );
    }

    const mapStateToProps = state => ({
        isLoggedIn: state.isLoggedIn
    });

    return connect(mapStateToProps)(AuthedComponent);
}
