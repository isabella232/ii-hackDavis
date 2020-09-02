import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const AvatarImage = (props) => {
    const useStyles = makeStyles(theme => ({
        size: {
            width: theme.spacing(props.size),
            height: theme.spacing(props.size),
        }
    }));
    const classes = useStyles();
    const [avatar, setAvatar] = useState(props.avatar);

    // useEffect(() => {
    //     setAvatar(props.avatar);
    // }, [props.avatar]);

    return (
        <Avatar alt={`${props.name} Avatar`} src={avatar} className={classes.size} />
    );
}

export default AvatarImage;
