export const menuVariants = {
    hidden: {
        opacity: 0,
        height: 0,
    },
    visible: {
        opacity: 1,
        height: "auto",
        transition: {
            duration: 0.3,
        },
    },
    exit: {
        opacity: 0,
        height: 0,
        transition: {
            duration: 0.3,
        },
    },
};

export const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
        opacity: 1,
        x: 0,
        transition: {
            delay: i * 0.2,
            duration: 0.3,
        },
    }),
};