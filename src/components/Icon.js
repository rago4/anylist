import React from "react";
import sprite from "../assets/sprite.svg";

const Icon = ({ id, className }) => {
  const classes = ["icon", className].filter((cn) => !!cn).join(" ");

  return (
    <svg className={classes}>
      <use href={`${sprite}#${id}`} />
    </svg>
  );
};

export default Icon;
