import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function AllBlog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const token = localStorage.getItem("token");

  const loadBlogs = async () => {
    try {
      const response = await axios.get("http://localhost:8080/blogs");

      setBlogs(response.data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const logout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) {
    return (
      <h2
        style={{
          textAlign: "center",
          marginTop: "50px",
        }}
      >
        Loading Blogs...
      </h2>
    );
  }

  return (
    <div
      style={{
        width: "80%",
        margin: "20px auto",
      }}
    >
      {/* Header */}

      <div
        style={{
          backgroundColor: "#2f3e4e",
          color: "white",
          padding: "15px",
          display: "flex",
          justifyContent: "space-between",
          borderRadius: "5px",
        }}
      >
        <h3>Hello {currentUser?.name}</h3>

        <div>
          {token && (
            <>
              <button
                onClick={() => navigate("/new-blog")}
                style={{
                  marginRight: "10px",
                }}
              >
                New Blog
              </button>

              <button
                onClick={() => navigate("/my-blog")}
                style={{
                  marginRight: "10px",
                }}
              >
                My Blogs
              </button>
            </>
          )}

          {token ? (
            <button onClick={logout}>Logout</button>
          ) : (
            <button onClick={() => navigate("/login")}>
              Login
            </button>
          )}
        </div>
      </div>

      {/* Blog List */}

      {blogs.map((blog) => (
        <div
          key={blog._id}
          style={{
            border: "1px solid gray",
            padding: "20px",
            marginTop: "20px",
            borderRadius: "8px",
            position: "relative",
          }}
        >
          <span
            style={{
              position: "absolute",
              right: "15px",
              top: "15px",
              backgroundColor: "#ddd",
              padding: "4px 10px",
              borderRadius: "5px",
              fontSize: "12px",
            }}
          >
            {blog.category}
          </span>

          <h2>{blog.title}</h2>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "15px",
            }}
          >
            <div
              style={{
                width: "45px",
                height: "45px",
                borderRadius: "50%",
                backgroundColor: "orange",
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "bold",
                marginRight: "15px",
              }}
            >
              {blog.userId?.name?.charAt(0).toUpperCase()}
            </div>

            <div>
              <h4>{blog.userId?.name}</h4>

              <p>{blog.userId?.email}</p>

              <small>
                Published On :
                {new Date(blog.createdAt).toLocaleString()}
              </small>
            </div>
          </div>

          <div
            style={{
              textAlign: "right",
              marginTop: "15px",
            }}
          >
            <Link to={`/read-blog/${blog._id}`}>
              <button>Read More</button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}