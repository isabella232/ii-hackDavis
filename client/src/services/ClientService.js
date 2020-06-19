import { backend } from './AxiosInstances';

export const fetchClientPage = async (data) => {
    const endpoint = 'api/client/home';
    return backend.get(endpoint);
}

export const updateClientInfo = async (data) => {
    const endpoint = 'api/client/updateInfo';
    return backend.patch(endpoint, data);
}
