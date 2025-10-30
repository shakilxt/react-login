import { useState, useEffect, useCallback, use } from 'react';
import postService from '../api/postService';

export function usePosts() {

    const [posts, setPosts] = useState([]);

    const [isFetching, setIsFetching] = useState(false);
    const [fetchError, setFetchError] = useState(null);    

    const fetchPosts = useCallback(async () => {
        setIsFetching(true);
        setFetchError(null);

        try {

            const fetchedPosts = await postService.getAllPosts();
            setPosts(fetchedPosts);

        } catch (error) {
            setFetchError(error.message || 'Could not fetch posts');
        } finally {
            setIsFetching(false);
        }
    }, []);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    const addPost = async (postData) => {
        try {

            const newPost = await postService.createPost(postData);
            setPosts(prev => [newPost, ...prev]);

        } catch (error) {
            console.error("Failed to create post:", error);
            throw error
        }
    }

    const updatePost = async (postId, postData) => {
        try {

            const updatedPost = await postService.updatePost(postId, postData);
            setPosts(prev => prev.map(p => (p.id === updatedPost.id ? { ...p, ...updatedPost } : p)));

        } catch (error) {
            console.error("Failed to update post:", error);
            throw error;
        }
    }

    const deletePost = async (postId) => {
        try {

            await postService.deletePost(postId);
            setPosts(prev => prev.filter(p => p.id !== postId));

        } catch (error) {
            console.error("Failed to delete post:", error);
            throw error;
        }
    }

    const toggleLike = async (postId, isLiked) => {
        setPosts(prevPosts =>
            prevPosts.map(post => {
                if (post.id === postId) {
                    return {
                        ...post,
                        liked_by_user: !isLiked,
                        like_count: isLiked ? String(Number(post.like_count) - 1) : String(Number(post.like_count) + 1)
                    };
                }
                return post;
            })
        );

        try {

            if (!isLiked) {
                await postService.likePost(postId);
            } else {
                await postService.unlikePost(postId);
            }

        } catch (error) {
            console.error("Failed to toggle like:", error);
            setPosts(prevPosts =>
                prevPosts.map(post => {
                    if (post.id === postId) {
                        return {
                            ...post,
                            liked_by_user: isLiked,
                            like_count: isLiked ? String(Number(post.like_count) + 1) : String(Number(post.like_count) - 1)
                        };
                    }
                    return post;
                })
            );
        }
    }



    return {
        posts,
        isFetching,
        fetchError,
        addPost,
        updatePost,
        deletePost,
        toggleLike
    }

}