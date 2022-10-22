import { useState, useRef, useEffect } from "react";
import GunMods from "../Gun/client";

export default function UseGetOn({ path }) {
  const onRef = useRef();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    GunMods.gun
      .get(path)
      .map()
      .once((data, postId, _msg, _event) => {
        if (!onRef.current) onRef.current = _event;
        delete data["_"];
        setPosts((state) => [
          ...state,
          { id: postId, post: data.post, author: data.author },
        ]);
      });

    return () => {
      if (onRef.current) {
        onRef.current.off();
      }
    };
  }, [path]);

  return posts;
}
