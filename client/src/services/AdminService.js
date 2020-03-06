import { backend } from './AxiosInstances';

export const fetchCertificates = async () => {
    const endpoint = `api/admin`;
    return backend.get(endpoint);
}

export const validateCertificate = async (certificateID) => {
    const endpoint = `api/certificates/${certificateID}/validate`;
    return backend.patch(endpoint);
}

export const rejectCertificate = async (certificateID) => {
    const endpoint = `api/certificates/${certificateID}/reject`;
    return backend.patch(endpoint);
}
