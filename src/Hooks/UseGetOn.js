import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import UserEdges from "../Gun/UserEdges";

export default function UseGetOn(cb) {
  const onRef = useRef();
  const [posts, setPosts] = useState([]);
  const [postsRef] = useState(UserEdges.posts);

  useEffect(() => {
    postsRef.map().on(
      (data, postId, _msg, _event) => {
        console.log(data, postId);

        if (!onRef.current) onRef.current = _event;

        setPosts((state) => [
          ...state.filter((item) => item.id !== postId),
          {
            id: postId,
            post: data.post,
            author: data.author,
          },
        ]);
      },
      { change: true }
    );

    return () => {
      if (onRef.current) onRef.current.off();
    };
  }, []);

  return posts;
}
