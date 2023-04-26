import Alert  from "react-bootstrap/Alert";
import React from "react";

const MessageBox = (props) => {
  return <Alert varient={props.varient || "info"}>{props.children}</Alert>;
  //  it can show error in the form of alert
};

export default MessageBox;
