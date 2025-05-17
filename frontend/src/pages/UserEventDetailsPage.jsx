import { useNavigate, useParams } from "react-router-dom";
import useHomePageStore from "../stores/useHomePageStore";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import CalendarSvg from "../assets/svg/CalendarSvg";
import LocationSvg from "../assets/svg/LocationSvg";
import toast from "react-hot-toast";
import NotFoundPage from "./NotFoundPage";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "../variants/AnimationVariants";
import LoadingSection from "../components/common/LoadingSection";

export default function UserEventDetailsPage() {
    const { eventId } = useParams();
    const { events, fetchEvents, loading } = useHomePageStore();
    const event = events.find((event) => event._id === eventId);
    const { bookEvent, deleteBookedEvent, bookedEvents, fetchBookedEvents } = useHomePageStore();
    const [isProcessing, setIsProcessing] = useState(false);
    const bookedEventIds = bookedEvents.map((booking) => booking.event._id);
    const isBooked = bookedEventIds.includes(eventId);
    const bookingId = bookedEvents.find((b) => b.event._id === eventId)?._id;

    const navigate = useNavigate();

    const handleActionClick = async () => {
        setIsProcessing(true);
        try {
            if (isBooked) {
                await deleteBookedEvent(bookingId);
                toast.success("Booking canceled successfully");
            } else {
                await bookEvent(eventId);
                navigate("/congratulation");
            }
        } catch (err) {
            toast.error(err.message || "An error occurred");
        } finally {
            setIsProcessing(false);
        }
    };

    useEffect(() => {
        if (events.length === 0) {
            Promise.all([fetchEvents(), fetchBookedEvents()]);
        }
    }, [events.length, fetchEvents, fetchBookedEvents]);

    if (!event) {
        return (
            <NotFoundPage />
            // <div className="text-center p-10 bg-white rounded-lg border border-gray-200 h-screen flex items-center justify-center">
            //     <p className="text-blue-500">Event Not Found</p>
            // </div>
        );
    }

    const formattedDate = format(new Date(event.date), "MMMM d, yyyy h:mm a");

    return (
        <>
            {loading ? (
                <LoadingSection />
            ) : (
                <motion.div
                    className="max-w-3xl mx-auto font-poppins not-italic"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                >
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        className="bg-white dark:bg-night-deep overflow-hidden md:border border-custom-blue/35"
                    >
                        <motion.div variants={itemVariants} className="relative h-64 md:h-80 w-full">
                            <img
                                src={event.image}
                                alt={event.name}
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                                <h1 className="text-2xl md:text-3xl font-bold text-white">{event.name}</h1>
                                <div className="flex items-center text-white mt-2">
                                    <CalendarSvg className="w-4 h-4 mr-2" />
                                    <span className="text-sm md:text-base">{formattedDate}</span>
                                </div>
                            </div>
                            <span className="absolute top-4 left-4 bg-custom-main text-white text-xs px-3 py-1 rounded-md border border-gray-100/20 font-medium capitalize">
                                {event.category}
                            </span>
                            <span className="absolute top-4 right-4 bg-custom-blue text-white text-sm font-medium px-3 py-1 rounded-md border border-gray-100/20">
                                ${event.price}
                            </span>
                        </motion.div>

                        {/* Event Details */}
                        <motion.div variants={itemVariants} className="p-4 pb-2 h-full flex flex-col md:min-h-[46.1vh]">
                            <div className="flex items-center text-gray-600 dark:text-night-tx-dark mb-4">
                                <LocationSvg className="w-5 h-5 mr-2" />
                                <span className="text-base">{event.venue}</span>
                            </div>
                            <div className="mb-6">
                                <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-night-tx-dark ">
                                    About the Event
                                </h2>
                                <p className="text-gray-600 dark:text-night-tx-deep whitespace-pre-line">
                                    {event.description}
                                </p>
                            </div>

                            <div className="flex-grow"></div>

                            <button
                                onClick={handleActionClick}
                                disabled={isProcessing}
                                className={`w-full text-white rounded-full font-medium py-2 px-4 transition-colors duration-200
                                    border border-neutral-500 hover:border-neutral-800
                                  ${
                                      isBooked
                                          ? "bg-custom-red hover:bg-custom-red/90"
                                          : "bg-custom-main hover:bg-custom-hover/95"
                                  }
                                  ${isProcessing ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}`}
                            >
                                {isProcessing ? "Processing..." : isBooked ? "Cancel Booking" : "Book"}
                            </button>
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </>
    );
}
