import React, { useState } from 'react';

import { useAuth } from '../../context/AuthContext';
import { usePosts } from '../../hooks/usePosts';
import { useNavigate } from 'react-router-dom';

import Header from './components/Header';
import PostItem from './components/PostItem';
import PostsInput from './components/PostsInput';

export default function PostsPage() {

    const {
        posts,
        isFetching,
        fetchError,
        addPost,
        updatePost,
        deletePost,
        toggleLike
    } = usePosts();

    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const [postToEdit, setPostToEdit] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    }

    const handleFormSubmit = async (postData) => {
        try {

            if (postData.id) {
                await updatePost(postData.id, {
                    title: postData.title,
                    description: postData.description
                });
            } else {
                await addPost({
                    title: postData.title,
                    description: postData.description
                });
            }

            setIsFormVisible(false);
            setPostToEdit(null);

        } catch (error) {
            console.error("Error handling form submit:", error);
        }
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

    if (isFetching) return <div>Loading posts...</div>;
    if (fetchError) return <div>{fetchError}</div>;

    return (
        <div className='min-h-screen bg-gray-900 px-0 lg:px-8 text-gray-50 place-items-center'>
            <div className='w-full min-h-screen h-full max-w-2xl lg:max-w-3xl flex bg-gray-800 py-12 px-8 sm:px-12'>

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

                    <div className='mt-12 grid grid-cols-1 gap-6'>

                        {posts.map((post) => (

                            <div key={post.id}
                                className=''>

                                <PostItem post={post} user={user}
                                    onDelete={deletePost}
                                    onEdit={handleStartEdit}
                                    toggleLike={toggleLike}
                                />

                            </div>

                        ))}

                    </div>


                </div>


            </div>

        </div>
    )
}