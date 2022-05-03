import React from "react";
import "./Center.less";
const Center = (props) => {
  return (
    <div className='center' {...props}>
      {props.children}
    </div>
  );
};

export default Center;