import { auth } from './AxiosInstances';

export const signIn = async (data) => {
    const endpoint = `api/user/login`;
    data = {
        email: 'm@o.com',
        password: 'a'
    }
    const response = await auth.post(endpoint, data);
    if (response.status === 200) {
        localStorage.setItem('userKind', response.data.userKind);
    }
    return response.data;
}

export const signOut = async () => {
    const endpoint = `api/user/logout`;
    const response = await auth.post(endpoint);
    if (response.status === 200) {
        localStorage.removeItem('userKind');
    }
    return response.data;
}

export const hj = async () => {
    const endpoint = `api/user/authenticate`;
    await auth.post(endpoint);
}
