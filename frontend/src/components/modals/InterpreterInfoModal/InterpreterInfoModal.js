import React from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Grid from '@material-ui/core/Grid';
import Rating from '@material-ui/lab/Rating';

import classes from './InterpreterInfoModal.module.css';

const InterpreterInfoModal = (props) => {
    const [open, setOpen] = React.useState(true);
    const languages = props.languages.map(lang => <div className={classes.language}>{lang.language}: {lang.fluency} </div>)

    return (
        <div>
            <div className={classes.moreInfo} onClick={() => setOpen(true)}>more info</div>

            <Modal className={classes.Modal}
                open={open}
                onClose={() => setOpen(false)}
                BackdropComponent={Backdrop}
                BackdropProps={{ timeout: 200 }}>
                <Fade in={open}>
                    <div className={classes.infoCard}>
                        <Grid container spacing={2} justify='center'>
                            <Grid item xs={5} sm={5}>
                                <div className={classes.avatar}>
                                    <img src={props.avatar} width='100%' />
                                </div>
                            </Grid>

                            <Grid item xs={7} sm={7}>
                                <div className={classes.title}>Your Interpreter</div>
                                <div className={classes.name}>{props.name}</div>
                                <div className={classes.infoItem}>
                                    <Rating value={3} readOnly />
                                </div>
                                <div className={classes.infoItem}>
                                    <div>Email:</div>
                                    <div>{props.email}</div>
                                </div>
                                <div className={classes.infoItem}>
                                    <div>Location:</div>
                                    <div>{props.location}</div>
                                </div>
                                <div className={classes.infoItem}>
                                    <div>Languages:
                                        <div>{languages}</div>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>

                        <div className={classes.horzLine} />

                        <Grid container spacing={2} justify='center'>
                            <Grid item xs={6}>
                                <div className={classes.title}>Certifications:</div>
                            </Grid>

                            <Grid item xs={6}>
                                <div className={classes.title}>Reviews:</div>
                            </Grid>
                        </Grid>
                    </div>
                </Fade>
            </Modal>
        </div >
    );
}

export default InterpreterInfoModal;
