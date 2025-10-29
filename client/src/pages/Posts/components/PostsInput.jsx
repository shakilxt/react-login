import { useState } from 'react';
import MainButton from '../../Login/components/MainButton';
import MainIconButton from './MainIconButton';

export default function PostsInput({ onPostSubmit, hidePostsInput }) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handlePostSubmit = () => {
        if (onPostSubmit) {
            onPostSubmit(title, description);
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
                    icon="fa-solid fa-send"
                    buttonClick={handlePostSubmit}
                />

            </div>

        </div>
    )

}