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

    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [showAddPosts, setShowAddPosts] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {

                const response = await postService.getAllPosts();
                setPosts(response.data);

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

    const handleCreatePost = async (title, description) => {
        console.log("POST CREATING");

        setIsSubmitting(true);
        setSubmitError(null);

        try {

            const response = await postService.createPost({
                title: title,
                description: description
            })

            setPosts([response.data, ...posts]);

        } catch (error) {
            setSubmitError('Failed to create post');
            console.error('Failed to create post:', error);
        } finally {
            setIsSubmitting(false);
            setShowAddPosts(false);
        }
    }

    return (
        <div className='min-h-screen bg-gray-900 px-4 lg:px-8 text-gray-50 place-items-center'>
            <div className='w-full min-h-screen h-full max-w-2xl lg:max-w-7xl flex bg-gray-800 py-12 px-12'>

                <div className='w-full'>

                    <Header user={user}
                        addPost={() => setShowAddPosts(!showAddPosts)}
                        logout={handleLogout}
                        showAddPosts={showAddPosts}
                    />

                    {showAddPosts && (
                        <PostsInput
                            onPostSubmit={handleCreatePost}
                            hidePostsInput={() => setShowAddPosts(false)} />
                    )}


                    <div className='mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6'>

                        {posts.map((post) => (

                            <div key={post.id}
                                className=''>

                                <PostItem post={post} />

                            </div>

                        ))}

                    </div>


                </div>


            </div>

        </div>
    )
}