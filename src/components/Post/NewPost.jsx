import { useState, useEffect } from "react";
import { Avatar, Card, Input, Button } from "antd";
import {
  UploadOutlined,
  PlusOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import UploadImage from "../UploadImage";
import PostPreview from "./PostPreview";
import UserEdges from "../../Gun/UserEdges";
import User from "../../Gun/User";

export default function NewPost({ setCreatePost }) {
  const { TextArea } = Input;
  const [post, setPost] = useState("");
  const [rawImageFile, setRawImageFile] = useState();
  const [imageToUpload, setImageToUpload] = useState();
  const [loading, setLoading] = useState(false);
  const [author, setAuthor] = useState(User.get().is.alias);
  const [postsRef] = useState(UserEdges.posts);
  const { Meta } = Card;

  let guid = () => {
    let s4 = () => {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    };
    //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
    return (
      s4() +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      s4() +
      s4()
    );
  };

  const putToGun = (payload) => {
    try {
      if (User.get().is) {
        postsRef.get(payload.id).put(payload);
      } else {
        alert("Unable to post, please try Logging in again...");
      }
    } catch (e) {
      console.error("error trying to make a public post.", e);
    }
  };

  function handlePublicPost() {
    if (post === "" && !rawImageFile) {
      console.error(
        "either user is not signed in and unable to get the alias or post is an emtpy string in Post Payload"
      );
      return;
    }
    setLoading(true);
    const payload = {
      id: guid(),
      post: post !== "" ? post.trim() : "",
      author,
      image: imageToUpload ? imageToUpload : "na",
      timestamp: new Date().toISOString(),
    };
    putToGun(payload);
    setTimeout(() => {
      setPost("");
      setLoading(false);
      setCreatePost(false);
    }, 1000);
  }

  useEffect(() => {
    if (User.get().is) setAuthor(User.get().is.alias);
  }, []);

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
                loading={loading}
                icon={<UploadOutlined />}
                onClick={handlePublicPost}
              >
                Publish
              </Button>
              <Button
                type="danger"
                loading={loading}
                icon={<CloseCircleOutlined />}
                onClick={() => setCreatePost(false)}
              >
                Close
              </Button>
              <UploadImage setImageFile={setRawImageFile} />
            </div>
          </div>
        </div>
      </Card>

      {rawImageFile && (
        <PostPreview
          rawImageFile={rawImageFile}
          setImageToUpload={setImageToUpload}
          post={post && post}
          author={author && author}
        />
      )}
    </>
  );
}
