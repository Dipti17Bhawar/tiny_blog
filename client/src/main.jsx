
import { createRoot } from "react-dom/client";
import "./index.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import AllBlog from "./views/AllBlog";
import NewBlog from "./views/NewBlog";
import EditBlog from "./views/EditBlog";
import ReadBlog from "./views/ReadBlog";
import Login from "./views/Login";
import Signup from "./views/Signup";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<AllBlog />} />
      <Route path="/new" element={<NewBlog />} />
      <Route path="/edit/:id" element={<EditBlog />} />
      <Route path="/blog/:slug" element={<ReadBlog />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route
        path="*"
        element={
          <h1 className="text-center mt-5 text-3xl font-bold">
            404 Not Found
          </h1>
        }
      />
    </Routes>
  </BrowserRouter>
);

