import React from "react";
import { connectStateResults } from "react-instantsearch/connectors";
import { Highlight, connectHits } from 'react-instantsearch-dom';

import classes from './css/Content.module.css';

import Avatar from '../shared/Avatar';
import InfoModal from './InterpreterInfoModal';

const Hits = connectHits(({ hits }) => {
    return <>
        {hits.map((hit, i) => {
            const languages = hit.languages.map((lang, index) =>
                (index !== hit.languages.length - 1) ? <span key={`hit-lang-${i}-${index}`}>{lang.language}, </span> : <span key={`hit-lang-${i}-${index}`}>{lang.language}</span>
            )

            return <div key={`hit-${hit.objectID}`} className={classes.Hit}>
                <div className={classes.avatar}>
                    <Avatar name={hit.name} avatar={hit.avatar} size={15} />
                </div>
                <div className={classes.content}>
                    <div className={classes.name}>
                        <Highlight attribute="name" hit={hit} tagName="em" />
                    </div>

                    <div className={classes.languages}>
                        {languages}
                    </div>
                    <div className={classes.email}>
                        <Highlight attribute="email" hit={hit} tagName="em" />
                    </div>
                    <div className={classes.location}>
                        <Highlight attribute="location" hit={hit} tagName="em" />
                    </div>

                    <InfoModal key={`moreInfo-${hit.objectID}`} id={hit.objectID}
                        name={hit.name}
                        avatar={hit.avatar}
                        services={hit.services}
                        email={hit.email}
                        location={hit.location}
                        phone={hit.phone}
                        summary={hit.summary}
                        languages={hit.languages} />
                </div>
            </div>;
        })}
    </>
});

const Content = ({ searchState, searchResults }) =>
    <>
        {(searchResults && searchResults.nbHits !== 0) ?
            <Hits />
            : <div>No results found for <strong>{searchState.query}</strong>.</div>}
    </>

export default connectStateResults(Content);

