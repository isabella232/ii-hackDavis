import React from "react";
import PropTypes from "prop-types";
import { Highlight } from "react-instantsearch-dom";
import classes from './Hit.module.css';

import Avatar from '../../shared/Avatar/Avatar';
import InfoModal from '../InterpreterInfoModal/Modal/InterpreterInfoModal';

const Hit = ({ hit }) => {
    const languages = hit.languages.map((lang, index) =>
        (index !== hit.languages.length - 1) ? <span>{lang.language}, </span> : <span>{lang.language}</span>
    )

    return (
        <div key={`hit-${hit.objectID}`} className={classes.Hit}>
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
                <div className={classes.phone}>
                    <Highlight attribute="phone" hit={hit} tagName="em" />
                </div>
                <div className={classes.location}>
                    <Highlight attribute="location" hit={hit} tagName="em" />
                </div>

                <InfoModal key={`moreInfo-${hit.objectID}`} id={hit.objectID}
                    name={hit.name}
                    avatar={hit.avatar}
                    email={hit.email}
                    location={hit.location}
                    phone={hit.phone}
                    summary={hit.summary}
                    languages={hit.languages} />
            </div>
        </div>
    );
}

Hit.propTypes = {
    hit: PropTypes.object.isRequired
};

export default Hit;
