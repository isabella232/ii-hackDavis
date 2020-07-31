import { backend } from './AxiosInstances';

export const fetchInfo = async () => {
    const endpoint = `api/admin/home`;
    return backend.get(endpoint);
}

export const fetchToReviews = async () => {
    const endpoint = `api/admin/allToReviews`;
    return backend.get(endpoint);
}

export const validateCertificate = async (id) => {
    const endpoint = `api/admin/certificates/${id}/validate`;
    return backend.patch(endpoint);
}

export const rejectCertificate = async (id) => {
    const endpoint = `api/admin/certificates/${id}/reject`;
    return backend.patch(endpoint);
}

export const verifyInterpreter = async (id) => {
    const endpoint = `api/admin/interpreters/${id}/verify`;
    return backend.patch(endpoint);
}

export const rejectInterpreter = async (id) => {
    const endpoint = `api/admin/interpreters/${id}/reject`;
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

export const editEvent = async (id, data) => {
    const endpoint = `api/events/${id}/edit`;
    let formData = new FormData();
    formData.append('id', id);
    formData.append('title', data.title);
    formData.append('summary', data.summary);
    formData.append('date', data.date);
    formData.append('location', data.location);
    formData.append('image', data.image);
    formData.append('target', data.target);
    return backend.patch(endpoint, formData);
}

export const deleteEvent = async (id) => {
    const endpoint = `api/events/${id}/delete`;
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

export const archiveEvent = async (id) => {
    const endpoint = `api/events/${id}/archive`;
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
