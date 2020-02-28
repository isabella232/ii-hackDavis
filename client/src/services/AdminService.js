import { backend } from './AxiosInstances';

export const fetchCertificates = async () => {
    const endpoint = `api/admin`;
    return backend.get(endpoint);
}

export const verifyCertificate = async (certificateID) => {
    const endpoint = `api/certificate/${certificateID}/verify`;
    return backend.patch(endpoint);
}

export const rejectCertificate = async (certificateID) => {
    const endpoint = `api/certificate/${certificateID}/reject`;
    return backend.patch(endpoint);
}
