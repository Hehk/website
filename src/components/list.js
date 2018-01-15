import React from "react";
import Comment from "./comment";

const List = ({ name, elements }) => (
  <div>
    <span className="moon-gray">let</span>{" "}
    <span className="b light-purple">{name}</span>
    <span className="moon-gray"> = [</span>
    <ol className="list ma0">
      {elements.map(e => (
        <div className="ma3 f6" key={`${e.title}-0`}>
          <li className="ma0 mt1">
            <span className="b">
              <span className="moon-gray">"</span>
              {e.link ? (
                <a className="color-inherit no-underline hover-light-purple" href={e.link}>
                  {e.title}
                </a>
              ) : (
                e.title
              )}
              <span className="moon-gray">"</span>
            </span>
            <span className="moon-gray">,</span>
          </li>
          <li>
            <Comment>{e.message}</Comment>
          </li>
        </div>
      ))}
    </ol>
    <span className="moon-gray">];</span>
  </div>
);

export default List;
