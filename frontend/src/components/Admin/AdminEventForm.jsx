import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useAdminEventStore from "../../stores/useAdminEventsStore";
import Spinner from "../../assets/svg/Spinner";
import { containerVariants, itemVariants } from "../../variants/AnimationVariants";
import { motion } from "framer-motion";

export default function AdminEventForm({ handleSubmit, formData, handleChange }) {
    const navigate = useNavigate();
    const dateValue = formData.date instanceof Date ? formData.date.toISOString().slice(0, 16) : formData.date;
    const [imageOption, setImageOption] = useState(formData.image ? "url" : "upload");
    const { loading } = useAdminEventStore();
    const handleImageOptionChange = (e) => {
        setImageOption(e.target.value);
        if (e.target.value === "url") {
            handleChange({
                target: {
                    name: "imageFile",
                    value: null,
                },
            });
        } else {
            handleChange({
                target: {
                    name: "image",
                    value: "",
                },
            });
        }
    };

    return (
        <motion.form
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            onSubmit={handleSubmit}
            className="dark:text-night-tx-deep"
        >
            <motion.div variants={itemVariants} className="mb-4">
                <label className="block text-gray-700 dark:text-night-tx-deep font-bold mb-2" htmlFor="name">
                    Name
                </label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border dark:border-night-tx-dim border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-custom-blue"
                    required
                />
            </motion.div>

            <motion.div variants={itemVariants} className="mb-4">
                <label className="block text-gray-700 dark:text-night-tx-deep font-bold mb-2" htmlFor="description">
                    Description
                </label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border dark:border-night-tx-dim border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-custom-blue"
                    rows="4"
                    required
                />
            </motion.div>

            <motion.div variants={itemVariants} className="mb-4">
                <label className="block text-gray-700 dark:text-night-tx-deep font-bold mb-2" htmlFor="category">
                    Category
                </label>
                <input
                    id="category"
                    name="category"
                    type="text"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border dark:border-night-tx-dim border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-custom-blue"
                    required
                />
            </motion.div>

            <motion.div variants={itemVariants} className="mb-4">
                <label className="block text-gray-700 dark:text-night-tx-deep font-bold mb-2" htmlFor="date">
                    Date and Time
                </label>
                <input
                    id="date"
                    name="date"
                    type="datetime-local"
                    value={dateValue}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border dark:border-night-tx-dim border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-custom-blue"
                    required
                />
            </motion.div>

            <motion.div variants={itemVariants} className="mb-4">
                <label className="block text-gray-700 dark:text-night-tx-deep font-bold mb-2" htmlFor="venue">
                    Venue
                </label>
                <input
                    id="venue"
                    name="venue"
                    type="text"
                    value={formData.venue}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border dark:border-night-tx-dim border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-custom-blue"
                    required
                />
            </motion.div>

            <motion.div variants={itemVariants} className="mb-4">
                <label className="block text-gray-700 dark:text-night-tx-deep font-bold mb-2" htmlFor="price">
                    Price
                </label>
                <input
                    id="price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border dark:border-night-tx-dim border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-custom-blue"
                    step="0.01"
                    required
                />
            </motion.div>

            <motion.div variants={itemVariants} className="mb-4">
                <label className="block text-gray-700 dark:text-night-tx-deep font-bold mb-2">Image</label>
                <div className="flex space-x-4 mb-3">
                    <div className="flex items-center">
                        <input
                            id="image-upload"
                            name="imageOption"
                            type="radio"
                            value="upload"
                            checked={imageOption === "upload"}
                            onChange={handleImageOptionChange}
                            className="mr-2"
                        />
                        <label htmlFor="image-upload">Upload Image</label>
                    </div>
                    <div className="flex items-center">
                        <input
                            id="image-url"
                            name="imageOption"
                            type="radio"
                            value="url"
                            checked={imageOption === "url"}
                            onChange={handleImageOptionChange}
                            className="mr-2"
                        />
                        <label htmlFor="image-url">Image URL</label>
                    </div>
                </div>

                {imageOption === "upload" ? (
                    <motion.div variants={itemVariants} className="mb-4">
                        <input
                            id="imageFile"
                            name="imageFile"
                            type="file"
                            accept="image/*"
                            onChange={handleChange}
                            className="w-full px-3 py-2 border dark:border-night-tx-dim border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-custom-blue"
                        />
                    </motion.div>
                ) : (
                    <motion.div variants={itemVariants} className="mb-4">
                        <input
                            id="image"
                            name="image"
                            type="url"
                            value={formData.image || ""}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border dark:border-night-tx-dim border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-custom-blue"
                            placeholder="https://example.com/image.jpg"
                        />
                    </motion.div>
                )}
            </motion.div>

            <motion.div variants={itemVariants} className="flex space-x-4">
                <button
                    type="submit"
                    className="px-4 py-2 bg-custom-main text-white rounded hover:bg-custom-hover cursor-pointer transition-colors duration-300"
                >
                    {loading ? <Spinner /> : "Save Changes"}
                </button>
                <button
                    type="button"
                    onClick={() => navigate("/panel")}
                    className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 cursor-pointer transition-colors duration-300"
                >
                    Cancel
                </button>
            </motion.div>
        </motion.form>
    );
}
