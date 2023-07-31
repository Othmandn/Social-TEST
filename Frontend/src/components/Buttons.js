import React from "react";

const Buttons = ({ customClass, text }) => {
  return (
    <button type="button" className={customClass}>
      {text}
    </button>
  );
};

export default Buttons;
