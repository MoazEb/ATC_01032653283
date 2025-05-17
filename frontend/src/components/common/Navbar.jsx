import { Link } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useAuthStore from "../../stores/useAuthStore";
import { menuVariants, itemVariants } from "../../variants/MenuVariants";
import CloseIcon from "../../assets/svg/CloseIcon";
import MenuIcon from "../../assets/svg/MenuIcon";
import pattern from "../../assets/images/pattern.png";
import { containerVariants, imageVariants } from "../../variants/AnimationVariants";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { role, logout } = useAuthStore();
    const navItems = role === "admin" ? [{ name: "MANAGE", href: "/" }] : [{ name: "HOME", href: "/" }];

    const handleLogOut = () => {
        logout();
    };

    return (
        <motion.header
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="sticky top-0 z-50 bg-[#b089f1] dark:bg-night-deep font-poppins not-italic overflow-hidden"
        >
            <motion.div variants={imageVariants}>
                <img
                    src={pattern}
                    className="overflow-hidden -top-10  w-full object-cover object-center absolute opacity-15 md:opacity-35 pointer-events-none -z-10"
                />
            </motion.div>
            <motion.div
                variants={imageVariants}
                className="container mx-auto py-2 flex justify-between items-center px-4 md:justify-center"
            >
                <Link to="/">
                    <h1 className="text-3xl md:hidden text-white dark:text-night-tx-dark font-medium tracking-wider">
                        Evēnto
                    </h1>
                </Link>

                {/* Mobile menu button */}
                <motion.button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden text-gray-800 dark:text-night-tx-dark hover:text-neutral-900 focus:outline-none"
                    aria-label="Toggle menu"
                    whileTap={{ scale: 0.9 }}
                >
                    {menuOpen ? <CloseIcon /> : <MenuIcon />}
                </motion.button>
            </motion.div>

            {/* Desktop Navigation */}
            <motion.nav
                variants={imageVariants}
                className="hidden md:flex container mx-auto px-10 pb-2 justify-between items-center"
            >
                <Link to="/">
                    <h1 className="text-3xl md:text-4xl text-white dark:text-night-tx-dark font-medium tracking-wider">
                        Evēnto
                    </h1>
                </Link>

                <div className="flex flex-wrap justify-center items-center space-x-4 lg:space-x-8 text-base font-medium text-gray-200 dark:text-night-tx-dark">
                    <ThemeToggle />
                    {navItems.map((item, index) => (
                        <Link key={index} to={item.href}>
                            <span className="hover:text-custom-main transition-colors duration-300 px-1 py-2">
                                {item.name}
                            </span>
                        </Link>
                    ))}
                    <button
                        onClick={() => handleLogOut()}
                        className="hover:text-custom-main transition-colors duration-300 px-1 cursor-pointer"
                    >
                        LOG OUT
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Navigation*/}
            <AnimatePresence>
                {menuOpen && (
                    <motion.nav
                        className="md:hidden container mx-auto overflow-hidden"
                        variants={menuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <div className="flex flex-col space-y-3 text-xs font-medium text-gray-700 dark:text-night-tx-dark py-4">
                            <motion.div
                                variants={itemVariants}
                                initial="hidden"
                                animate="visible"
                                className="w-full text-center"
                            >
                                <ThemeToggle />
                            </motion.div>
                            {navItems.map((item, index) => (
                                <motion.div
                                    key={index}
                                    onClick={() => setMenuOpen(false)}
                                    custom={index}
                                    variants={itemVariants}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    <Link to={item.href}>
                                        <span className="hover:text-gray-500 transition-colors duration-300 block text-center py-2">
                                            {item.name}
                                        </span>
                                    </Link>
                                </motion.div>
                            ))}
                            <motion.button
                                onClick={() => handleLogOut()}
                                variants={itemVariants}
                                initial="hidden"
                                animate="visible"
                                className="hover:text-custom-main transition-colors duration-300 px-1 py-2 cursor-pointer"
                            >
                                LOG OUT
                            </motion.button>
                        </div>
                    </motion.nav>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
