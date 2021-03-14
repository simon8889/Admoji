import express from "express";
import { createPost, getPosts, likePost, unlikePost, searchTrends, getTrendPosts, getPostById, getPostByTag } from "../controllers/postControllers.js";

const router = express.Router()

router.get("/", getPosts);
router.post("/", createPost);
router.put("/like/:id", likePost);
router.put("/unlike/:id", unlikePost);
router.get("/trends", getTrendPosts);
router.get("/trends/search/:search", searchTrends);
router.get("/:id", getPostById);
router.get("/trends/:tag", getPostByTag);

export default router;