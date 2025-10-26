import * as postsService from '../services/postsService.js';

export const getPostsController = async (req, res) => {
    try {
        const posts = await postsService.getAllPostsWithAuthors();
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ message: 'Failed to fetch posts' })
    }
}

export const createPostsController = async (req, res) => {
    try {

        const { title, description } = req.body;
        const userId = req.user.id;

        if (!title || !description) {
            return res.status(400).json({ message: 'Title and description are required' });
        }

        const newPost = await postsService.createPost({ title, description }, userId);
        res.status(201).json(newPost);
        
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ message: 'Failed to create post' })
    }
}