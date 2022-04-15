import React from "react";
import { Form, Input } from "antd";

const Item = Form.Item;

const UpdateCategoryForm = React.forwardRef(({categoryName}, ref) => {
  const [form] = Form.useForm();
  ref.current = form;

  return (
    <Form form={form} initialValues={{ categoryName: categoryName }}>
      <Item 
      name='categoryName'
      rules={[{required: true, message:'Please enter category name.'}]}
      >
        <Input/>
      </Item>
    </Form>
  );
});
export default UpdateCategoryForm;
