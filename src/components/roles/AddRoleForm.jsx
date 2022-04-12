import React from "react";
import { Form, Input } from "antd";

const Item = Form.Item;

const AddRoleForm = React.forwardRef((props, ref) => {
  const [form] = Form.useForm();
  ref.current = form;

  return (
    <Form form={form}>
      <Item name='roleName'>
        
        <Input />
      </Item>
    </Form>
  );
});

export default AddRoleForm;
