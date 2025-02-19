import { FC, useState } from "react";
import { useInput } from "react-admin";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = ["header", "bold", "italic", "underline", "list", "bullet", "link", "image"];

const RichTextInput: FC<{ source: string }> = ({ source }) => {
  const {
    field: { value, onChange },
  } = useInput({ source });

  const [content, setContent] = useState(value || "");

  const handleChange = (html: string) => {
    setContent(html);
    setTimeout(() => onChange(html), 0);
  };

  console.log(content);

  return (
    <ReactQuill
      style={{ width: "100%" }}
      value={content}
      onChange={handleChange}
      modules={modules}
      formats={formats}
      theme="snow"
    />
  );
};

export default RichTextInput;
