import React from "react";
import { Hits } from "react-instantsearch-dom";
import { connectStateResults } from "react-instantsearch/connectors";

import Hit from "../Hit/Hit";

export default connectStateResults(
    ({ searchState, searchResults }) =>
        <>
            {(searchResults && searchResults.nbHits !== 0) ?
                <Hits hitComponent={Hit} />
                : <div>No results found for <strong>{searchState.query}</strong>.</div>}
        </>
);

