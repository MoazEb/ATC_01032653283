import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import useAdminEventStore from "../stores/useAdminEventsStore";
import AdminEventForm from "../components/Admin/AdminEventForm";

export default function AdminEditEventPage() {
    const { id } = useParams();
    const { events, updateEvent } = useAdminEventStore();
    const navigate = useNavigate();

    const [event, setEvent] = useState(null);
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

    const loadEvent = async () => {
        const foundEvent = events.find((event) => event._id === id);
        if (foundEvent) {
            setEvent(foundEvent);
            setFormData({
                name: foundEvent.name,
                description: foundEvent.description,
                category: foundEvent.category || "",
                date: new Date(foundEvent.date) || "",
                venue: foundEvent.venue || "",
                price: foundEvent.price || "",
                image: foundEvent.image || "",
            });
        } else {
            toast.error("Event not found");
        }
    };

    useEffect(() => {
        loadEvent();
    }, [id, events]);

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

            await updateEvent(id, submitData);
            toast.success("Event updated successfully");
            navigate("/panel");
        } catch (error) {
            console.error("Failed to update event:", error);
            toast.error("Failed to update event");
        }
    };

    if (!event) {
        return <div className="text-center py-10">Event not found</div>;
    }

    return (
        <div className="max-w-4xl mx-auto border border-custom-blue/50 dark:bg-night-deep border-y-0 shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 dark:text-night-tx-dark">Edit Event</h2>
            <AdminEventForm handleChange={handleChange} handleSubmit={handleSubmit} formData={formData} />
        </div>
    );
}
