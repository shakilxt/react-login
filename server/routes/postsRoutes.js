import express from "express"
import { body } from 'express-validator'
import {
    getPostsController, createPostsController, deletePostController, updatePostController
    , likePostController, unlikePostController
} from "../controllers/postsController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

// --- VALIDATORS ---
const postValidationRules = [
    body('title').notEmpty().withMessage('Title is required').isLength({ max: 255 }).withMessage('Title cannot exceed 255 characters'),
    body('description').optional().isLength({ max: 5000 }).withMessage('Description cannot exceed 5000 characters')
]

// --- API ROUTES ---
router.get('/', getPostsController);
router.post('/', postValidationRules, createPostsController);
router.patch('/:id', postValidationRules, updatePostController);
router.delete('/:id', deletePostController);

// REACTIONS
router.post('/:id/like', likePostController);
router.delete('/:id/like', unlikePostController);

export default router;