import React from "react";
import { Form, Input } from "antd";

const Item = Form.Item;

const UpdateCategoryForm = React.forwardRef(({ categoryName }, ref) => {
  const [form] = Form.useForm();
  ref.current = form;

  return (
    <Form form={form} initialValues={{ categoryName: categoryName }}>
      <Item
        name='categoryName'
        rules={[
          { required: true, message: "Please enter category name." },
          () => ({
            validator(_, value) {
              if (value.trim().length === 0) {
                return Promise.reject(
                  new Error("Category name can not be empty.")
                );
              }
              if (value === categoryName) {
                return Promise.reject(
                  new Error("Category name can not be the same as before!")
                );
              }
              return Promise.resolve();
            },
          }),
        ]}
      >
        <Input />
      </Item>
    </Form>
  );
});
export default UpdateCategoryForm;
