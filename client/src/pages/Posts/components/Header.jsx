import MainIconButton from "./MainIconButton"

export default function Header({ user, addPost, logout, showAddPosts }) {
    return (
        <div className='w-full flex justify-between items-center'>

            <img src="/assets/s-epi.png" alt=""
                className='w-30' draggable="false" />

            <div className="flex gap-3">

                <MainIconButton
                    styles=""
                    icon={`fa-regular fa-${showAddPosts ? 'xmark' : 'plus'}`}
                    buttonClick={addPost} />

                <MainIconButton
                    styles=""
                    icon="fa-solid fa-user"
                    buttonClick={() => {
                        alert(
                            `User:\n\nName: ${user.name}\nEmail: ${user.email}`
                        )
                    }} />

                <MainIconButton
                    styles=""
                    icon="fa-light fa-right-from-bracket"
                    buttonClick={logout} />



            </div>

        </div>
    )
}