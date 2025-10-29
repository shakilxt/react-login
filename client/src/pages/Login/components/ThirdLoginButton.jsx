

export default function ThirdLoginButton({ iconClass, providerName }) {
    return (
        <button
            className="w-full rounded border border-border py-2 px-3 text-center text-md font-medium text-gray-50 shadow-xs
                             hover:bg-brand hover:border-brand cursor-pointer transition-all duration-200 ease-in-out
                             flex flex-row justify-center items-center gap-1.5 md:px-8 md:py-3
                             "
        >
            <i className={`fab ${iconClass}`}></i>
            {providerName}
        </button>
    )
}