import { backend } from './AxiosInstances';

export const login = async (data) => {
    const endpoint = `api/user/login`;
    data = {
        email: 'm@o.com',
        password: 'a'
    }
    return backend.post(endpoint, data);
}

export const setUserKind = async (userKind) => {
    localStorage.setItem('userKind', userKind);
}
