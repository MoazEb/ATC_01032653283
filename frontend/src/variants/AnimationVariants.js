export const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

export const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: "easeOut" },
    },
};

export const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.8,
            ease: [0.6, 0.01, 0.1, 0.95],
            delay: 0.5,
        },
    },
};

export const titleVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
};

// export const shapeVariants = {
//     float: {
//         y: ["0rem", "0.5rem", "0rem", "-0.5rem", "0rem"],
//         transition: {
//             duration: 8,
//             ease: "easeInOut",
//             repeat: Infinity,
//         },
//     },
//     rotate: {
//         rotate: [0, 10, -5, 0],
//         transition: {
//             duration: 15,
//             ease: "easeInOut",
//             repeat: Infinity,
//         },
//     },
// };
