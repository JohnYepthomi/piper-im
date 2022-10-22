import React, { useState } from "react";
import Posts from "./posts";
import Login from "./login";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { Tabs } from "antd";
import { LayoutOutlined, SmileOutlined, TeamOutlined } from "@ant-design/icons";
import User from "../Gun/User";

export default function Home() {
  const navigate = useNavigate();

  const onChange = (key) => {
    console.log(key);
  };

  React.useEffect(() => {
    if (!User._user.is) {
      navigate("/");
    }
  });

  return (
    <div>
      <Header username={User.get().is.alias} />
      <Tabs
        defaultActiveKey="1"
        onChange={onChange}
        tabPosition="top"
        style={{ paddingLeft: "10px", paddingRight: "10px" }}
        items={[
          {
            label: (
              <span>
                <LayoutOutlined />
                Feed
              </span>
            ),
            key: "1",
            children: <Posts />,
          },
          {
            label: (
              <span>
                <SmileOutlined />
                Status
              </span>
            ),
            key: "2",
            children: <Login />,
          },
          {
            label: (
              <span>
                <TeamOutlined />
                Friends
              </span>
            ),
            key: "3",
            children: `Content of Tab Pane 3`,
          },
        ]}
      />
    </div>
  );
}
