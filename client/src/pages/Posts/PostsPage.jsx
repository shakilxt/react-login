import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import postService from '../../api/postService';
import Header from './components/Header';
import PostItem from './components/PostItem';
import PostsInput from './components/PostsInput';

export default function PostsPage() {

    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const accessToken = localStorage.getItem('accessToken');
    console.log(accessToken);

    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {

                const response = await postService.getAllPosts();
                setPosts(response);

            } catch (error) {
                setError('Could not fetch posts');
                console.error(error)
            } finally {
                setIsLoading(false);
            }
        }
        fetchPosts();
    }, [])

    const handleLogout = () => {
        logout();
        navigate('/login');
    }

    const [postToEdit, setPostToEdit] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);

    const handleFormSubmit = async (postData) => {

        console.log("FORM SUBMITTED: ", postData);

        setIsSubmitting(true);
        setSubmitError(null);

        if (postData.id) {
            try {
                const updatedPost = await postService.updatePost(postData.id, {
                    title: postData.title,
                    description: postData.description
                });

                setPosts(posts.map(p => (p.id === updatedPost.id ? updatedPost : p)));

            } catch (error) {
                console.error("Failed to update post:", error);
            }
        } else {
            try {

                const newPost = await postService.createPost({
                    title: postData.title,
                    description: postData.description
                });

                setPosts([newPost, ...posts]);

            } catch (error) {
                console.error("Failed to create post:", error);
            }
        }

        setIsSubmitting(false);
        setPostToEdit(null);
        setIsFormVisible(false);
    };

    const handleStartEdit = (post) => {
        setPostToEdit(post);
        setIsFormVisible(true);
    };

    const handleCancel = () => {
        setPostToEdit(null);
        setIsFormVisible(false);
    };

    const showCreateForm = () => {
        setPostToEdit(null);
        setIsFormVisible(!isFormVisible);
    }

    const handleDeletedPost = (postId) => {
        setPosts(posts.filter(p => p.id !== postId));
    }

    return (
        <div className='min-h-screen bg-gray-900 px-4 lg:px-8 text-gray-50 place-items-center'>
            <div className='w-full min-h-screen h-full max-w-2xl lg:max-w-7xl flex bg-gray-800 py-12 px-12'>

                <div className='w-full'>

                    <Header user={user}
                        addPost={showCreateForm}
                        logout={handleLogout}
                        showAddPosts={isFormVisible}
                    />

                    {isFormVisible && (
                        <PostsInput
                            onPostSubmit={handleFormSubmit}
                            hidePostsInput={handleCancel}
                            initialData={postToEdit} />
                    )}

                    <div className='mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6'>

                        {posts.map((post) => (

                            <div key={post.id}
                                className=''>

                                <PostItem post={post} user={user} afterDeletePost={handleDeletedPost} onEdit={handleStartEdit} />

                            </div>

                        ))}

                    </div>


                </div>


            </div>

        </div>
    )
}