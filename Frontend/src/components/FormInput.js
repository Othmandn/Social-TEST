import React from "react";

const FormInput = ({ customClass, text, name, type }) => {
  return (
    <div className="form-input-wrapper">
      <label className="label-wrapper" htmlFor={name}>
        {text}
      </label>
      <input className={customClass} type={type} id={name} />
    </div>
  );
};

export default FormInput;
