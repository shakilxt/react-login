import express from "express"
import { body } from 'express-validator'
import { register, login, refreshToken, logout, verifyToken } from '../controllers/emailAuthController.js';
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router()

// --- Validation Rules for Registration ---
const registerValidationRules = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required.')
        .isLength({ max: 100 }).withMessage('Name must not exceed 100 characters.')
        .escape(), // Converts <, >, &, ', " to HTML entities

    body('email')
        .isEmail().withMessage('Please provide a valid email address.')
        .normalizeEmail(), // Sanitizes email (e.g., converts GMail to lowercase)

    body('password')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long.')
];

// --- Validation Rules for Login ---
const loginValidationRules = [
    body('email')
        .isEmail().withMessage('Please provide a valid email address.')
        .normalizeEmail(),
    
    body('password')
        .notEmpty().withMessage('Password is required.')
];

router.post('/register', registerValidationRules, register);
router.post('/login', loginValidationRules, login);
router.post('/refresh-token', refreshToken);
router.post('/logout', logout);

router.get('/verify', authMiddleware, verifyToken)


export default router;