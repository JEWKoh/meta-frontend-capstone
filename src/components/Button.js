import React from "react";
import "./Button.scss";

function Button({ title, onClick, type }) {
  const handleClick = (e) => {
    if (type !== 'submit') {
      e.preventDefault();
    }

    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      type={type}
      className="button"
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default Button;