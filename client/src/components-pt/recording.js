import React from "react";
import ReactLoading from "react-loading";

const Recording = ({ type, color }) => (
  <ReactLoading className="m-auto bar " type={type} color={color} height={"20%"} width={"20%"}/>
);
export default Recording;