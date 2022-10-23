import { useState, useRef, useEffect } from "react";
import { Avatar, Card, Input, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import User from "../../Gun/User";
import UserEdges from "../../Gun/UserEdges";

export default function NewPost() {
  const { TextArea } = Input;
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [postsRef] = useState(UserEdges.posts);
  const [user] = useState(User.get());
  const { Meta } = Card;

  let guid = () => {
    let s4 = () => {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    };
    return s4() + s4() + s4() + s4() + s4();
  };

  function handlePublicPost() {
    if (post !== "") {
      const newId = guid();
      postsRef.get(newId).put({
        id: newId,
        post: post.trim(),
        author: user.is.alias,
      });

      setPost("");
    }
  }

  return (
    <>
      <Card size="small">
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "10px",
            width: "100%",
          }}
        >
          <Avatar src="https://joeschmoe.io/api/v1/random" size="meduim" />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <TextArea
              value={post}
              onChange={(e) => setPost(e.target.value)}
              placeholder="Share a new post"
              maxLength={300}
              autoSize={{ minRows: 3, maxRows: 3 }}
              showCount={true}
              style={{ width: "100%" }}
            />
            <div
              style={{
                display: "flex",
                gap: "5px",
                width: "100%",
              }}
            >
              <Button
                type="primary"
                // loading={loading}
                icon={<UploadOutlined />}
                onClick={handlePublicPost}
              >
                Publish
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}
