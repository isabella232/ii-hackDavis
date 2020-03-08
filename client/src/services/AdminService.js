import { backend } from './AxiosInstances';

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
    return backend.patch(endpoint, data);
}
