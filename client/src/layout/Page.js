import React from "react";
import { Route, Switch } from "react-router-dom";

import NavBar from './NavBar';
import Footer from "./Footer";

import HomePage from "../components/HomePage/HomePage";
import AboutUsPage from '../components/AboutUsPage/AboutUsPage';
import SearchPage from "../components/SearchPage/SearchPage";
import ContactUsPage from "../components/ContactUsPage/ContactUsPage";
import AdminPage from "../components/AdminPage/AdminPage";
import AdminSignUpPage from "../components/AdminSignUpPage/AdminSignUpPage";
import InterpreterPage from '../components/InterpreterPage/InterpreterPage';
import ClientPage from '../components/ClientPage/ClientPage';
import AccountVerifyPage from '../components/AccountVerifyPage/AccountVerifyPage';
import ResetPasswordPage from '../components/ResetPasswordPage/ResetPasswordPage';

import { withAuth } from '../components/HOC/withAuth';

const Page = () => {
  return (
    <>
      <NavBar />

      <main>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/admin" exact component={withAuth(AdminPage)} />
          <Route path="/admin/register" component={AdminSignUpPage} />
          <Route path="/interpreter" component={withAuth(InterpreterPage)} />
          <Route path="/client" component={withAuth(ClientPage)} />
          <Route path="/search" component={SearchPage} />
          <Route path="/aboutus" exact component={AboutUsPage} />
          <Route path="/contactus" component={ContactUsPage} />
          <Route path="/user/:id/account/verify" component={AccountVerifyPage} />
          <Route path="/user/:id/password/reset" component={ResetPasswordPage} />
        </Switch>
      </main>

      <Footer />
    </>
  );
};

export default Page;
