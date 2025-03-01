import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema({
  title: String,
  category: String,
  content: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("News", NewsSchema);
