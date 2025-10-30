import DeleteModal from '../../../components/DeleteModal/DeleteModal';
import MainIconButton from './MainIconButton';
import React, { useState } from 'react';
import AnimatedMessage from '../../../components/AnimateMessage/AnimateMessage';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';

export default function PostItem({ post, user, onDelete, onEdit, toggleLike }) {

    const defaultPortrait = 'https://randomuser.me/api/portraits/lego/0.jpg';
    const defaultProfession = 'Adventurer';

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [itemLoading, setItemLoading] = useState(false);
    const [itemError, setItemError] = useState(null);

    const handleOpenModal = () => {
        setItemError(null);
        setIsModalOpen(true);
    }

    const handleCloseModal = () => { setIsModalOpen(false); }

    const handleConfirmDelete = async () => {
        setItemLoading(true);
        setItemError(null);

        try {

            await onDelete(post.id);

        } catch (error) {
            setItemError(error.message || 'Could not delete post');
        } finally {
            handleCloseModal()
            setItemLoading(false)
        }

    }

    const handlePostEditRequest = async (post) => {
        if (post.user_id !== user.id) {
            setItemError('You are not authorized to edit this post.');
            return;
        }

        setItemLoading(true);
        setItemError(null);

        try {
            await onEdit(post);
        } catch (error) {
            setItemError(error.message || 'Could not edit post');
        } finally {
            setItemLoading(false);
        }
    }

    return (
        <div className='h-full bg-gray-700 p-4 rounded-lg flex flex-col justify-between'
        >

            <div>
                <div className='flex items-top gap-2 justify-between'>

                    <div className='flex items-center gap-1 rounded-full bg-gray-800 pe-6'>

                        <img
                            className='size-12 rounded-full border-2 border-gray-800'
                            src={post.portrait || defaultPortrait} alt="" />

                        <div className=''>

                            <p className='text-sm font-medium text-gray-50'>
                                {post.name}
                            </p>

                            <p className='text-sm font-regular text-gray-400'>
                                {post.profession || defaultProfession}
                            </p>

                        </div>

                    </div>

                    {itemLoading &&
                        <div className='flex items-center justify-center'>
                            <LoadingSpinner color='text-gray-500' bColor='fill-gray-800' />
                        </div>
                    }

                </div>


                <h2 className='mt-4 text-lg font-semibold truncate'>
                    {post.title}</h2>

                <small className='text-gray-400'>
                    {new Date(post.created_at).toLocaleString()}</small>


                <p className='text-md font-regular mt-3 mb-3 line-clamp-5'>
                    {post.description}</p>

            </div>

            <div className='flex justify-between'>

                <div>
                    <MainIconButton
                        styles={post.liked_by_user ? "bg-brand" : "bg-gray-800"}
                        icon="fa-solid fa-thumbs-up"
                        buttonClick={() => {
                            toggleLike(post.id, post.liked_by_user);
                        }}
                    />

                    <span className='ml-2 text-gray-300'>{post.like_count || 0}</span>
                </div>




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
                        buttonClick={handleOpenModal}
                    />

                    <DeleteModal
                        isOpen={isModalOpen}
                        onClose={handleCloseModal}
                        onConfirm={handleConfirmDelete}
                    />

                </div>

                {/* )} */}

            </div>

            <AnimatedMessage message={itemError} onDismiss={() => setItemError(null)} />

        </div>
    )

}