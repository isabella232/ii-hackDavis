import { backend } from './AxiosInstances';

export const fetchRatingAndReviews = async (interpreterID) => {
    const endpoint = `api/interpreters/${interpreterID}/details`;
    return backend.get(endpoint);
}

export const submitReview = async (interpreterID, data) => {
    const endpoint = `api/interpreters/${interpreterID}/reviews/add`;
    return backend.post(endpoint, data);
}
