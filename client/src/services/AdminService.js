import { backend } from './AxiosInstances';

export const fetchData = async () => {
    const endpoint = `api/admin/adminpage`;
    return backend.get(endpoint);
}

export const validateCertificate = async (certificateID) => {
    const endpoint = `api/admin/certificates/${certificateID}/validate`;
    return backend.patch(endpoint);
}

export const rejectCertificate = async (certificateID) => {
    const endpoint = `api/admin/certificates/${certificateID}/reject`;
    return backend.patch(endpoint);
}


export const createEvent = async (data) => {
    const endpoint = `api/events/create`;
    let formData = new FormData();
    formData.append('title', data.title);
    formData.append('summary', data.summary);
    formData.append('date', data.date.toJSON());
    formData.append('location', data.location);
    formData.append('image', data.image);
    return backend.post(endpoint, formData);
}

export const editEvent = async (eventID, data) => {
    const endpoint = `api/events/${eventID}/edit`;
    let formData = new FormData();
    formData.append('id', eventID);
    formData.append('title', data.title);
    formData.append('summary', data.summary);
    formData.append('date', data.date);
    formData.append('location', data.location);
    formData.append('image', data.image);
    return backend.patch(endpoint, formData);
}

export const deleteEvent = async (eventID) => {
    const endpoint = `api/events/${eventID}/delete`;
    return backend.delete(endpoint);
}
