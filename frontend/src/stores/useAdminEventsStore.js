import { create } from 'zustand';
import { getEvents, addEvent, updateEvent, deleteEvent } from '../services/endpoints';
import toast from 'react-hot-toast';
import { persist } from 'zustand/middleware';

const useAdminEventStore = create(persist(
    (set) => ({
        events: [],
        loading: false,
        error: null,

        fetchEvents: async () => {
            set({ loading: true, error: null });
            try {
                const res = await getEvents();
                set({ events: res.data, loading: false });
            } catch (err) {
                const errorMessage = err.response?.data?.msg || "Failed to fetch events";
                toast.error(errorMessage);
                set({ error: errorMessage, loading: false });
            }
        },

        addEvent: async (eventData) => {
            set({ loading: true, error: null });
            try {
                const res = await addEvent(eventData);
                set((state) => ({
                    events: [...state.events, res.data],
                    loading: false
                }));
                toast.success("Event added successfully");
                return res.data;
            } catch (err) {
                const errorMessage = err.response?.data?.msg || "Failed to add event";
                toast.error(errorMessage);
                set({ error: errorMessage, loading: false });
                throw err;
            }
        },

        updateEvent: async (id, updatedData) => {
            set({ loading: true, error: null });
            try {
                const res = await updateEvent(id, updatedData);
                set((state) => ({
                    events: state.events.map((event) =>
                        event._id === id ? res.data : event
                    ),
                    loading: false
                }));
                toast.success("Event updated successfully");
                return res.data;
            } catch (err) {
                const errorMessage = err.response?.data?.msg || "Failed to update event";
                toast.error(errorMessage);
                set({ error: errorMessage, loading: false });
                throw err;
            }
        },

        deleteEvent: async (id) => {
            set({ loading: true, error: null });
            try {
                await deleteEvent(id);
                set((state) => ({
                    events: state.events.filter((event) => event._id !== id),
                    loading: false
                }));
                toast.success("Event deleted successfully");
            } catch (err) {
                const errorMessage = err.response?.data?.msg || "Failed to delete event";
                toast.error(errorMessage);
                set({ error: errorMessage, loading: false });
                throw err;
            }
        },
    }),
    {
        name: 'admin-event-storage',
    }
));

export default useAdminEventStore;