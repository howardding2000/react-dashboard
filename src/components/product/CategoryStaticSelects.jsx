import React, { useState, useEffect } from "react";
import { Cascader } from "antd";
import { reqCategories } from "api";

// Static loading selects
const CategoryStaticSelects = (props) => {
  const [categorySelects, setCategorySelects] = useState();

  const optonsFilter = (inputValue, path) => {
    return path.some(
      (select) =>
        select.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
    );
  };

  useEffect(() => {
    //find and put parent's children into its children[] property
    const findChildren = (parent, selectList) => {
      if (selectList && selectList.length > 0) {
        parent.children = [];
        selectList.forEach((item) => {
          if (parent.value === item.pValue) {
            parent.children.push(findChildren(item, selectList));
          }
        });
        if (parent.children.length === 0) {
          delete parent.children;
        }
        return parent;
      }
    };

    // turn the categories to the selects tree
    const initSelects = (categories) => {
      // turn all categories to selects list
      const selectList = categories.map((c) => ({
        value: c._id,
        label: c.name,
        pValue: c.parentId,
      }));

      //create a temporary root select for storing the optins tree.
      const tempRootSelect = {
        value: "0",
        label: "root",
        pValue: "-1",
      };

      const updatedTempRootSelect = findChildren(tempRootSelect, selectList);

      return [...updatedTempRootSelect.children];
    };

    const getAllCategories = async () => {
      // -1:fetch all categories
      const result = await reqCategories("-1");

      if (result.status === 0) {
        const categories = result.data;
        const selects = initSelects(categories);
        console.log(selects);
        setCategorySelects(selects);
      }
    };

    getAllCategories();
  }, []);

  return (
    <Cascader
      {...props}
      options={categorySelects}
      showSearch={optonsFilter}
      placeholder='Please select'
      changeOnSelect
    />
  );
};

export default CategoryStaticSelects;
