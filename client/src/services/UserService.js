import { auth, backend } from './AxiosInstances';

export const signIn = async (data) => {
    const endpoint = `api/user/login`;
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

export const signUp = async (data, kind) => {
    if (kind === 'Client') {
        const endpoint = `api/client/create`;
        let formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('password', data.password);
        formData.append('avatar', data.avatar);
        return backend.post(endpoint, formData);
    }

    // else if (kind === 'Interpreter') {
    //     const endpoint = `api/user/create`;
    //     return backend.post(endpoint, data);
    // }
}
