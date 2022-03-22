import React from 'react';
import { Form, Input, Checkbox, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import classes from './login.module.less';
// import { useForm } from 'antd/lib/form/Form';
import { reqLogin } from '../../api/index';

const Login = () => {
  // const [form] = useForm();

  const onFinish = async ({ username, password }) => {
    // console.log('send request to service', values);
    /**
     * * async & await
     * 1. purpose: simplify promise usage, not need to use then() *then() will trigger a callback*, sync way to implement async process.
     * 2. position of await: The left side of the promise expression. use to wait and receive a result(response) but not a promise.
     * 3. position of async: The left side of the function definition where the await is used.
     */

    const { data: result } = await reqLogin(username, password);
    if (result.status === 0) {
      message.success('Login successful!');
    }
    if (result.status === 1) {
      message.error(result.msg);
    }

    // .then((response) => console.log('success:', response.data))
    // .catch((err) => console.log('error:', err));
  };

  const onFinishFailed = ({ errorFields }) => {
    // const errorMessage = errorFields
    //   .map((element) => element.errors)
    //   .join('\n');
    // message.error(errorMessage, 5);
  };

  // Custom validation for password
  const validatePwd = (_, value) => {
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
        <Form
          className={classes.login__form}
          // form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <div className={classes.login__form__fixHeight}>
            <Form.Item
              name='username'
              initialValue='admin'
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
