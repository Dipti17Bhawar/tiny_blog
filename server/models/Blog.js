import { model,Schema } from "mongoose";

const blogSchema = new Schema ({
    title:{type:String,required:true},
    content:{type:String,required:true},
    status:{type:String, default:"draft", enum:[ "draft", "published","archieved"],},
    category: { type: String, required: true },
    publishedAt: { type: Date },
    slug: { type: String, required: true, unique: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);


const Blog = model("Blog",blogSchema);

export default Blog;