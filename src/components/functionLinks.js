import React from "react";
import Link from "gatsby-link";

const FunctionLinks = ({ name, links }) => (
  <ul className="list dib ma0 pa0">
    <li className="dib mr2-ns moon-gray">{`${name}(`}</li>
    {links.map(e => (
      <li className="dib mr2-ns">
        {e.outsideWorld ? (
          <a href={e.to} className="black no-underline">
            <span className="light-purple">~</span>
            {e.name}
            <span className="moon-gray">,</span>
          </a>
        ) : (
          <Link to={e.to} className="black no-underline" activeClassName="light-purple">
            <span className="light-purple">~</span>
            {e.name}
            <span className="moon-gray">,</span>
          </Link>
        )}
      </li>
    ))}
    <li className="dib mr2-ns moon-gray">{"());"}</li>
  </ul>
);

export default FunctionLinks;
