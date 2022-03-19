import React from 'react';
import { Form, Input, Checkbox, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import classes from './login.module.less';

const Login = () => {
  // Custom validation for password
  const validatePwd = (rule, value) => {
    if (!value) {
      return Promise.reject(new Error('Please input your password!'));
    } else if (value.length < 4) {
      return Promise.reject(
        new Error('Password is too short: password should >= 4.')
      );
    } else if (value.length > 12) {
      return Promise.reject(new Error('Password is too long: password <= 12.'));
    } else if (!/^\w+$/.test(value)) {
      return Promise.reject(
        new Error('Password must contain only "a-z","A-Z" and "_"')
      );
    }

    return Promise.resolve();
  };

  return (
    <div className={classes.login}>
      <div className={classes.login__card}>
        <Form className={classes.login__form}>
          <div className={classes.login__form__fixHeight}>
            <Form.Item
              name='username'
              // Declarative validation
              rules={[
                { required: true, message: 'Please input your username!' },
                { min: 4, message: 'Username is too short: username >= 4.' },
                {
                  max: 12,
                  message: 'Username is too long, username =< 12.',
                },
                {
                  pattern: /^\w+$/,
                  message: 'Username must contain only "a-z","A-Z" and "_"',
                },
              ]}
            >
              <Input
                size='large'
                placeholder='Username'
                prefix={<UserOutlined style={{ color: '#A0AEC0' }} />}
              />
            </Form.Item>
          </div>
          <div className={classes.login__form__fixHeight}>
            <Form.Item
              name='password'
              rules={[
                // { required: true, message: 'Please input your password!' },
                // Custom verification
                {
                  validator: validatePwd,
                },
              ]}
            >
              <Input.Password
                size='large'
                placeholder='Password'
                prefix={<LockOutlined style={{ color: '#A0AEC0' }} />}
              />
            </Form.Item>
          </div>
          <Form.Item name='remenber' valuePropName='checked'>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              className={classes.login__form__button}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
