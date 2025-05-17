import { create } from 'zustand';
import { getEvents, getBookedEvents, bookEvent, deleteBookedEvent } from '../services/endpoints';
import toast from 'react-hot-toast';
import { persist } from 'zustand/middleware';

const useHomePageStore = create(persist(
    (set, get) => ({
        events: [],
        bookedEvents: [],
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

        fetchBookedEvents: async () => {
            set({ loading: true, error: null });
            try {
                const res = await getBookedEvents();
                set({ bookedEvents: res.data, loading: false });
                console.log(res.data)
            }
            catch (err) {
                const errorMessage = err.response?.data?.msg || "Failed to fetch events";
                toast.error(errorMessage);
                set({ error: errorMessage, loading: false });
            }
        },

        bookEvent: async (eventId) => {
            set({ loading: true, error: null });
            try {
                await bookEvent(eventId);
                toast.success("Event booked successfully!");
                await get().fetchBookedEvents();
                await get().fetchEvents();
                set({ loading: false });
            } catch (err) {
                const errorMessage = err.response?.data?.msg || "Failed to book event";
                toast.error(errorMessage);
                set({ error: errorMessage, loading: false });
            }
        },

        deleteBookedEvent: async (eventId) => {
            set({ loading: true, error: null });
            try {
                await deleteBookedEvent(eventId);
                toast.success("Booking cancelled successfully!");
                await get().fetchBookedEvents();
                await get().fetchEvents();
                set({ loading: false });
            } catch (err) {
                const errorMessage = err.response?.data?.msg || "Failed to cancel booking";
                toast.error(errorMessage);
                set({ error: errorMessage, loading: false });
            }
        }
    }),
    {
        name: 'user-event-storage',
    }
));

export default useHomePageStore;