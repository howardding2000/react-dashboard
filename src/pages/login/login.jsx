import React, { useContext } from "react";
import { Form, Input, Checkbox, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import store from "store";
import classes from "./login.module.less";
import { AuthContext } from "../../store/auth-context";
import { reqLogin } from "../../api/index";
import { Navigate } from "react-router-dom";

const Login = () => {
  const { token, login } = useContext(AuthContext);

  const onFinish = async ({ username, password, remenber }) => {
    /**
     * * async & await
     * 1. purpose: simplify promise usage, not need to use then() *then() will trigger a callback*, sync way to implement async process.
     * 2. position of await: The left side of the promise expression. use to wait and receive a result(response) but not a promise.
     * 3. position of async: The left side of the function definition where the await is used.
     */
    console.log(remenber);
    const result = await reqLogin(username, password);
    if (result.status === 0) {
      message.success("Login successful!");
      const user = result.data;
      if (remenber) {
        store.set("username_holder", username);
        store.set("isRemenbered", "true");
      } else {
        store.remove("username_holder");
        store.remove("isRemenbered");
      }
      // expirationTime:ms
      login(user);
    }
    if (result.status === 1) {
      message.error(result.msg);
    }
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
      return Promise.reject(new Error("Please input your password!"));
    } else if (value.length < 4) {
      return Promise.reject(
        new Error("Password is too short: password should >= 4.")
      );
    } else if (value.length > 12) {
      return Promise.reject(new Error("Password is too long: password <= 12."));
    } else if (!/^\w+$/.test(value)) {
      return Promise.reject(
        new Error('Password must contain only "a-z","A-Z" and "_"')
      );
    }
    return Promise.resolve();
  };

  return (
    <>
      {!!token && <Navigate to='/' />}
      <div className={classes.login}>
        <header className={classes.header}>
          <div className={classes.logo}>
            <h1>React-Dashborad</h1>
          </div>
        </header>
        <div className={classes.login__card}>
          <Form
            className={classes.login__form}
            // form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            initialValues={{
              username: store.get("username_holder"),
              remenber: store.get("isRemenbered") ? "checked" : "",
            }}
          >
            <div className={classes.login__form__fixHeight}>
              <Form.Item
                name='username'
                // Declarative validation
                rules={[
                  { required: true, message: "Please input your username!" },
                  { min: 4, message: "Username is too short: username >= 4." },
                  {
                    max: 12,
                    message: "Username is too long, username =< 12.",
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
                  prefix={<UserOutlined style={{ color: "#A0AEC0" }} />}
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
                  prefix={<LockOutlined style={{ color: "#A0AEC0" }} />}
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
    </>
  );
};

export default Login;
