import { backend } from './AxiosInstances';

export const fetchClientPage = async (data) => {
    const endpoint = 'api/client/home';
    return backend.get(endpoint);
}

export const updateClientInfo = async (data) => {
    const endpoint = 'api/client/updateInfo';
    let formData = new FormData();
    formData.append('name', data.name);
    formData.append('avatar', data.avatar)
    return backend.patch(endpoint, formData);
}
