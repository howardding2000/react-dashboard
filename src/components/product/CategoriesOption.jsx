import React, { useState, useEffect } from "react";
import { Cascader } from "antd";
import { reqCategories } from "api";

const CategoriesOption = (props) => {
  const [categoryOptions, setCategoryOptions] = useState();
  const product = props?.product;

  const getSubOption = async (targetOption) => {
    // fetch sub categories

    const result = await reqCategories(targetOption.value);

    if (result.status === 0) {
      const subCategories = result.data;

      if (subCategories && subCategories.length > 0) {
        const subOptions = subCategories.map((c) => ({
          value: c._id,
          label: c.name,
          isLeaf: true,
        }));
        return subOptions;
      } else {
        return null;
      }
    }
  };

  // load sub options
  const onLoadData = async (selectedOptions) => {
    const targetOption = selectedOptions[0];
    targetOption.loading = true;

    const subOptions = await getSubOption(targetOption);

    if (subOptions) {
      targetOption.children = subOptions;
      targetOption.loading = false;
    } else {
      targetOption.isLeaf = true;
    }

    setCategoryOptions([...categoryOptions]);
  };

  useEffect(() => {
    // set top options
    const initOptions = async (categories) => {
      // turn categories to options
      const options = categories.map((c) => ({
        value: c._id,
        label: c.name,
        isLeaf: false,
      }));

      if (product && product.pCategoryId !== 0) {
        const targetOption = options.find(
          (o) => o.value === product.pCategoryId
        );

        const subOptions = await getSubOption(targetOption);
        if (subOptions) {
          targetOption.children = subOptions;
        }
      }
      setCategoryOptions(options);
    };

    const getCategories = async (parentId) => {
      const result = await reqCategories(parentId);

      if (result.status === 0) {
        const categories = result.data;
        if (parentId === "0") {
          // setup top categories
          initOptions(categories);
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
      options={categoryOptions}
      loadData={onLoadData}
      placeholder='Please select'
      changeOnSelect
    />
  );
};

export default CategoriesOption;
