import React from "react";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  UserOutlined,
  KeyOutlined,
} from "@ant-design/icons";
import { Input, Space, Button, message } from "antd";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import User from "../Gun/User";
import UserEdges from "../Gun/UserEdges";

export default function Login() {
  const uRef = useRef();
  const pRef = useRef();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const key = "sharedmessagekey";

  const showError = (msg) => {
    message.error({ content: msg, key });
  };

  const onAccountCreateSubmit = async () => {
    const alias = uRef.current.input.value;
    const passphrase = pRef.current.input.value;
    const pair = { alias, passphrase };

    message.loading({ content: "Signing you up", key });

    const isCreated = await User.register(pair);

    if (isCreated) {
      message.success({
        content: "Account created sucessfully.",
        key,
      });
      UserEdges.init(User.get());
    } else {
      showError("User already exist");
    }
  };

  const onLoginSubmit = async () => {
    if (!isLoggedIn) message.loading({ content: "Logging you in", key });
    const alias = uRef.current.input.value;
    const passphrase = pRef.current.input.value;
    const pair = { alias, passphrase };
    const isAuthed = await User.authenticate(pair);

    if (isAuthed) {
      message.success({
        content: "Logged in sucessfully",
        key,
        duration: 2,
        onClose: () => {
          navigate("/home");
        },
      });
      UserEdges.init(User.get());
    } else {
      showError("wrong username or password");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "70vh",
      }}
    >
      <div style={{ fontSize: "1.2rem", fontWeight: "bold", padding: "20px" }}>
        Pipeer
      </div>
      <Space size="5px" direction="vertical">
        <Input
          ref={uRef}
          size="large"
          placeholder="username"
          prefix={<UserOutlined />}
        />
        <br />
        <Input.Password
          ref={pRef}
          size="large"
          placeholder="password"
          prefix={<KeyOutlined />}
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
        />
      </Space>

      <Space style={{ display: "flex", margin: "20px" }}>
        <Button type="primary" danger onClick={onLoginSubmit}>
          Login
        </Button>
        <Button danger onClick={onAccountCreateSubmit}>
          Signup
        </Button>
      </Space>
    </div>
  );
}
