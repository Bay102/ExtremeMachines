import React from "react";

export const Radios = (props) => {
  const {id, type, onChange, name, value } = props;
  return <input id={id} type={type} onChange={onChange} name={name} value={value} />;
};
