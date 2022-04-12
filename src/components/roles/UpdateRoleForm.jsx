import React from "react";
import { Form, Input } from "antd";

const Item = Form.Item;

const UpdateRoleForm = React.forwardRef(({roleName}, ref) => {
  const [form] = Form.useForm();
  ref.current = form;

  return (
    <Form form={form} initialValues={{ roleName: roleName }}>
      <Item 
      name='roleName'
      rules={[{required: true, message:'Please enter category name.'}]}
      >
        <Input/>
      </Item>
    </Form>
  );
});
export default UpdateRoleForm;
