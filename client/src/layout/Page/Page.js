import React from "react";
import { Route, Switch } from "react-router-dom";

import NavBar from '../NavBar/NavBar';
import Footer from "../Footer/Footer";

import HomePage from "../../containers/HomePage/HomePage";
import SearchPage from "../../containers/SearchPage/SearchPage";
import ContactUsPage from "../../containers/ContactUsPage/ContactUsPage";
import AdminPage from "../../containers/AdminPage/AdminPage";
import ProfilePage from '../../containers/ProfilePage/ProfilePage';

import { withAuth } from '../../components/HOC/withAuth';

const Page = props => {
  return (
    <>
      <NavBar />

      <main>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/admin" component={withAuth(AdminPage)} />
          <Route path="/profile" component={withAuth(ProfilePage)} />
          <Route path="/search" component={SearchPage} />
          <Route path="/contactus" component={ContactUsPage} />
        </Switch>
      </main>

      <Footer />
    </>
  );
};

export default Page;
