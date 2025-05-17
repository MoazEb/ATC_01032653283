import { useEffect } from "react";
import confetti from "canvas-confetti";
import img from "../assets/images/congratulation.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { containerVariants, imageVariants, itemVariants } from "../variants/AnimationVariants";

export default function CongratulationPage() {
    useEffect(() => {
        const duration = 3000;
        const end = Date.now() + duration;
        const colors = ["#3b82f6", "#8b5cf6", "#ec4899", "#f43f5e", "#f59e0b"];

        const frame = () => {
            confetti({
                particleCount: 3,
                angle: 60,
                spread: 350,
                origin: { x: 0 },
                colors: colors,
            });
            confetti({
                particleCount: 3,
                angle: 120,
                spread: 350,
                origin: { x: 1 },
                colors: colors,
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        };

        confetti({
            particleCount: 150,
            spread: 150,
            origin: { y: 0.6 },
            colors: colors,
        });

        frame();
    }, []);

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-100 dark:from-night-deep dark:to-night-dim flex flex-col items-center justify-center p-4 font-poppins not-italic"
        >
            <motion.img variants={imageVariants} src={img} className="max-w-sm md:max-w-md"></motion.img>
            <motion.h1
                variants={itemVariants}
                className="text-3xl md:text-5xl font-normal line-clamp-4 text-center text-gray-800 dark:text-night-tx-dark"
            >
                Congratulations!
                <br />
                Your Ticket is Booked!
            </motion.h1>
            <motion.div variants={itemVariants} className="mt-8">
                <Link
                    to="/"
                    className="px-6 py-3 mt-8 text-sm font-light text-white bg-custom-main rounded-sm hover:bg-custom-hover"
                >
                    Return Home
                </Link>
            </motion.div>
        </motion.div>
    );
}
