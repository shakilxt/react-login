import { useEffect, useState } from 'react';
import MainIconButton from './MainIconButton';

export default function PostsInput({ onPostSubmit, hidePostsInput, initialData = {} }) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const isEditMode = Boolean(initialData && initialData.id)

    useEffect (() => {
        if (isEditMode) {
            setTitle(initialData.title || '');
            setDescription(initialData.description || '');
        } else {
            console.log("RESETTING INPUTS");
            setTitle('');
            setDescription('');
        }
    }, [initialData, isEditMode]);

    const handlePostSubmit = () => {
        if (!title) return

        const payload = {
            title, description
        }

        if (isEditMode) {
            payload.id = initialData.id;
        }

        if (onPostSubmit) {
            onPostSubmit(payload);
        }

        setTitle("");
        setDescription("");
    }

    return (
        <div className='mt-6 p-4 border rounded-lg'>

            <input type='text' placeholder='Title goes here' value={title} onChange={(e) => setTitle(e.target.value)}
                className='w-full bg-gray-800 border-0 outline-0 p-2 text-xl font-medium' />

            <textarea type="text" placeholder="What's on your mind?" value={description} onChange={(e) => setDescription(e.target.value)}
                rows={5}
                className='w-full bg-gray-800 border-0 outline-0 p-2 font-normal resize-none' />

            <div className='flex flex-row justify-between'>

                <MainIconButton
                    styles="bg-gray-600"
                    icon="fa-solid fa-xmark"
                    buttonClick={ hidePostsInput }
                />

                <MainIconButton
                    styles="bg-brand"
                    icon={isEditMode ? "fa-solid fa-save" : "fa-solid fa-send"}
                    buttonClick={handlePostSubmit}
                />

            </div>

        </div>
    )

}