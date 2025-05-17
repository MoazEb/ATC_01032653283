import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminEventCard from "../components/Admin/AdminEventCard";
import useAdminEventStore from "../stores/useAdminEventsStore";
import PlusSvg from "../assets/svg/PlusSvg";
import Pagination from "../components/common/Pagination";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "../variants/AnimationVariants";
import LoadingSection from "../components/common/LoadingSection";

export default function AdminPanelPage() {
    const { fetchEvents, events, loading } = useAdminEventStore();
    const [currentPage, setCurrentPage] = useState(1);
    const [eventsPerPage] = useState(3);

    // pagination values
    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);
    const totalPages = Math.ceil(events.length / eventsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo(0, 0);
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <div className="container mx-auto px-6 bg-white dark:bg-night-dark h-full">
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="mb-6">
                {/* <motion.h1
                    variants={itemVariants}
                    className="text-3xl font-semibold md:text-4xl text-gray-800 dark:text-night-tx-dark text-center"
                >
                    Event Management
                </motion.h1> */}
                <motion.h1
                    variants={itemVariants}
                    className="text-3xl md:text-[2.8rem] text-custom-main/80 text-center mx-4 mt-6 md:mt-8 mb-2 md:mb-6 font-semibold tracking-tighter dark:text-night-tx-dark/80"
                >
                    Event Management
                </motion.h1>
            </motion.div>

            {loading ? (
                <LoadingSection />
            ) : (
                <>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    >
                        <Link to="create" className="flex flex-col items-center justify-center">
                            <motion.div
                                variants={itemVariants}
                                className="group flex flex-col h-full w-full items-center justify-center p-6 bg-white dark:bg-night-deep rounded-lg border-2 border-dashed border-gray-300 dark:border-night-dim hover:border-custom-main transition-colors duration-300 min-h-[200px]"
                            >
                                <PlusSvg />
                                <span className="mt-2 text-lg font-medium text-gray-600 group-hover:text-custom-main transition-colors duration-300">
                                    Add New Event
                                </span>
                            </motion.div>
                        </Link>

                        {/* Events */}
                        {events.length === 0 ? (
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="text-center p-10 bg-white dark:bg-night-dark rounded-lg border border-gray-200 col-span-3"
                            >
                                <motion.p variants={itemVariants} className="text-gray-600 dark:text-night-tx-dark">
                                    No events found. Create your first event to get started.
                                </motion.p>
                            </motion.div>
                        ) : (
                            currentEvents.map((event) => <AdminEventCard key={event._id} event={event} />)
                        )}
                    </motion.div>
                    {events.length > 0 && (
                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                    )}
                </>
            )}
        </div>
    );
}
