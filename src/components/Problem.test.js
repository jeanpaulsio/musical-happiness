import React from "react";
import renderer from "react-test-renderer";
import Problem from "./Problem";

test("<Problem /> renders correctly", () => {
  const title = "Problem 1";
  const tree = renderer
    .create(<Problem title={title} render={() => <h1 />} />)
    .toJSON();

  expect(tree.children.length).toEqual(2);
  expect(tree).toMatchSnapshot();
});
