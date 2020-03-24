import { backend } from './AxiosInstances';

export const fetchHome = async () => {
    const endpoint = `api/home`;
    return backend.get(endpoint);
}
