import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from './DashboardPage.module.scss';

import Header from './components/Header/Header';
import PostInput from './components/PostInput/PostInput';

import postService from '../../api/postService';
import PostItem from './components/PostItem/PostItem';

const DashboardPage = () => {

    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const accessToken = localStorage.getItem('accessToken');

    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

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
    };

    const handleCreatePost = async(title, description) => {
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
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.innerContainer}>

                <div className={styles.percentContainer}>

                    <Header />
                    <hr style={{ border: '1px solid #eee', margin: '1rem 0' }} />

                    <PostInput onPostSubmit={handleCreatePost} />
                    {isSubmitting && <p>Submitting post...</p>}
                    {submitError && <p style={{ color: 'red' }}>{submitError}</p>}

                    {isLoading && <p>Loading posts...</p>}
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                
                    <div className={styles.postsContainer}>
                        {posts.map((post) => (
                            <PostItem key={post.id} post={post} />
                        ))}
                    </div>

                    <div className={styles.content}>
                        <p>You are logged in as: {user?.email}</p>
                        <p>Your Access Token: {accessToken}</p>
                        <button onClick={handleLogout}>Logout</button>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default DashboardPage;