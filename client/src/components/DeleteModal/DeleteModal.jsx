
function DeleteModal({ isOpen, onClose, onConfirm }) {
    if (!isOpen) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-md p-6 mx-4 bg-gray-900 rounded-lg shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="text-center">

                    <div className='size-12 bg-red-100 text-red-500 rounded-full font-medium text-center flex items-center justify-center mx-auto'>
                        <i className="fa solid fa-triangle-exclamation"></i>
                    </div>

                    <h3 className="mt-4 text-lg font-medium text-gray-50">
                        Confirm Deletion
                    </h3>

                    <div className="mt-2 text-base/5.5 text-gray-400">
                        <p>Are you sure you want to delete this item? This action cannot be undone.</p>
                    </div>
                </div>

                <div className="mt-6 sm:flex sm:flex-row-reverse">
                    <button
                        type="button"
                        className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={onConfirm}
                    >
                        Delete
                    </button>
                    
                    <button
                        type="button"
                        className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-400 border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteModal;