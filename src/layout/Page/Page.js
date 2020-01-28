import React from "react";
import { Route, Switch } from "react-router-dom";

import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";

import LandingPage from "../../containers/LandingPage/LandingPage";
import SearchPage from "../../containers/SearchPage/SearchPage";
import ContactUsPage from "../../containers/ContactUsPage/ContactUsPage";
import WebinarPage from "../../containers/WebinarPage/WebinarPage";

const Page = props => {
  return (
    <>
      <Navigation />

      <main>
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route path="/search" exact component={SearchPage} />
          <Route path="/webinar" exact component={WebinarPage} />
          <Route path="/contactus" exact component={ContactUsPage} />
        </Switch>
      </main>
      
      <Footer />
    </>
  );
};

export default Page;
