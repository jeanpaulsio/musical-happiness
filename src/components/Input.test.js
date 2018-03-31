import React from "react";
import renderer from "react-test-renderer";
import Input from "./Input";

test("<Input /> renders correctly", () => {
  const value = "value";
  const onChange = () => {};
  const tree = renderer
    .create(<Input value={value} onChange={onChange} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

