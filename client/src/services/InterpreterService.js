import { backend } from './AxiosInstances';

export const fetchRatingAndReviews = async (interpreterID) => {
    const endpoint = `api/interpreters/${interpreterID}/details`;
    return backend.get(endpoint);
}

export const submitReview = async (interpreterID, data) => {
    const endpoint = `api/interpreters/${interpreterID}/reviews/add`;
    return backend.post(endpoint, data);
}

export const fetchInterpreterPage = async (data) => {
    const endpoint = 'api/interpreter/home';
    return backend.get(endpoint);
}

export const updateInterpreterInfo = async (data) => {
    const endpoint = 'api/interpreter/updateInfo';
    let formData = new FormData();
    formData.append('name', data.name);
    formData.append('avatar', data.avatar)
    formData.append('languages', JSON.stringify(data.languages));
    formData.append('services', JSON.stringify(data.services));
    formData.append('location', data.location);
    formData.append('summary', data.summary);
    return backend.patch(endpoint, formData);
}
