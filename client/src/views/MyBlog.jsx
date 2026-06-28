import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function MyBlog() {
  const [blogs, setBlogs] = useState([]);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const loadMyBlogs = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/myblogs",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBlogs(response.data.data);
    } catch (err) {
      console.log(err);
      alert("Unable to load blogs");
    }
  };

  useEffect(() => {
    loadMyBlogs();
  }, []);

  // Delete Blog
  const deleteBlog = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:8080/blogs/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);

      loadMyBlogs();
    } catch (err) {
      console.log(err);
      alert("Unable to delete blog");
    }
  };

  return (
    <div
      style={{
        width: "80%",
        margin: "20px auto",
      }}
    >
      <h1>My Blogs</h1>

      <button
        onClick={() => navigate("/new-blog")}
        style={{
          marginBottom: "20px",
        }}
      >
        + New Blog
      </button>

      {blogs.length === 0 ? (
        <h2>No Blogs Found</h2>
      ) : (
        blogs.map((blog) => (
          <div
            key={blog._id}
            style={{
              border: "1px solid gray",
              borderRadius: "10px",
              padding: "20px",
              marginBottom: "20px",
            }}
          >
            <h2>{blog.title}</h2>

            <p>
              <b>Category :</b> {blog.category}
            </p>

            <p>
              {blog.content.substring(0, 200)}...
            </p>

            <p>
              <b>Created :</b>{" "}
              {new Date(blog.createdAt).toLocaleString()}
            </p>

            <Link to={`/read-blog/${blog.slug}`}>
              <button
                style={{
                  marginRight: "10px",
                }}
              >
                Read
              </button>
            </Link>

            <Link to={`/edit-blog/${blog.slug}`}>
              <button
                style={{
                  marginRight: "10px",
                }}
              >
                Edit
              </button>
            </Link>

            <button
              onClick={() => deleteBlog(blog._id)}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}