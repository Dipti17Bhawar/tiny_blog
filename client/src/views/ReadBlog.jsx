import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";

export default function ReadBlog() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(true);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const loadBlog = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/blogs/${slug}`
      );

      setBlog(response.data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlog();
  }, []);

  if (loading) {
    return (
      <h2
        style={{
          textAlign: "center",
          marginTop: "50px",
        }}
      >
        Loading Blog...
      </h2>
    );
  }

  return (
    <div
      style={{
        width: "80%",
        margin: "30px auto",
      }}
    >
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: "20px",
        }}
      >
        ← Back
      </button>

      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "10px",
          padding: "25px",
        }}
      >
        <span
          style={{
            float: "right",
            background: "#ddd",
            padding: "5px 12px",
            borderRadius: "5px",
          }}
        >
          {blog.category}
        </span>

        <h1>{blog.title}</h1>

        <hr />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              width: "55px",
              height: "55px",
              borderRadius: "50%",
              background: "orange",
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "bold",
              fontSize: "22px",
              marginRight: "15px",
            }}
          >
            {blog.userId?.name?.charAt(0).toUpperCase()}
          </div>

          <div>
            <h3>{blog.userId?.name}</h3>

            <p>{blog.userId?.email}</p>

            <small>
              Published On{" "}
              {new Date(blog.createdAt).toLocaleString()}
            </small>
          </div>
        </div>

        <hr />

        <p
          style={{
            marginTop: "20px",
            lineHeight: "30px",
            fontSize: "18px",
            textAlign: "justify",
          }}
        >
          {blog.content}
        </p>

        {currentUser?._id === blog.userId?._id && (
          <div
            style={{
              marginTop: "30px",
            }}
          >
            <Link to={`/edit-blog/${blog.slug}`}>
              <button>Edit Blog</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}