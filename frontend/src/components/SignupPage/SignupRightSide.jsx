import React, { useState } from "react";
import EyeIcon from "../../assets/svg/EyeIcon";
import EyeOffIcon from "../../assets/svg/EyeOffIcon";
import Spinner from "../../assets/svg/Spinner";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../services/auth";
import useAuthStore from "../../stores/useAuthStore";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "../../variants/AnimationVariants";

export default function SignupRightSide() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [agreeTerms, setAgreeTerms] = useState(false);
    const authStore = useAuthStore();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (setter) => (e) => {
        setter(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading();
        const credentials = { firstName, lastName, email, password };
        await register(credentials, authStore, setIsLoading, navigate);
        toast.success("Account created successfully!");
    };

    return (
        <div className="w-full lg:w-1/2 p-6 md:p-12 flex items-center justify-center bg-white dark:bg-night-deep">
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full max-w-md">
                <motion.h1
                    variants={itemVariants}
                    className="text-3xl md:text-4xl text-gray-800 dark:text-night-tx-dark mb-2"
                >
                    Create an account
                </motion.h1>
                <motion.p variants={itemVariants} className="text-gray-500 dark:text-night-tx-deep mb-8">
                    Already have an account?
                    <Link to="/login" className="text-custom-main hover:underline">
                        Log in
                    </Link>
                </motion.p>

                <motion.form variants={containerVariants} initial="hidden" animate="visible" onSubmit={handleSubmit}>
                    <motion.div variants={itemVariants} className="flex flex-col md:flex-row gap-4 mb-5">
                        <div className="w-full md:w-1/2">
                            <input
                                type="text"
                                placeholder="First name"
                                value={firstName}
                                onChange={handleInputChange(setFirstName)}
                                required
                                disabled={isLoading}
                                className="w-full p-4 border border-gray-300 rounded-lg text-gray-800 dark:text-night-tx-dark placeholder-gray-400 placeholder:dark:text-night-tx-dim focus:outline-none focus:ring-2 focus:ring-custom-main transition-all disabled:bg-gray-100  disabled:cursor-not-allowed"
                            />
                        </div>
                        <div className="w-full md:w-1/2">
                            <input
                                type="text"
                                placeholder="Last name"
                                value={lastName}
                                onChange={handleInputChange(setLastName)}
                                required
                                disabled={isLoading}
                                className="w-full p-4 border border-gray-300 rounded-lg text-gray-800 dark:text-night-tx-dark placeholder-gray-400 placeholder:dark:text-night-tx-dim focus:outline-none focus:ring-2 focus:ring-custom-main transition-all disabled:bg-gray-100  disabled:cursor-not-allowed"
                            />
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="mb-5">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={handleInputChange(setEmail)}
                            required
                            disabled={isLoading}
                            className="w-full p-4 border border-gray-300 rounded-lg text-gray-800 dark:text-night-tx-dark placeholder-gray-400 placeholder:dark:text-night-tx-dim focus:outline-none focus:ring-2 focus:ring-custom-main transition-all  disabled:bg-gray-100  disabled:cursor-not-allowed"
                        />
                    </motion.div>

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
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            disabled={isLoading}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400  cursor-pointer hover:text-gray-600  disabled:bg-gray-100  disabled:cursor-not-allowed"
                        >
                            {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                        </button>
                    </motion.div>

                    <motion.div variants={itemVariants} className="mb-6 flex items-center gap-3">
                        <input
                            type="checkbox"
                            id="terms"
                            checked={agreeTerms}
                            onChange={(e) => setAgreeTerms(e.target.checked)}
                            required
                            disabled={isLoading}
                            className="w-5 h-5 accent-custom-main cursor-pointer disabled:bg-gray-100  disabled:cursor-not-allowed"
                        />
                        <label htmlFor="terms" className="text-gray-600 dark:text-night-tx-dark text-sm">
                            I agree to the Terms & Conditions
                        </label>
                    </motion.div>

                    <motion.button
                        variants={itemVariants}
                        type="submit"
                        disabled={isLoading}
                        className="w-full p-4 flex items-center justify-center
                        cursor-pointer bg-custom-main text-white rounded-lg font-semibold mb-8 hover:bg-custom-hover transition-colors shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {isLoading ? <Spinner /> : "Create Account"}
                    </motion.button>
                </motion.form>
            </motion.div>
        </div>
    );
}
