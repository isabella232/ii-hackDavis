import React, { Component } from 'react';
import { withSnackbar } from 'notistack';

import classes from './css/EventCard.module.css';

import Button from './Button';
import DeleteModal from './DoubleCheckModal';
import EventModal from '../AdminPage/EventModal';
import Paper from '../shared/Paper';

import { deleteEvent, archiveEvent } from '../../services/AdminService';

class EventCard extends Component {
    constructor(props) {
        super();

        this.clickDelete = this.clickDelete.bind(this);
        this.archive = this.archive.bind(this);
    }

    clickDelete = () => {
        deleteEvent(this.props.id)
            .then(data => {
                this.props.loadEvents();
            })
            .catch(e => this.props.enqueueSnackbar("Event cannot be deleted at this time.", { variant: 'error' }))
    }

    archive = () => {
        archiveEvent(this.props.id)
            .then(data => {
                this.props.loadEvents();
                this.props.loadEventArchive();
            }).catch(error => {
                this.props.enqueueSnackbar("Event cannot be archived at this time.", { variant: 'error' })
            });
    }

    pad0 = (num) => {
        return num.toString().padStart(2, "0")
    }

    render() {
        const date = new Date(this.props.date);
        const parsedDate = `${this.pad0(date.getMonth() + 1)}/${this.pad0(date.getDate())}/${this.pad0(date.getFullYear())}`;
        const parsedTime = `${this.pad0(date.getHours())}:${this.pad0(date.getMinutes())}`;
        const doubleCheckContent = `Are You Sure You Want To Delete ${this.props.title}?`;

        return (
            <div className={classes.EventCard}>
                <Paper>
                    <div className={this.props.past ? classes.past : null}>
                        <div className={classes.header}>
                            <div className={classes.eventTitle}>{this.props.title}</div>
                            <div className={classes.dateLocation}>
                                <div className={classes.date}>{parsedDate} at {parsedTime}</div>
                                <div className={classes.location}>{this.props.location}</div>
                            </div>
                        </div>
                        <p>{this.props.summary}</p>
                        <img src={this.props.image} alt={`${this.props.title} on ${parsedDate} at ${parsedTime}`} width={'100%'} />
                        {this.props.target ?
                            <div className={classes.footer}>
                                <div className={classes.note}>
                                    {`For ${this.props.target}.`}
                                    <br></br>
                                    {`Lasted Updated By ${this.props.author}.`}
                                </div>
                                <div className={classes.buttons}>
                                    {(this.props.target && this.props.past) ? (
                                        <Button content={'Archive'} inverted click={this.archive} />
                                    ) : null}
                                    {!this.props.past ? (
                                        <>
                                            <DeleteModal content={doubleCheckContent} clickDelete={this.clickDelete} />
                                            <EventModal edit
                                                id={this.props.id}
                                                title={this.props.title}
                                                date={this.props.date}
                                                summary={this.props.summary}
                                                location={this.props.location}
                                                image={this.props.image}
                                                reloadData={this.props.loadEvents}
                                                target={this.props.target} />
                                        </>
                                    ) : null}
                                </div>
                            </div> : null}
                    </div>
                </Paper>
            </div>
        )
    }

}

export default withSnackbar(EventCard);

