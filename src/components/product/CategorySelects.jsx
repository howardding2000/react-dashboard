import React, { useState, useEffect } from "react";
import { Cascader } from "antd";
import { reqCategories } from "api";

// Dynamic loading selects
const CategorySelects = (props) => {
  const [categorySelects, setCategorySelects] = useState();
  const product = props?.product;

  const getSubSelect = async (targetSelect) => {
    // fetch sub categories

    const result = await reqCategories(targetSelect.value);

    if (result.status === 0) {
      const subCategories = result.data;

      if (subCategories && subCategories.length > 0) {
        const subSelects = subCategories.map((c) => ({
          value: c._id,
          label: c.name,
          isLeaf: true,
        }));
        return subSelects;
      } else {
        return null;
      }
    }
  };

  // load sub selects
  const onLoadData = async (selectedSelects) => {
    const targetSelect = selectedSelects[0];
    targetSelect.loading = true;

    const subSelects = await getSubSelect(targetSelect);

    if (subSelects) {
      targetSelect.children = subSelects;
      targetSelect.loading = false;
    } else {
      targetSelect.isLeaf = true;
    }

    setCategorySelects([...categorySelects]);
  };

  useEffect(() => {
    // set top selects
    const initSelects = async (categories) => {
      // turn categories to selects
      const selects = categories.map((c) => ({
        value: c._id,
        label: c.name,
        isLeaf: false,
      }));

      if (product && product.pCategoryId !== 0) {
        const targetSelect = selects.find(
          (o) => o.value === product.pCategoryId
        );

        const subSelects = await getSubSelect(targetSelect);
        if (subSelects) {
          targetSelect.children = subSelects;
        }
      }
      setCategorySelects(selects);
    };

    const getCategories = async (parentId) => {
      const result = await reqCategories(parentId);

      if (result.status === 0) {
        const categories = result.data;
        if (parentId === "0") {
          // setup top categories
          initSelects(categories);
        } else {
          // return sub categories
          return categories;
        }
      }
    };

    getCategories("0");
  }, [product]);

  return (
    <Cascader
      {...props}
      options={categorySelects}
      loadData={onLoadData}
      placeholder='Please select'
      changeOnSelect
    />
  );
};

export default CategorySelects;
