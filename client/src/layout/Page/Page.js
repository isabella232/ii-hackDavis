import React from "react";
import { Route, Switch } from "react-router-dom";

import NavBar from '../NavBar/NavBar';
import Footer from "../Footer/Footer";

import HomePage from "../../containers/HomePage/HomePage";
import SearchPage from "../../containers/SearchPage/SearchPage";
import ContactUsPage from "../../containers/ContactUsPage/ContactUsPage";
import AdminPage from "../../containers/AdminPage/AdminPage";
import AdminSignUpPage from "../../containers/AdminSignUpPage/AdminSignUpPage";
import InterpreterPage from '../../containers/InterpreterPage/InterpreterPage';
import ClientPage from '../../containers/ClientPage/ClientPage';

import { withAuth } from '../../components/HOC/withAuth';

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
          <Route path="/contactus" component={ContactUsPage} />
        </Switch>
      </main>

      <Footer />
    </>
  );
};

export default Page;
