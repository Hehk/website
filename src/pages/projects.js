import React from "react";
import Helmet from "react-helmet";

import Block from "../components/block";
import Comment from "../components/comment";
import List from "../components/list";

import projectData from "../data/projects";

const ProjectsPage = () => (
  <div>
    <Helmet title="Projects" />
    <Block>
      <Comment>
        I make a lot of random things and sometimes they are good...
      </Comment>
    </Block>
    <Block>
      <List name="projects" elements={projectData} />
    </Block>
  </div>
);

export default ProjectsPage;
