

export default function MainButton({ type, text, disabled }) {
    return (
        <button
            disabled={disabled}
            type={type}
            className="w-full mt-3 bg-brand text-white py-4 px-4 rounded
                     font-medium hover:bg-brand/50 transition-colors duration-200 ease-in-out cursor-pointer"
        >
            {text}
        </button>
    )
}