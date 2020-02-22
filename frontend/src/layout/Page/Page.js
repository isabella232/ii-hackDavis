import React from "react";
import { Route, Switch } from "react-router-dom";

import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";

import LandingPage from "../../containers/LandingPage/LandingPage";
import SearchPage from "../../containers/SearchPage/SearchPage";
import ContactUsPage from "../../containers/ContactUsPage/ContactUsPage";
import WebinarPage from "../../containers/WebinarPage/WebinarPage";
import AdminPage from "../../containers/AdminPage/AdminPage";

const Page = props => {
  return (
    <>
      <Navigation />

      <main>
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route path="/webinar" component={WebinarPage} />
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
