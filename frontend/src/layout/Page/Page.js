import React from "react";
import { Route, Switch } from "react-router-dom";

import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";

import HomePage from "../../containers/HomePage/HomePage";
import SearchPage from "../../containers/SearchPage/SearchPage";
import ContactUsPage from "../../containers/ContactUsPage/ContactUsPage";
import AdminPage from "../../containers/AdminPage/AdminPage";

const Page = props => {
  return (
    <>
      <Navigation />

      <main>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/contactus" component={ContactUsPage} />
          <Route path="/admin" component={AdminPage} />
          <Route path="/search" component={SearchPage} />
        </Switch>
      </main>

      <Footer />
    </>
  );
};

export default Page;
