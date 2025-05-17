import { useState } from "react";
import useAdminEventStore from "../stores/useAdminEventsStore";
import AdminEventForm from "../components/Admin/AdminEventForm";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export default function AdminCreateEventPage() {
    const { addEvent } = useAdminEventStore();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "imageFile" && files && files[0]) {
            setFormData({
                ...formData,
                imageFile: files[0],
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        category: "",
        date: "",
        venue: "",
        price: "",
        image: "",
        imageFile: null,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const submitData = new FormData();

            for (const key in formData) {
                if (key !== "imageFile") {
                    submitData.append(key, formData[key]);
                }
            }

            if (formData.imageFile) {
                submitData.append("image", formData.imageFile);
            }

            await addEvent(submitData);
            toast.success("Event updated successfully");
            navigate("/panel");
        } catch (error) {
            console.error("Failed to create event:", error);
            toast.error("Failed to create event");
        }
    };

    return (
        <div className="max-w-4xl mx-auto border border-custom-blue/50 bg-white dark:bg-night-deep border-y-0 shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 dark:text-night-tx-dark">Add New Event</h2>
            <AdminEventForm handleSubmit={handleSubmit} handleChange={handleChange} formData={formData} />
        </div>
    );
}
