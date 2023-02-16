import React from "react";

export const Radios = (props) => {
  const {id, type, onChange, name, value } = props;
  return <input style={{cursor: 'pointer'}} id={id} type={type} onChange={onChange} name={name} value={value} />;
};
