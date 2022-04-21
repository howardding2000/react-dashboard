import React from "react";
import { Form, Input, Select } from "antd";
import { useForm } from "antd/lib/form/Form";

const AddOrUpdateUserForm = React.forwardRef(({ user, rolesMap }, ref) => {
  const [form] = useForm();
  ref.current = form;
  const { Item } = Form;

  const formItemLayout = {
    labelCol: { span: 7 },
    wrapperCol: {
      span: 16,
    },
  };

  const options = [];
  rolesMap.forEach((value, key, map) => {
    options.push({ label: value, value: key });
  });

  return (
    <Form
      form={form}
      {...formItemLayout}
      initialValues={{ ...user}}
    >
      <Item name='username' label='Name'>
        <Input type='text' disabled={!!user} />
      </Item>
      <Item name='email' label='Email'>
        <Input type='text' />
      </Item>
      <Item name='phone' label='Phone'>
        <Input type='text' />
      </Item>
      <Item name='role_id' label='role'>
        <Select options={options}></Select>
      </Item>
      <Item name='password' label='Password'>
        <Input type='password' disabled={!!user} />
      </Item>
      <Item name='confirm_password' label='Confirm password'>
        <Input type='password' disabled={!!user} />
      </Item>
    </Form>
  );
});

export default AddOrUpdateUserForm;
