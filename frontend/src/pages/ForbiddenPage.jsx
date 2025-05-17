import { Link } from "react-router-dom";
import img from "../assets/images/403.png";
import { motion } from "framer-motion";
import { containerVariants, imageVariants, itemVariants } from "../variants/AnimationVariants";

export default function ForbiddenPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen font-poppins not-italic">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                className="w-full flex flex-col justify-center items-center"
            >
                <motion.img variants={imageVariants} src={img} alt="404 Not Found" className="max-w-xs md:max-w-sm" />
                <motion.div
                    variants={containerVariants}
                    className="flex flex-col justify-center items-center space-y-4"
                >
                    <motion.h1
                        variants={itemVariants}
                        className="text-3xl font-extrabold text-gray-900 dark:text-night-tx-dark"
                    >
                        403 Forbidden
                    </motion.h1>
                    <motion.p variants={itemVariants} className="text-gray-600 dark:text-night-tx-deep">
                        You don't have permission to access this resource.
                    </motion.p>
                    <motion.div variants={itemVariants}>
                        <Link
                            to="/"
                            className="px-6 py-3 text-sm font-medium text-white bg-custom-main rounded-md hover:bg-custom-hover"
                        >
                            Return Home
                        </Link>
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    );
}
