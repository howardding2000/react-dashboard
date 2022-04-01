import React from "react";
import socialLinks from "../../config/social-config";

import "./DbFooter.less";
const DbFooter = () => {
  const socialList = socialLinks.map((item) => (
    <a key={item.title} href={item.link} target='_blank' rel='noreferrer'>{item.title}</a>
  ));
  // const socialIconList = socialLinks.map((item) => (
  //   <a href={item.link}>{item.icon}</a>
  // ));
  return (
    <div className='footer__center'>
      <div className='footer__socail'>{socialList}</div>
      {/* <div className='footer__socail_icons'>{socialIconList}</div> */}
      <div className='footer__copyright'>React-dashboard powered by React</div>
    </div>
  );
};

export default DbFooter;
