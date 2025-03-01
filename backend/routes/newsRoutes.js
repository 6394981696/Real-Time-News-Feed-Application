import express from "express";
import News from "../models/News.js";

const router = express.Router();

// Get Trending News (Aggregation)
router.get("/trending", async (req, res) => {
  try {
    const trendingNews = await News.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
    res.json(trendingNews);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
