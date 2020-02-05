import { backend } from './AxiosInstances';

export const fetchCertificates = (adminID) => {
    const endpoint = `/admin/${adminID}/homepage`;
    return backend.get(endpoint);
}
