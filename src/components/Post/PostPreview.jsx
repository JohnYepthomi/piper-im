import { useState, useEffect, useRef } from "react";
import base64encoder from "../../utils/base64encoder";
import { List } from "antd";
import PostItem from "./PostItem";

export default function PostPreview({
  rawImageFile,
  post,
  author,
  setImageToUpload,
}) {
  const [previewPost, setPreviewPost] = useState();
  const [previewImage, setPreviewImage] = useState();

  function base64encoder(image) {
    let base64String = "";
    var reader = new FileReader();

    reader.onloadend = function () {
      base64String = reader.result;
      setPreviewImage(base64String);
      setImageToUpload(base64String);
    };
    reader.readAsDataURL(image);
  }

  useEffect(() => {
    if (rawImageFile) {
      base64encoder(rawImageFile);
    }
  }, [rawImageFile]);

  useEffect(() => {
    if (previewImage) {
      setPreviewPost([{ image: previewImage, post, author }]);
    }
  }, [previewImage, post]);

  return (
    <List
      itemLayout="vertical"
      size="large"
      dataSource={previewPost && previewPost}
      renderItem={(item) => <PostItem item={item} loading={false} />}
    />
  );
}
