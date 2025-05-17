import api from "./config";

// events
export const getEvents = async () => await api.get('/admin/events')
export const addEvent = async (EventData) => await api.post('/admin/events', EventData, {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
})
export const updateEvent = async (id, updatedData) => await api.put(`/admin/events/${id}`, updatedData, {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
})
export const deleteEvent = async (id) => await api.delete(`/admin/events/${id}`);

//user events for users
export const getUserEvents = async () => await api.get('/events');

// get booked events
export const getBookedEvents = async () => await api.get('/bookings/my')

// book event
export const bookEvent = async (eventId) => await api.post(`/bookings/${eventId}`)

// delete booked event
export const deleteBookedEvent = async (eventId) => await api.delete(`/bookings/${eventId}`)