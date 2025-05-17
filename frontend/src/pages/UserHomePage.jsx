import { useEffect, useState } from "react";
import useHomePageStore from "../stores/useHomePageStore";
import UserEventCard from "../components/User/UserEventCard";
import Spinner from "../assets/svg/Spinner";
import toast from "react-hot-toast";
import Pagination from "../components/common/Pagination";
import { motion } from "framer-motion";
import { containerVariants, itemVariants, titleVariants, imageVariants } from "../variants/AnimationVariants";
import LoadingSection from "../components/common/LoadingSection";

export default function UserHomePage() {
    const { events, bookedEvents, fetchEvents, fetchBookedEvents, loading } = useHomePageStore();
    const bookedEventIds = bookedEvents.map((booking) => booking.event._id);
    const [currentPage, setCurrentPage] = useState(1);
    const [eventsPerPage] = useState(4);

    // pagination values
    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);
    const totalPages = Math.ceil(events.length / eventsPerPage);

    useEffect(() => {
        const fetch = async () => {
            try {
                await Promise.all([fetchEvents(), fetchBookedEvents()]);
            } catch (err) {
                toast.error("Failed to load data:");
                console.error(err);
            }
        };
        fetch();
    }, [fetchEvents, fetchBookedEvents]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo(0, 0);
    };

    return (
        <>
            {loading ? (
                <LoadingSection />
            ) : (
                <>
                    <motion.div
                        className="w-full font-poppins not-italic"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        viewport={{ once: true }}
                    >
                        <motion.h1
                            variants={titleVariants}
                            className="text-3xl md:text-5xl text-custom-main/80 dark:text-custom-main/90  text-center mx-4 mt-6 md:mt-10 mb-2 md:mb-6 font-semibold tracking-tighter"
                        >
                            Available Events
                        </motion.h1>
                    </motion.div>
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {events.length === 0 ? (
                            <div className="text-center p-10 bg-white rounded-lg border border-gray-200 col-span-full">
                                <p className="text-gray-600">No events found</p>
                            </div>
                        ) : (
                            currentEvents.map((event) => (
                                <UserEventCard
                                    key={event._id}
                                    event={event}
                                    isBooked={bookedEventIds.includes(event._id)}
                                    bookingId={bookedEvents.find((b) => b.event._id === event._id)?._id}
                                />
                            ))
                        )}
                    </motion.div>

                    {events.length > 0 && (
                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                    )}
                </>
            )}
        </>
    );
}
