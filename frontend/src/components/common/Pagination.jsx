import React from "react";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "../../variants/AnimationVariants";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
    const nextPage = () => onPageChange(Math.min(currentPage + 1, totalPages));
    const prevPage = () => onPageChange(Math.max(currentPage - 1, 1));
    const goToPage = (pageNumber) => onPageChange(pageNumber);

    if (totalPages <= 1) return null;

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex justify-center items-center gap-2 my-6 mt-12"
        >
            {/* left button */}
            <motion.button
                variants={itemVariants}
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded ${
                    currentPage === 1
                        ? "bg-gray-200 text-gray-500 dark:bg-night-dim dark:text-night-tx-deep cursor-not-allowed"
                        : "bg-custom-main text-white hover:bg-custom-hover  cursor-pointer"
                }`}
            >
                Previous
            </motion.button>

            {/* pages */}
            <motion.div variants={itemVariants} className="flex gap-1">
                {[...Array(totalPages)].map((_, index) => {
                    const pageNumber = index + 1;
                    if (
                        pageNumber === 1 ||
                        pageNumber === totalPages ||
                        (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                    ) {
                        return (
                            <button
                                key={pageNumber}
                                onClick={() => goToPage(pageNumber)}
                                className={`w-8 h-8 flex items-center justify-center rounded ${
                                    currentPage === pageNumber
                                        ? "bg-custom-main text-white"
                                        : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-500 dark:text-night-tx-dark hover:dark:bg-gray-600  cursor-pointer"
                                }`}
                            >
                                {pageNumber}
                            </button>
                        );
                    } else if (
                        (pageNumber === currentPage - 2 && currentPage > 3) ||
                        (pageNumber === currentPage + 2 && currentPage < totalPages - 2)
                    ) {
                        return (
                            <span key={pageNumber} className="w-8 flex items-center justify-center">
                                ...
                            </span>
                        );
                    }
                    return null;
                })}
            </motion.div>

            {/* right button */}
            <motion.button
                variants={itemVariants}
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded ${
                    currentPage === totalPages
                        ? "bg-gray-200 text-gray-500 dark:bg-night-dim dark:text-night-tx-deep cursor-not-allowed"
                        : "bg-custom-main text-white hover:bg-custom-hover cursor-pointer"
                }`}
            >
                Next
            </motion.button>
        </motion.div>
    );
}
