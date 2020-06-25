import React, { Component } from 'react';
import classes from './EventCard.module.css';

import Button from '../../shared/Button/Button';
import DeleteModal from '../DoubleCheckModal/DoubleCheckModal';
import EventModal from '../../AdminPage/EventModal/EventModal';

import { deleteEvent, archiveEvent } from '../../../services/AdminService';

class EventCard extends Component {
    constructor(props) {
        super();

        this.clickDelete = this.clickDelete.bind(this);
        this.archive = this.archive.bind(this);
    }

    clickDelete = () => {
        deleteEvent(this.props.id)
            .then(data => {
                this.props.reloadData();
            })
            .catch(e => console.log(e))
    }

    archive = () => {
        archiveEvent(this.props.id)
            .then(data => {
                this.props.loadEvents();
                this.props.loadEventArchive();
            }).catch(error => {
                console.log(error);
            });
    }

    render() {
        const date = new Date(this.props.date);
        const parsedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
        const parsedTime = `${date.getHours()}:${date.getMinutes()}`;
        const doubleCheckContent = `Are You Sure You Want To Delete ${this.props.title}?`;

        return (
            <div className={classes.EventCard}>
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
                                {`This Event Is For ${this.props.target}.`}
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
                                            reloadData={this.props.reloadData}
                                            target={this.props.target} />
                                    </>
                                ) : null}
                            </div>
                        </div> : null}
                </div>
            </div>
        )
    }

}

export default EventCard;

