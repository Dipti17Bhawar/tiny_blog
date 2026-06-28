import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function NewBlog() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");

  const saveBlog = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:8080/blogs",
        {
          title,
          category,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);

      if (response.data.success) {
        navigate("/");
      }
    } catch (err) {
      console.log(err);

      alert("Unable to create blog");
    }
  };

  return (
    <div
      style={{
        width: "70%",
        margin: "30px auto",
      }}
    >
      <h1>Create New Blog</h1>

      <form onSubmit={saveBlog}>
        <div style={{ marginBottom: "15px" }}>
          <label>Title</label>
          <br />

          <input
            type="text"
            placeholder="Enter Blog Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
            }}
            required
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Category</label>
          <br />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
            }}
            required
          >
            <option value="">Select Category</option>

            <option value="Technology">Technology</option>

            <option value="Programming">Programming</option>

            <option value="Education">Education</option>

            <option value="Travel">Travel</option>

            <option value="Health">Health</option>

            <option value="Food">Food</option>
          </select>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>Content</label>
          <br />

          <textarea
            rows="10"
            placeholder="Write your blog here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
            }}
            required
          ></textarea>
        </div>

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            marginRight: "10px",
          }}
        >
          Publish Blog
        </button>

        <button
          type="button"
          onClick={() => navigate("/")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}