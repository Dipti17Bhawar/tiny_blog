import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function AllBlog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
  const token = localStorage.getItem("token");

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      const response = await axios.get("http://localhost:8080/blogs");

      if (response.data.success) {
        setBlogs(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

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
        margin: "30px auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Header */}

      <div
        style={{
          backgroundColor: "#34495e",
          color: "white",
          padding: "15px 20px",
          borderRadius: "5px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h3 style={{ margin: 0 }}>
          {currentUser?.name ? `Hello ${currentUser.name}` : "Welcome to Tiny Blog"}
        </h3>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          {token ? (
            <>
              <Link
                to="/new"
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                Create Blog
              </Link>
              <button
                onClick={logout}
                style={{
                  backgroundColor: "white",
                  color: "#34495e",
                  border: "none",
                  padding: "8px 18px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              style={{
                backgroundColor: "white",
                color: "#34495e",
                padding: "8px 18px",
                borderRadius: "5px",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Blog List */}

      {blogs.map((blog) => (
        <div
          key={blog._id}
          style={{
            border: "1px solid #cfcfcf",
            borderRadius: "6px",
            padding: "18px",
            marginBottom: "18px",
            position: "relative",
            backgroundColor: "#fff",
            boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
          }}
        >
          {/* Category */}

          <span
            style={{
              position: "absolute",
              right: "15px",
              top: "15px",
              backgroundColor: "#f1f1f1",
              padding: "4px 12px",
              borderRadius: "4px",
              fontSize: "12px",
            }}
          >
            {blog.category}
          </span>

          {/* Title */}

          <h2
            style={{
              marginBottom: "18px",
            }}
          >
            {blog.title}
          </h2>

          {/* User */}

          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                backgroundColor: "#f4b04a",
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "22px",
                fontWeight: "bold",
                marginRight: "15px",
              }}
            >
              {blog.userId?.name?.charAt(0).toUpperCase()}
            </div>

            <div>
              <h4
                style={{
                  margin: "0px",
                }}
              >
                {blog.userId?.name}
              </h4>

              <p
                style={{
                  margin: "5px 0",
                  color: "#555",
                }}
              >
                {blog.userId?.email}
              </p>

              <small>
                Published On :{" "}
                {new Date(blog.createdAt).toLocaleString()}
              </small>
            </div>
          </div>

          {/* Read More */}

          <div
            style={{
              textAlign: "right",
              marginTop: "20px",
            }}
          >
            <Link to={`/read-blog/${blog._id}`}>
              <button
                style={{
                  backgroundColor: "#34495e",
                  color: "white",
                  border: "none",
                  padding: "10px 18px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Read More
              </button>
            </Link>
          </div>
        </div>
      ))}

      {blogs.length === 0 && (
        <h3
          style={{
            textAlign: "center",
            color: "gray",
            marginTop: "50px",
          }}
        >
          No Blogs Found
        </h3>
      )}
    </div>
  );
}