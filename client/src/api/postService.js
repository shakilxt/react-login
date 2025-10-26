import axiosInstance from "./axiosInstance";

const getAllPosts = () => {
    return axiosInstance.get('/posts');
}

const createPost = (postData) => {
    return axiosInstance.post('/posts', postData);
}

const postService = {
    getAllPosts,
    createPost,
}

export default postService;