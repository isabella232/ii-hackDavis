import { backend } from './AxiosInstances';

export const signUpProvider = async (data) => {
    const endpoint = `api/user/create`;
    return backend.post(endpoint, data);
}

export const signUpInterpreter = async (data) => {
    const endpoint = `api/interpreter/create`;
    return backend.post(endpoint, data);
}