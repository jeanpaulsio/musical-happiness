import React from "react";
import { func, string } from "prop-types";

Problem.propTypes = {
  title: string,
  render: func
}

function Problem(props) {
  return (
    <section>
      <h2>{props.title}</h2>
      {props.render()}
    </section>
  );
}

export default Problem;
