import React, { useState } from 'react';
import classes from './Bookmark.module.css';

import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import Rating from '@material-ui/lab/Rating';

import Avatar from '../../shared/Avatar/Avatar';
import { bookmarkInterpreter, unbookmarkInterpreter } from '../../../services/ClientService';

const Bookmark = (props) => {
    const [bookmarked, setBookmarked] = useState(true);
    const languages = props.languages.map((lang, index) =>
        (index !== props.languages.length - 1) ? <span>{lang.language}, </span> : <span>{lang.language}</span>
    )
    const bookmarkIcon = bookmarked ?
        <BookmarkIcon color="primary" onClick={e => unbookmark(e, props.email)} />
        : <BookmarkBorderIcon color="primary" onClick={e => bookmark(e, props.email)} />;


    const bookmark = (e, email) => {
        bookmarkInterpreter(email)
            .then(data => { setBookmarked(true); })
            .catch(e => alert('Cannot Bookmark Interpreter At This Moment.'))
    }

    const unbookmark = (e, email) => {
        unbookmarkInterpreter(email)
            .then(data => { setBookmarked(false); })
            .catch(e => alert('Cannot Unbookmark Interpreter At This Moment.'))
    }

    return <div key={`props-${props.objectID}`} className={classes.Bookmark}>
        <div className={classes.avatar}>
            <Avatar name={props.name} avatar={props.avatar} size={15} />
        </div>
        <div className={classes.content}>
            <div className={classes.name}>
                {props.name}
                <div className={classes.bookmark}>
                    {bookmarkIcon}
                </div>
            </div>
            <Rating value={props.rating} readOnly />

            <div className={classes.languages}>
                {languages}
            </div>
            <div className={classes.email}>
                {props.email}
            </div>
            <div className={classes.location}>
                {props.location}
            </div>
            <div className={classes.phone}>
                {props.phone}
            </div>
        </div>
    </div>;
}

export default Bookmark;
