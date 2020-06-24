import React, { Component } from 'react';
import classes from './EventCard.module.css';

import EventModal from '../EventModal/EventModal';
import DeleteModal from '../../shared/DoubleCheckModal/DoubleCheckModal';

import { deleteEvent } from '../../../services/AdminService';

class EventCard extends Component {
    constructor(props) {
        super();

        this.clickDelete = this.clickDelete.bind(this);
    }

    clickDelete = () => {
        deleteEvent(this.props.id)
            .then(data => {
                this.props.reloadData();
            })
            .catch(e => console.log(e))
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
                    <div className={classes.footer}>
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
                </div>
            </div>
        )
    }

}

export default EventCard;

