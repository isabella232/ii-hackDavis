import { backend } from './AxiosInstances';

export const signUp = async (data) => {
    const endpoint = `signup`;
    return backend.post(endpoint, data);
}