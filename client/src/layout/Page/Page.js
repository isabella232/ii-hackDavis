import React from "react";
import { Route, Switch } from "react-router-dom";

import NavBar from '../NavBar/NavBar';
import Footer from "../Footer/Footer";

import WithAuth from '../../containers/HOC/WithAuth';
import HomePage from "../../containers/HomePage/HomePage";
import SearchPage from "../../containers/SearchPage/SearchPage";
import ContactUsPage from "../../containers/ContactUsPage/ContactUsPage";
import AdminPage from "../../containers/AdminPage/AdminPage";
import ProfilePage from '../../containers/ProfilePage/ProfilePage';

const Page = props => {
  return (
    <>
      <NavBar />

      <main>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <WithAuth>
            <Route path="/admin" component={AdminPage} />
            <Route path="/profile" component={ProfilePage} />
          </WithAuth>
          <Route path="/search" component={SearchPage} />
          <Route path="/contactus" component={ContactUsPage} />
        </Switch>
      </main>

      <Footer />
    </>
  );
};

export default Page;
