import Blog from "../models/Blog.js";

const generateSlug = (title) =>
  title
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

// Create Blog
export const postBlogs = async (req, res) => {
  try {
    const { title, category, content } = req.body;

    if (!title || !category || !content) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const slug = generateSlug(title);

    const newBlog = new Blog({
      title,
      slug,
      category,
      content,
      userId: req.currentUser._id,
    });

    const savedBlog = await newBlog.save();

    res.json({
      success: true,
      message: "Blog Added Successfully",
      blog: savedBlog,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get All Blogs
export const getBlogs = async (req, res) => {
  const blogs = await Blog.find().populate("userId", "name email");

  res.json({
    success: true,
    data: blogs,
  });
};

// Get Blog by Slug
export const getBlogForSlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const blog = await Blog.findOne({ slug }).populate("userId", "name email");

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.json({
      success: true,
      data: blog,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Publish Blog
export const patchPublishBlog = async (req, res) => {
  try {
    const { slug } = req.params;

    const blog = await Blog.findOne({
      slug,
      userId: req.currentUser._id,
    });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    blog.status = "published";
    blog.publishedAt = new Date();

    await blog.save();

    res.json({
      success: true,
      message: "Blog published successfully",
      data: blog,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


//myBlogs
export const getMyBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({
      userId: req.currentUser._id,
    })
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: blogs,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Update Blog
export const putBlogs = async (req, res) => {
  const { slug } = req.params;
  const { title, category, content } = req.body;

  const blog = await Blog.findOne({
    slug,
    userId: req.currentUser._id,
  });

  if (!blog) {
    return res.status(404).json({
      success: false,
      message: "Blog not found",
    });
  }

  blog.title = title;
  blog.category = category;
  blog.content = content;

  await blog.save();

  res.json({
    success: true,
    message: "Blog Updated",
    data: blog,
  });
};


//deleteBlogs 
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findOneAndDelete({
      _id: id,
      userId: req.currentUser._id,
    });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.json({
      success: true,
      message: "Blog Deleted Successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};