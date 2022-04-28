import React from "react";
import { Cascader } from "antd";

// Static loading selects
const CategoryStaticSelects = (props) => {
  const { selects } = props;
  const optonsFilter = (inputValue, path) => {
    return path.some(
      (select) =>
        select.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
    );
  };
  return (
    <Cascader
      {...props}
      options={selects}
      showSearch={optonsFilter}
      placeholder='Please select'
      changeOnSelect
    />
  );
};

export default CategoryStaticSelects;
