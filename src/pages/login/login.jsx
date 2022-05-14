import React, { useContext, useState, useRef, useEffect } from "react";
import { Form, Input, Checkbox, Button, message, Modal } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Navigate } from "react-router-dom";
import store from "store";

import classes from "./login.module.less";

import { AuthContext } from "../../store/auth-context";
import { reqLogin } from "../../api/index";
import { reqAddUser, reqRoles } from "api";
import AddOrUpdateUserForm from "components/users/AddOrUpdateUserForm";

const Login = () => {
  const [showModalStatus, setShowModalStatus] = useState(false);
  const { token, login } = useContext(AuthContext);
  const formRef = useRef();
  const rolesRef = useRef(new Map());

  const tailLayout = {
    // wrapperCol: { offset: 8, span: 16 },
  };

  const onFinish = async ({ username, password, remenber }) => {
    /**
     * * async & await
     * 1. purpose: simplify promise usage, not need to use then() *then() will trigger a callback*, sync way to implement async process.
     * 2. position of await: The left side of the promise expression. use to wait and receive a result(response) but not a promise.
     * 3. position of async: The left side of the function definition where the await is used.
     */
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

  const onRegister = () => {
    setShowModalStatus(true);
  };

  useEffect(() => {
    const getRoles = async () => {
      const result = await reqRoles();
      if (result.status === 0) {
        const roles = result.data;
        rolesRef.current = roles.reduce(
          (pre, role) => pre.set(role._id, role.name),
          new Map()
        );
      } else {
        message.error("Get roles failed.");
      }
    };

    getRoles();
  }, []);

  const registerUser = async () => {
    const user = formRef.current.getFieldsValue();

    const result = await reqAddUser(user);

    if (result.status === 0) {
      message.success("Register user successfully.");
      setShowModalStatus(false);
    } else {
      message.error(`Register user failed. ${result.msg}`);
    }
  };

  // handle Modal cancel event
  const handleCancel = () => {
    setShowModalStatus(false);
  };
  const onOK = () => {
    formRef.current.submit();
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

            <Form.Item {...tailLayout} noStyle>
              <Button
                type='primary'
                htmlType='submit'
                className={classes.login__form__button}
              >
                Submit
              </Button>
              <Button type='link' htmlType='button' onClick={onRegister}>
                Register
              </Button>
            </Form.Item>
            <Form.Item name='remenber' valuePropName='checked' noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Form>
          <Modal
            title={"User Register"}
            visible={showModalStatus}
            onOk={onOK}
            onCancel={handleCancel}
            destroyOnClose={true}
            centered
          >
            <AddOrUpdateUserForm
              onSubmit={registerUser}
              rolesMap={rolesRef.current}
              ref={formRef}
            />
          </Modal>
        </div>
      </div>
    </>
  );
};

export default Login;
