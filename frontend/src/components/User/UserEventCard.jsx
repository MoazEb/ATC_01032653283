import React from "react";
import { format } from "date-fns";
import LocationSvg from "../../assets/svg/LocationSvg";
import CalendarSvg from "../../assets/svg/CalendarSvg";
import { Link } from "react-router-dom";
import pattern from "../../assets/images/pattern.png";
import { motion } from "framer-motion";
import { itemVariants } from "../../variants/AnimationVariants";

const UserEventCard = ({ event, isBooked }) => {
    const formattedDate = format(new Date(event.date), "MMMM d, yyyy h:mm a");

    return (
        <Link
            to={`/event/${event._id}`}
            className="max-w-sm overflow-hidden border shadow-md hover:shadow-2xl shadow-gray-500/20 border-neutral-200 hover:border-custom-blue/60 dark:bg-night-deep dark:border-night-dim  transition-all duration-500 font-poppins not-italic"
        >
            <motion.div className="relative" variants={itemVariants}>
                <img className="w-full h-52 object-cover" src={event.image} alt={event.name} loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <span className="absolute top-3 left-3 inline-block bg-custom-main text-white text-xs px-3 py-1 rounded-md font-medium capitalize">
                    {event.category}
                </span>
                <span className="absolute top-3 right-3 bg-custom-blue border border-gray-50/20 text-white text-sm font-medium px-3 py-1 rounded-md">
                    ${event.price}
                </span>

                {isBooked ? (
                    <span className="absolute bottom-3 left-3 inline-block bg-custom-blue border border-gray-50/20 text-white text-xs px-3 py-1 rounded-md font-medium">
                        Booked
                    </span>
                ) : (
                    <span className="absolute bottom-3 left-3 inline-block bg-teal-500 border border-gray-50/20 text-white text-xs px-3 py-1 rounded-md font-medium">
                        Book Now
                    </span>
                )}
            </motion.div>

            <motion.div variants={itemVariants} className="overflow-hidden relative h-full group">
                {/* <img
                    src={pattern}
                    className="overflow-hidden  w-full object-cover object-center absolute opacity-10 pointer-events-none -z-10"
                /> */}

                <div className="px-5 py-4 ">
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
                </div>
            </motion.div>
        </Link>
    );
};

export default UserEventCard;
