import React from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";
import Helmet from "react-helmet";
import "tachyons/css/tachyons.css";

import "./index.css";
import "./custom.css";

import Header from "../components/header";
import Footer from "../components/footer";

const TemplateWrapper = ({ children }) => (
  <div className="bg-light-purple pa4-l min-vh-100">
    <Helmet
      titleTemplate="%s :: Kyle Henderson"
      defaultTitle="Kyle Henderson"
      meta={[
        { name: "description", content: "The website of Kyle Henderson" },
        { name: "keywords", content: "developer, nerd, kyle" }
      ]}
    />
    <div className="bg-white pa3 pv6-l shadow-2">
      <div className="center mw7">
        <Header />
        {children()}
        <Footer />
      </div>
    </div>
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func
};

export default TemplateWrapper;
