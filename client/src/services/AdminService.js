import { backend } from './AxiosInstances';

export const fetchInfo = async () => {
    const endpoint = `api/admin/home`;
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
    const endpoint = `api/event/create`;
    let formData = new FormData();
    formData.append('title', data.title);
    formData.append('summary', data.summary);
    formData.append('date', data.date.toJSON());
    formData.append('location', data.location);
    formData.append('image', data.image);
    formData.append('target', data.target);
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
    formData.append('target', data.target);
    return backend.patch(endpoint, formData);
}

export const deleteEvent = async (eventID) => {
    const endpoint = `api/events/${eventID}/delete`;
    return backend.delete(endpoint);
}

export const fetchEventArchive = async () => {
    const endpoint = `api/events/fetchArchive`;
    return backend.post(endpoint);
}

export const fetchEvents = async () => {
    const endpoint = `api/events/fetch`;
    return backend.get(endpoint);
}

export const archiveEvent = async (eventID) => {
    const endpoint = `api/events/${eventID}/archive`;
    return backend.patch(endpoint);
}

export const createAdminCode = async (adminCode) => {
    const endpoint = `api/admin/code/create`;
    return backend.post(endpoint, { adminCode: adminCode });
}

export const updateAdminInfo = async (data) => {
    const endpoint = 'api/admin/updateInfo';
    let formData = new FormData();
    formData.append('name', data.name);
    formData.append('avatar', data.avatar)
    return backend.patch(endpoint, formData);
}
