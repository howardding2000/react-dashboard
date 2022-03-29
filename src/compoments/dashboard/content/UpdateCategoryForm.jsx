import React from "react";
import { Form, Input } from "antd";

const Item = Form.Item;

const UpdateCategoryForm = React.forwardRef(({categoryName}, ref) => {
  const [form] = Form.useForm();
  ref.current = form;

  return (
    <Form form={form} initialValues={{ cat_name: categoryName }}>
      <Item name='cat_name'>
        <Input/>
      </Item>
    </Form>
  );
});
export default UpdateCategoryForm;
