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

export const updatePostController = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.user.id;
        const { title, description } = req.body;

        if (title === undefined && description === undefined) {
            return res.status(400).json({ message: 'Bad Request: No update data provided.' });
        }

        const postData = { title, description };

        const updatedPost = await postsService.updatePostById(postId, userId, postData);

        if (!updatedPost) {
            return res.status(403).json({ message: 'You are not authorized to update this post or it does not exist.' });
        }
        
        res.status(200).json(updatedPost);

    } catch (error) {
        console.error('Error in updatePostController:', error);
        res.status(500).json({ message: 'Failed to update post' });
    }
};

export const deletePostController = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.user.id;

        const deletedRowCount = await postsService.deletePostById(postId, userId);

        if (deletedRowCount === 0) {
            return res.status(403).json({ message: 'You are not authorized to delete this post or it does not exist.' });
        }
        
        res.status(204).send();

    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ message: 'Failed to delete post' })
    }
}