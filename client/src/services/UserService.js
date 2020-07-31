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

export const signUpClient = async (data) => {
    const endpoint = `api/client/create`;
    let formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('avatar', data.avatar);
    return backend.post(endpoint, formData);
}

export const signUpInterpreter = async (data) => {
    const endpoint = `api/interpreter/create`;
    let formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('avatar', data.avatar);
    formData.append('location', data.location);
    formData.append('phone', data.phone);
    formData.append('summary', data.summary);
    formData.append('services', JSON.stringify(data.services));
    formData.append('languages', JSON.stringify(data.languages));
    return backend.post(endpoint, formData);
}

export const signUpAdmin = async (data) => {
    const endpoint = `api/admin/create`;
    let formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('avatar', data.avatar);
    formData.append('adminCode', data.adminCode)
    return backend.post(endpoint, formData);
}

export const updateUserPassword = async (data) => {
    const endpoint = 'api/user/updatePassword';
    return backend.patch(endpoint, data);
}

export const verifyAccount = async (id) => {
    const endpoint = `api/user/${id}/verifyAccount`;
    return backend.post(endpoint);
}
