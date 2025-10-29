import MainIconButton from './MainIconButton';

export default function PostItem({ post }) {

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



            <div>
                <MainIconButton
                    styles="bg-gray-800"
                    icon="fa-solid fa-thumbs-up"
                />
            </div>

        </div>
    )

}