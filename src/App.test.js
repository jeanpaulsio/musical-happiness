import React from "react";
import renderer from "react-test-renderer";
import App from "./App";

describe("<App />", () => {
  test("should render App component with 3 problems", () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree.length).toEqual(3);
  });
});
