import React from "react";
const gitlabIcon = require("./components/images/gitlab.svg");

const GitLabLink = ({ link, text }) => {
  return (
    <a href={link} className="githubSection">
      <img className="githubIcon" src={gitlabIcon} alt="gitlab" />
      {text}
    </a>
  );
};

export default GitLabLink;
