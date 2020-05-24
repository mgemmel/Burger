import React from "react";
import "./Input.css";
const input = (props) => {
  let inputElement = null;
  const classes = ["InputElement"];
  if (props.invalid && props.shouldValidate && props.touched) {
    classes.push("Invalid");
  }
  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={classes.join(" ")}
          {...props.elementconfig}
          value={props.value}
          onChange={props.change}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={classes.join(" ")}
          {...props.elementconfig}
          value={props.value}
          onChange={props.change}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={classes.join(" ")}
          value={props.value}
          onChange={props.change}
        >
          {props.elementconfig.options.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.displayValue}
              </option>
            );
          })}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={classes.join(" ")}
          {...props.elementconfig}
          value={props.value}
          onChange={props.change}
        />
      );
  }
  return (
    <div className="Input">
      <label className="Label">{props.label}</label>
      {inputElement}
    </div>
  );
};

export default input;
