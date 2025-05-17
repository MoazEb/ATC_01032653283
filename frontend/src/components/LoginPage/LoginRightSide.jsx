import React, { useState } from "react";
// import ErrorMsg from "../common/ErrorMsg";
import EyeIcon from "../../assets/svg/EyeIcon";
import EyeOffIcon from "../../assets/svg/EyeOffIcon";
import Spinner from "../../assets/svg/Spinner";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services/auth";
import useAuthStore from "../../stores/useAuthStore";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "../../variants/AnimationVariants";

export default function LoginRightSide() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    // const [error, setError] = useState("");
    const authStore = useAuthStore();
    const navigate = useNavigate();

    const handleInputChange = (setter) => (e) => {
        setter(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading();
        const credentials = { email, password };
        await login(credentials, authStore, setIsLoading, navigate);
    };

    return (
        <div className="w-full lg:w-1/2 p-6 md:p-12 flex items-center justify-center bg-white dark:bg-night-deep">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="w-full max-w-md flex flex-col gap-10"
            >
                <motion.div variants={itemVariants}>
                    <motion.h1 variants={itemVariants} className="text-gray-800 mb-2 text-4xl dark:text-night-tx-dark">
                        Welcome Back!
                    </motion.h1>
                    <motion.p variants={itemVariants} className="text-gray-500 dark:text-night-tx-deep text-base ml-1">
                        Don't have an account?
                        <Link to="/signup" className="text-custom-main ml-1 hover:underline">
                            Sign up
                        </Link>
                    </motion.p>
                </motion.div>

                <motion.form
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    onSubmit={handleSubmit}
                    className="tracking-wider"
                >
                    {/* Email input */}
                    <motion.div variants={itemVariants} className="mb-5">
                        <input
                            type="email"
                            placeholder="email"
                            value={email}
                            onChange={handleInputChange(setEmail)}
                            required
                            disabled={isLoading}
                            className="w-full p-4 border border-gray-300 rounded-lg text-gray-800 dark:text-night-tx-dark placeholder-gray-400 placeholder:dark:text-night-tx-dim focus:outline-none focus:ring-2 focus:ring-custom-main transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                        />
                    </motion.div>

                    {/* password input */}
                    <motion.div variants={itemVariants} className="mb-5 relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={password}
                            onChange={handleInputChange(setPassword)}
                            required
                            disabled={isLoading}
                            className="w-full p-4 border border-gray-300 rounded-lg text-gray-800 dark:text-night-tx-dark placeholder-gray-400 placeholder:dark:text-night-tx-dim focus:outline-none focus:ring-2 focus:ring-custom-main transition-all disabled:bg-gray-100  disabled:cursor-not-allowed"
                        />
                        {/* show / hide password */}
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600"
                        >
                            {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                        </button>
                    </motion.div>

                    {/* error msg */}
                    {/* {error && <ErrorMsg error={error} />} */}

                    {/* submit button */}
                    <motion.button
                        variants={itemVariants}
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex justify-center items-center p-4 font-semibold bg-custom-main text-white rounded-lg mb-8 hover:bg-custom-hover transition-colors shadow-md cursor-pointer duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {isLoading ? <Spinner /> : "Log in"}
                    </motion.button>
                </motion.form>
            </motion.div>
        </div>
    );
}
