import React from "react";

const className = "light-purple";
const Comment = ({ children }) => (
  <div className="dib">
    <span className={className}>{"/* "}</span>
    {children}
    <span className={className}>{" */"}</span>
  </div>
);

export default Comment;
