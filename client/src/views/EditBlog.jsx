import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditBlog() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");

  // Load Existing Blog
  const loadBlog = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/blogs/${slug}`
      );

      const blog = response.data.data;

      setTitle(blog.title);
      setCategory(blog.category);
      setContent(blog.content);
    } catch (err) {
      console.log(err);
      alert("Unable to load blog");
    }
  };

  useEffect(() => {
    loadBlog();
  }, []);

  // Update Blog
  const updateBlog = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `http://localhost:8080/blogs/${slug}`,
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
        navigate("/my-blog");
      }
    } catch (err) {
      console.log(err);
      alert("Unable to update blog");
    }
  };

  return (
    <div
      style={{
        width: "70%",
        margin: "30px auto",
      }}
    >
      <h1>Edit Blog</h1>

      <form onSubmit={updateBlog}>
        <div style={{ marginBottom: "20px" }}>
          <label>Title</label>

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

        <div style={{ marginBottom: "20px" }}>
          <label>Category</label>

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

          <textarea
            rows="10"
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
            marginRight: "10px",
          }}
        >
          Update Blog
        </button>

        <button
          type="button"
          onClick={() => navigate("/my-blog")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}