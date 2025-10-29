import axiosInstance from "./axiosInstance";

const handleError = (error) => {
    if (error.response && error.response.data) {
        throw new Error(error.response.data.message || 'An error occurred on the server.');
    }
    throw new Error(error.message || 'An unknown network error occurred.');
};

const getAllPosts = async () => {
    try {
        const response = await axiosInstance.get('/posts');
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

const createPost = async (postData) => {
    try {
        const response = await axiosInstance.post('/posts', postData);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

const updatePost = async (postId, postData) => {
    try {
        const response = await axiosInstance.patch(`/posts/${postId}`, postData);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

const deletePost = async (postId) => {
    try {
        const response = await axiosInstance.delete(`/posts/${postId}`);
        return response;
    } catch (error) {
        handleError(error);
    }
};

const postService = {
    getAllPosts,
    createPost,
    updatePost,
    deletePost,
};

export default postService;