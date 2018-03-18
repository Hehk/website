import React from "react";
import Link from "gatsby-link";

import Block from "../components/block";
import Comment from "../components/comment";
import List from "../components/list";

import projectData from "../data/projects";
import writingData from "../data/writing";

const IndexPage = () => (
  <div>
    <Block>
      <Comment>
        Kyle Henderson is a software developer from Cincinnati, currently at
        Try.com.
      </Comment>
    </Block>
    <Block>
      <Comment>
        Feel free to contact me anytime, I love meeting and talking to
        new people. :D
      </Comment>
    </Block>

    <Block>
      <List name="writing" elements={writingData.slice(0,3)} />
    </Block>
    <Block>
      <List name="recentProjects" elements={projectData.slice(0, 3)} />
    </Block>
  </div>
);

export default IndexPage;
