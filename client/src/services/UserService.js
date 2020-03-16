import { backend } from './AxiosInstances';

export const login = async (data) => {
    const endpoint = `api/user/login`;
    // return backend.post(endpoint, data);
    return { userKind: 'Client' };
}
