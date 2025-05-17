import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAdminEventStore from "../../stores/useAdminEventsStore";
import { format } from "date-fns";
import CalendarSvg from "../../assets/svg/CalendarSvg";
import LocationSvg from "../../assets/svg/LocationSvg";
import { motion } from "framer-motion";
import { itemVariants } from "../../variants/AnimationVariants";
import DeleteModal from "../common/DeleteModal";

const AdminEventCard = ({ event }) => {
    const { deleteEvent } = useAdminEventStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const formattedDate = format(new Date(event.date), "MMMM d, yyyy h:mm a");

    const handleDelete = async (id) => {
        await deleteEvent(id);
    };

    return (
        <>
            <div className="max-w-sm rounded-lg overflow-hidden shadow-md bg-white dark:bg-night-deep border border-slate-100 dark:border-night-dim font-poppins not-italic flex flex-col h-[480px]">
                <motion.div variants={itemVariants} className="relative">
                    <img className="w-full h-52 object-cover" src={event.image} alt={event.name} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <span className="absolute top-3 left-3 inline-block bg-custom-main text-white text-xs px-3 py-1 rounded-md font-medium capitalize">
                        {event.category}
                    </span>
                    <span className="absolute top-3 right-3 bg-custom-blue border border-gray-50/20 text-white text-sm font-medium px-3 py-1 rounded-md">
                        ${event.price}
                    </span>
                </motion.div>
                <motion.div variants={itemVariants} className="px-5 py-4 flex flex-col h-full">
                    <h3 className="font-semibold text-xl mb-3 text-slate-800 dark:text-night-tx-dark">{event.name}</h3>

                    <div className="flex items-center text-slate-600 mb-2.5 dark:text-night-tx-deep">
                        <CalendarSvg className="flex-shrink-0 mr-2" />
                        <span className="text-sm">{formattedDate}</span>
                    </div>
                    <div className="flex items-center text-slate-600 mb-4 dark:text-night-tx-deep">
                        <LocationSvg className="flex-shrink-0 mr-2" />
                        <span className="text-sm ">{event.venue}</span>
                    </div>

                    <p className="text-slate-600 line-clamp-3 mb-5 text-sm dark:text-night-tx-deep">
                        {event.description}
                    </p>

                    <div className="flex-grow"></div>

                    <div className="flex gap-3 text-base ">
                        <Link
                            to={event._id}
                            className="w-full font-light text-center bg-custom-main hover:bg-custom-hover cursor-pointer text-white py-2 px-4 rounded-md transition-colors duration-300"
                        >
                            Edit
                        </Link>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="w-full font-light bg-custom-red hover:bg-custom-red/90 cursor-pointer text-white py-2 px-4 rounded-md transition-colors duration-300"
                        >
                            Delete
                        </button>
                    </div>
                </motion.div>
                <DeleteModal
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    handleDelete={handleDelete}
                    event={event}
                />
            </div>
        </>
    );
};

export default AdminEventCard;
