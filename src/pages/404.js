import React from "react";
import Helmet from "react-helmet";

import Block from "../components/block";

const NotFoundPage = () => (
  <div>
    <Helmet title="404" />
    <Block>
      <h1>NOT FOUND</h1>
      <p>Some pages are just not meant to be.</p>
    </Block>
  </div>
);

export default NotFoundPage;
