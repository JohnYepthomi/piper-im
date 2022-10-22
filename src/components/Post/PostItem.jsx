import {
  MoreOutlined,
  EllipsisOutlined,
  EditOutlined,
  LikeOutlined,
  LikeFilled,
  StarOutlined,
  StarFilled,
  MessageOutlined,
  MessageFilled,
} from "@ant-design/icons";
import { Avatar, Space, Input, List, Skeleton, Card } from "antd";
import React, { useEffect } from "react";
import PostImage from "./PostImage";

export default function PostItem({ item, loading }) {
  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

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
    >
      <List.Item.Meta
        avatar={
          <Avatar src="https://joeschmoe.io/api/v1/random" size="meduim" />
        }
        title={<div style={{ marginTop: "3px" }}>{item.author}</div>}
        description={
          <div style={{ color: "gray", fontSize: "0.56rem" }}>Sponsored</div>
        }
      />
      <div>{item.post}</div>
      {/* {item.image !== "na" && <PostImage item={item} />} */}
    </List.Item>
  );
}
