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

export const fetchBookmarks = async () => {
    const endpoint = 'api/client/allBookmarks';
    return backend.get(endpoint);
}

export const bookmarkInterpreter = async (email) => {
    const endpoint = 'api/client/bookmarkInterpreter';
    return backend.patch(endpoint, { email: email });
}

export const unbookmarkInterpreter = async (email) => {
    const endpoint = 'api/client/unbookmarkInterpreter';
    return backend.patch(endpoint, { email: email });
}
