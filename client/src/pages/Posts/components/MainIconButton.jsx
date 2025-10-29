

export default function MainIconButton({ styles, icon, buttonClick }) {
    return (
        <button
            className={`size-12 bg-brand text-white rounded-full font-medium hover:bg-brand/50 transition-colors duration-200 ease-in-out cursor-pointer ${styles}`}
            onClick={buttonClick}
        >
            <i className={icon}></i>
        </button>
    )
}