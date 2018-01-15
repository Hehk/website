import React from "react";
import FunctionLinks from "./functionLinks";
import Block from "./block";

const Footer = () => (
  <Block>
    <FunctionLinks
      name="contact"
      links={[
        { name: "github", to: "https://github.com/hehk/", outsideWorld: true },
        {
          name: "email",
          to: "mailto:kyle1101000@gmail.com",
          outsideWorld: true
        }
      ]}
    />
  </Block>
);

export default Footer;
