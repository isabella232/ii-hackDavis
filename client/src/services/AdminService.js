import { backend } from './AxiosInstances';
import axios from 'axios';

export const fetchCertificates = async () => {
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
    formData.append('date', data.date);
    formData.append('image', data.image)
    return backend.post(endpoint, formData);
}
