import React from 'react';

import classes from './Bookmark.module.css';

import Avatar from '../../shared/Avatar/Avatar';
import InfoModal from '../../SearchPage/InterpreterInfoModal/Modal/InterpreterInfoModal';

const Bookmark = (props) => {
    const languages = props.languages.map((lang, index) =>
        (index !== props.languages.length - 1) ? <span>{lang.language}, </span> : <span>{lang.language}</span>
    )

    return <div key={`props-${props.objectID}`} className={classes.Hit}>
        <div className={classes.avatar}>
            <Avatar name={props.name} avatar={props.avatar} size={15} />
        </div>
        <div className={classes.content}>
            <div className={classes.name}>
                {/* <Highlight attribute="name" props={props} tagName="em" /> */}
            </div>

            <div className={classes.languages}>
                {languages}
            </div>
            <div className={classes.email}>
                <h1>{props.email}</h1>
                {/* <Highlight attribute="email" props={props} tagName="em" /> */}
            </div>
            <div className={classes.location}>
                {/* <Highlight attribute="location" props={props} tagName="em" /> */}
            </div>

            <InfoModal key={`moreInfo-${props.objectID}`} id={props.objectID}
                name={props.name}
                avatar={props.avatar}
                email={props.email}
                location={props.location}
                phone={props.phone}
                summary={props.summary}
                languages={props.languages} />
        </div>
    </div>;
}

export default Bookmark;
