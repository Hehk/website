import React from "react";
import Link from "gatsby-link";

import Comment from "./comment";
import FunctionLinks from "./functionLinks";

const Header = () => (
  <div className="w-100">
    <div className="">
      <Link className="black no-underline" to="/">
        <Comment>Hehk</Comment>
      </Link>
      <div className="dib fr">
        <FunctionLinks
          name="nav"
          links={[
            { name: "about", to: "/about" },
            { name: "projects", to: "/projects" }
          ]}
        />
      </div>
    </div>
  </div>
);

export default Header;
