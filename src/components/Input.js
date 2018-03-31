import React from "react";
import { func, string } from "prop-types";
import "./Input.css";

Input.propTypes = {
  value: string.isRequired,
  placeholder: string,
  onChange: func.isRequired
};

function Input(props) {
  return (
    <div className="input-container">
      <input
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
      />
    </div>
  );
}

export default Input;
