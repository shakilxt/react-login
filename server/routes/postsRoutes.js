import express from "express"
import { getPostsController, createPostsController, deletePostController, updatePostController } from "../controllers/postsController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

//=== API ROUTES ===//
router.get('/', getPostsController);
router.post('/', createPostsController);
router.patch('/:id', updatePostController);
router.delete('/:id', deletePostController);

export default router;