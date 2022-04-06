import React, { useState, useEffect } from "react";
import { Cascader } from "antd";
import { reqCategories } from "api";

// Static loading options
const CategoryStaticOptions = (props) => {
  const [categoryOptions, setCategoryOptions] = useState();

  const optonsFilter = (inputValue, path) => {
    return path.some(
      (option) =>
        option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
    );
  };

  useEffect(() => {

    //find and put parent's children into its children[] property
    const findChildren = (parent, optionList) => {
      if (optionList && optionList.length > 0) {
        parent.children = [];
        optionList.forEach((item) => {
          if (parent.value === item.pValue) {
            parent.children.push(findChildren(item, optionList));
          }
        });
        if (parent.children.length === 0) {
          delete parent.children;
        }
        return parent;
      }
    };

    // turn the categories to the options tree
    const initOptions = categories  => {
      // turn all categories to options list
      const optionList = categories.map((c) => ({
        value: c._id,
        label: c.name,
        pValue: c.parentId,
      }));

      //create a temporary root option for storing the optins tree.
      const tempRootOption = {
        value: "0",
        label: "root",
        pValue: "-1",
      };

      const updatedTempRootOption = findChildren(tempRootOption, optionList);

      return [...updatedTempRootOption.children];
    };

    const getAllCategories = async () => {
      // -1:fetch all categories
      const result = await reqCategories("-1");

      if (result.status === 0) {
        const categories = result.data;
        const options = initOptions(categories);
        setCategoryOptions(options)
      }
    };

    getAllCategories();
  }, []);

  return (
    <Cascader
      {...props}
      options={categoryOptions}
      showSearch={optonsFilter}
      placeholder='Please select'
      changeOnSelect
    />
  );
};

export default CategoryStaticOptions;
