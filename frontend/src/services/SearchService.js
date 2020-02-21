import algoliasearch from 'algoliasearch/lite';
import { backend } from './AxiosInstances';

export const searchClient = algoliasearch(
    process.env.REACT_APP_ALGOLIA_APP_ID,
    process.env.REACT_APP_ALGOLIA_SEARCH_KEY
);


// export const fetchUserLocation = async (ID) => {
//     const endpoint = `admin/${adminID}/homepage`;
//     return backend.get(endpoint);
// }
