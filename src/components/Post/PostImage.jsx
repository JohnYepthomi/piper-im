import { useRef, useState, useEffect } from "react";

export default function PostImage({ item }) {
  const imgRef = useRef();

  useEffect(() => {
    if (item && imgRef.current) {
      imgRef.current.src = item.image;
    }
  }, [item]);

  return (
    <img
      ref={imgRef}
      width="100%"
      height="100%"
      style={{ objectFit: "contain" }}
    />
  );
}
