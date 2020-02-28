import { backend } from './AxiosInstances';

export const fetchRatingAndReviews = async (interpreterID) => {
    const endpoint = `iProfile/${interpreterID}/details`;
    return backend.get(endpoint);
}

export const submitReview = async (interpreterID, data) => {
    const endpoint = `iProfile/${interpreterID}/review`;
    return backend.post(endpoint, data);
}
