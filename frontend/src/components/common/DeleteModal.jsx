import Modal from "react-modal";

export default function DeleteModal({ isModalOpen, setIsModalOpen, handleDelete, event }) {
    return (
        <Modal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            contentLabel="Delete Confirmation"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md border border-gray-200 outline-none"
            overlayClassName="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50"
        >
            <h2 className="text-xl font-semibold mb-3 text-slate-800">Confirm Deletion</h2>
            <p className="text-slate-600 mb-5">Are you sure you want to delete this event?</p>
            <div className="flex gap-3 mt-4">
                <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md transition-colors duration-300 cursor-pointer"
                >
                    Cancel
                </button>
                <button
                    onClick={() => {
                        handleDelete(event._id);
                        setIsModalOpen(false);
                    }}
                    className="px-4 py-2 bg-custom-red hover:bg-custom-red/90 text-white rounded-md transition-colors duration-300 cursor-pointer"
                >
                    Delete
                </button>
            </div>
        </Modal>
    );
}
