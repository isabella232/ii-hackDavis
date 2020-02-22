import { backend } from './AxiosInstances';

export const fetchRatingAndReviews = async (interpreterID) => {
    const endpoint = `iProfile/${interpreterID}/details`;
    return backend.get(endpoint);
}
