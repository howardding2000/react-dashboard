import React from "react";
import { Form, Input, Select } from "antd";
import { useForm } from "antd/lib/form/Form";

const AddOrUpdateUserForm = React.forwardRef(
  ({ user, rolesMap, onSubmit }, ref) => {
    const { Item } = Form;
    const [form] = useForm();
    ref.current = form;

    const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: {
        span: 16,
      },
    };

    const options = [];
    rolesMap.forEach((value, key) => {
      options.push({ label: value, value: key });
    });

    const onFinish = (values) => {
      onSubmit();
      return true;
    };

    const onFinishFailed = (errorInfo) => {};

    return (
      <Form
        form={form}
        {...formItemLayout}
        initialValues={{ ...user }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Item
          name='username'
          label='Name'
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input
            type='text'
            disabled={!!user}
            placeholder='Please input username'
          />
        </Item>
        <Item
          name='email'
          label='Email'
          rules={[
            {
              required: true,
              message: "Please input your Email.",
            },
            {
              type: "email",
              message: "Email format is not right!",
            },
          ]}
        >
          <Input type='text' placeholder='Please input your email' />
        </Item>
        <Item
          name='phone'
          label='Phone'
          rules={[
            {
              required: true,
              message: "Please input your phone number.",
            },
            {
              pattern: /\d*/,
              message: "The phone number must be an integer.",
            },
            {
              len: 10,
              message: "The phone number must be 10 digits.",
            },
          ]}
        >
          <Input
            type='text'
            maxLength={10}
            placeholder='Please input your phone number'
          />
        </Item>
        <Item
          name='role_id'
          label='role'
          rules={[{ required: true, message: "Please select the role." }]}
        >
          <Select options={options} placeholder='Please select a role'></Select>
        </Item>
        <Item
          name='password'
          label='Password'
          rules={[{ required: true, message: "Please input your Password." }]}
        >
          <Input
            type='password'
            disabled={!!user}
            placeholder='Please input your password'
          />
        </Item>
        <Item
          name='confirm_password'
          label='Confirm password'
          rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!user) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                } else {
                  return Promise.resolve();
                }
              },
            }),
          ]}
        >
          <Input
            type='password'
            disabled={!!user}
            placeholder={!user ? "Please input your password agen" : ""}
          />
        </Item>
      </Form>
    );
  }
);

export default AddOrUpdateUserForm;
