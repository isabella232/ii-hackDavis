import { backend } from './AxiosInstances';

export const fetchHome = async () => {
    const endpoint = `home`;
    return backend.get(endpoint);
}
