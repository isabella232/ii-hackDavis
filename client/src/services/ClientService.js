import { backend } from './AxiosInstances';

export const fetchClientPage = async (data) => {
    const endpoint = 'api/client/home';
    return backend.get(endpoint);
}

export const updateClientInfo = async (data) => {
    const endpoint = 'api/client/updateInfo';
    console.log(data);
    return backend.patch(endpoint, data);
}

export const updateClientPassword = async (data) => {
    const endpoint = 'api/client/updatePassword';
    return backend.patch(endpoint, data);
}
