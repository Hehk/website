import React from "react";
import Helmet from "react-helmet";

import Block from "../components/block";
import Comment from "../components/comment";
import List from "../components/list";

import experienceData from "../data/experience";

const AboutPage = () => (
  <div>
    <Helmet title="About" />
    <Block>
      <Comment>
        Hello, my name is Kyle Henderson. I am a nerdy boy from Cincinnati with
        a passion for web development, running, and functional programming. I
        currently work at Try.com, in San Francisco, as a software engineer using a lot of react
        and graphql.
      </Comment>
    </Block>

    <Block>
      <List name="experience" elements={experienceData} />
    </Block>
    <Block>
      <List
        name="eductation"
        elements={[
          {
            title: "University of Cincinnati",
            message:
              "Sep 2013 - April 2017 :: B.S. Computer Science & minor in Mathematics"
          }
        ]}
      />
    </Block>
  </div>
);

export default AboutPage;
