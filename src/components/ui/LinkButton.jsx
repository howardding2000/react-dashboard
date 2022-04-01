import React from "react";
import "./LinkButton.less";
const LinkButton = (props) => {
  return (
    <span className='link__button' {...props}>
      {props.children}
    </span>
  );
};

export default LinkButton;
