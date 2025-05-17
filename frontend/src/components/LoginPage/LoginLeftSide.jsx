import img from "../../assets/images/1.png";
import { motion } from "framer-motion";
import { containerVariants, imageVariants } from "../../variants/AnimationVariants";

export default function SignupLeftSide() {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-3/4 relative overflow-hidden hidden lg:block"
        >
            <motion.img
                variants={imageVariants}
                src={img}
                draggable="false"
                alt="a man using laptop for exploring events and sending messages to others"
                className="absolute inset-0 w-full h-full object-cover transform "
            />
            <div className="absolute inset-0 dark:bg-black/40"></div>
        </motion.div>
    );
}
