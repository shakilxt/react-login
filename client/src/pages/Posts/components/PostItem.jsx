import DeleteModal from '../../../components/DeleteModal/DeleteModal';
import MainIconButton from './MainIconButton';
import React, { useState } from 'react';
import postService from '../../../api/postService';
import AnimatedMessage from '../../../components/AnimateMessage/AnimateMessage';

export default function PostItem({ post, user, afterDeletePost, onEdit }) {

    const portraits = ['https://randomuser.me/api/portraits/men/90.jpg',
        'https://randomuser.me/api/portraits/men/10.jpg',
        'https://randomuser.me/api/portraits/men/11.jpg',
        'https://randomuser.me/api/portraits/men/31.jpg',
        'https://randomuser.me/api/portraits/men/49.jpg',
        'https://randomuser.me/api/portraits/men/99.jpg'
    ]

    const professions = ['Engineer', 'Doctor', 'Artist', 'Teacher', 'Developer', 'Designer'];

    const randomPortrait = () => {
        const index = Math.floor(Math.random() * portraits.length);
        return portraits[index];
    }

    const randomProfession = () => {
        const index = Math.floor(Math.random() * professions.length);
        return professions[index];
    }


    

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    const handleOpenModal = (postId) => {
        setIsModalOpen(true);
        setItemToDelete(postId);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setItemToDelete(null);
    }

    const handleConfirmDelete = () => {
        handlePostDeletion(itemToDelete);
        handleCloseModal();
    }

    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState(null);

    const handlePostEditRequest = (post) => {
        if (post.user_id !== user.id) {
            setDeleteError('You are not authorized to edit this post.');
            return;
        }
        onEdit(post);
    }

    const handlePostDeletion = async (postId) => {
        console.log("DELETING: " + postId);

        setIsDeleting(true);
        setDeleteError(null);

        try {

            await postService.deletePost(postId);

            afterDeletePost(postId);

        } catch (error) {
            setDeleteError(error.response?.data?.message || 'Failed to delete post');
            console.error('Failed to delete post:', error);
        } finally {
            setIsDeleting(false);
            handleCloseModal();
        }
    }


    return (
        <div className='h-full bg-gray-700 p-4 rounded-lg flex flex-col justify-between'
        >

            <div>
                <div className='flex items-top gap-2'>

                    <div className='flex items-center gap-1 rounded-full bg-gray-800 pe-6'>

                        <img
                            className='size-12 rounded-full border-2 border-gray-800'
                            src={randomPortrait()} alt="" />

                        <div className=''>

                            <p className='text-sm font-medium text-gray-50'>
                                {post.name}
                            </p>

                            <p className='text-sm font-regular text-gray-400'>
                                {randomProfession()}
                            </p>

                        </div>

                    </div>

                </div>


                <h2 className='mt-4 text-lg font-semibold'>
                    {post.title}</h2>

                <small className='text-gray-400'>
                    {new Date(post.created_at).toLocaleString()}</small>


                <p className='text-md font-regular mt-3 mb-3'>
                    {post.description}</p>

            </div>



            <div className='flex justify-between'>

                <MainIconButton
                    styles="bg-gray-800"
                    icon="fa-solid fa-thumbs-up"
                    buttonClick={() => {
                        console.log(post);
                    }}
                />

                {/* {isPostOwner && ( */}
                    <div>

                        <MainIconButton
                            styles="bg-gray-600 ml-2"
                            icon="fa-solid fa-pen"
                            buttonClick={() => handlePostEditRequest(post)}
                        />

                        <MainIconButton
                            styles="bg-gray-600 ml-2 hover:bg-red-400"
                            icon="fa-solid fa-trash"
                            buttonClick={() => handleOpenModal(post.id)}
                        />

                        <DeleteModal
                            isOpen={isModalOpen}
                            onClose={handleCloseModal}
                            onConfirm={handleConfirmDelete}
                        />

                    </div>
                
                {/* )} */}

            </div>
                    
            <AnimatedMessage message={deleteError} onDismiss={() => setDeleteError(null)} />

        </div>
    )

}