import { useState, useRef } from "react";
import { Button } from "antd";

export default function UploadImage({ setImageFile }) {
  const inputRef = useRef();
  const buttonRef = useRef();

  function handleFileSelect() {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }

  function handleFileInput() {
    if (inputRef.current) {
      const imageFile = inputRef.current.files[0];
      setImageFile(imageFile);
    }
  }

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileInput}
      />
      <Button ref={buttonRef} onClick={handleFileSelect}>
        Upload Image
      </Button>
    </>
  );
}
