import {
  MoreOutlined,
  GlobalOutlined,
  EllipsisOutlined,
  EditOutlined,
  LikeOutlined,
  LikeFilled,
  StarOutlined,
  StarFilled,
  MessageOutlined,
  MessageFilled,
  SmileOutlined,
  DownOutlined,
} from "@ant-design/icons";
import {
  Badge,
  Switch,
  Avatar,
  Space,
  Input,
  Typography,
  List,
  Skeleton,
  Card,
} from "antd";
import React, { useEffect, useState } from "react";
import PostImage from "./PostImage";
import { Dropdown, Menu } from "antd";

const menu = (
  <Menu
    items={[
      {
        key: "1",
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.antgroup.com"
          >
            1st menu item
          </a>
        ),
      },
      {
        key: "2",
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.aliyun.com"
          >
            2nd menu item (disabled)
          </a>
        ),
        icon: <SmileOutlined />,
        disabled: true,
      },
      {
        key: "3",
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.luohanacademy.com"
          >
            3rd menu item (disabled)
          </a>
        ),
        disabled: true,
      },
      {
        key: "4",
        danger: true,
        label: "a danger item",
      },
    ]}
  />
);

export default function PostItem({ item, loading }) {
  const [moreOpen, setMoreOpen] = useState(false);
  const { Text } = Typography;

  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );
  const DropDownMenu = () => {
    return (
      <Dropdown overlay={menu}>
        <MoreOutlined onClick={handlePostMore} />
      </Dropdown>
    );
  };
  function handlePostMore() {
    console.log("handlePostMore called..");
    setMoreOpen(true);
  }

  return (
    <List.Item
      key={item.title}
      actions={[
        <IconText
          icon={false ? StarFilled : StarOutlined}
          text="156"
          key="list-vertical-star-o"
        />,
        <IconText
          icon={false ? LikeFilled : LikeOutlined}
          text="156"
          key="list-vertical-like-o"
        />,
        <IconText
          icon={false ? MessageFilled : MessageOutlined}
          text="2"
          key="list-vertical-message"
        />,
      ]}
      extra={<DropDownMenu />}
    >
      <List.Item.Meta
        avatar={
          <Avatar src="https://joeschmoe.io/api/v1/random" size="meduim" />
        }
        title={
          <div
            style={{
              marginTop: "3px",
              fontWeight: "bold",
              fontSize: "0.89rem",
            }}
          >
            {item.author}
          </div>
        }
        description={
          <div style={{ color: "red", fontSize: "0.66rem", cursor: "pointer" }}>
            <Space size="small">
              <Badge
                count="public"
                title="anyone can view this post"
                style={{
                  fontSize: "0.56rem",
                  fontWeight: "bold",
                  backgroundColor: "teal",
                }}
              />
            </Space>
          </div>
        }
      />
      <Text style={{ whiteSpace: "break-spaces" }}>{item.post}</Text>
      {item.image !== "na" && <PostImage item={item} />}
    </List.Item>
  );
}
