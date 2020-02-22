import React from "react";
import PropTypes from "prop-types";
import { Highlight, Snippet } from "react-instantsearch-dom";

import InfoModal from '../../modals/InterpreterInfoModal/InterpreterInfoModal';

import classes from './Hit.module.css';

const Hit = ({ hit }) => {
    const languages = hit.languages.map((lang, index) =>
        (index !== hit.languages.length - 1) ? <span>{lang.language}, </span> : <span>{lang.language}</span>
    )
    return (
        <div key={`hit-${hit.objectID}`} className={classes.Hit}>
            <div className={classes.avatar}>
                <img src={hit.avatar} width='100%' />
            </div>
            <div className={classes.content}>
                <div className={classes.name}>
                    <Highlight attribute="name" hit={hit} tagName="em" />
                </div>
                <div className={classes.languages}>
                    <Snippet attribute="languages" hit={hit} />
                </div>
                <div className={classes.languages}>
                    {languages}
                </div>
                <div className={classes.email}>{hit.email}</div>
                <div className={classes.location}>{hit.location}</div>

                <InfoModal key={`moreInfo-${hit.objectID}`} interpreterID={hit.objectID}
                    name={hit.name}
                    avatar={hit.avatar}
                    email={hit.email}
                    location={hit.location}
                    // gender={hit.gender}
                    // phoneNumber={hit.phoneNumber}
                    languages={hit.languages} />
            </div>
        </div>
    );
}

Hit.propTypes = {
    hit: PropTypes.object.isRequired
};

export default Hit;
