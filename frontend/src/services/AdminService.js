import { backend } from './AxiosInstances';

export const fetchCertificates = async (adminID) => {
    const endpoint = `admin/${adminID}/homepage`;
    return backend.get(endpoint);
}

export const verifyCertificate = async (certificateID) => {
    const endpoint = `certificate/${certificateID}/verify`;
    return backend.patch(endpoint);
}

export const rejectCertificate = async (certificateID) => {
    const endpoint = `certificate/${certificateID}/reject`;
    return backend.patch(endpoint);
}
