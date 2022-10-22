import { DatePicker, Input, Button, List } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import PostItem from "./PostItem";
import NewPost from "./NewPost";
import useGetOn from "../../Hooks/UseGetOn";

export default function PostsFeed() {
  const [initLoading, setInitLoading] = useState(true);
  const posts = useGetOn();

  console.log("PostFeed()");

  useEffect(() => {
    if (posts.length > 0) {
      posts.sort((a, b) => {
        return a.timestamp > b.timestamp;
      });
    }

    console.log(posts);
  }, [posts]);

  return (
    <List
      itemLayout="vertical"
      size="large"
      dataSource={posts && posts}
      header={<NewPost />}
      renderItem={(item) => <PostItem item={item} loading={false} />}
    />
  );
}
