import express from "express"
import { getPostsController, createPostsController } from "../controllers/postsController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

//=== API ROUTES ===//
router.get('/', getPostsController);
router.post('/', createPostsController);

export default router;