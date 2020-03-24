import React from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DateTimePicker as Picker } from '@material-ui/pickers';

const DateTimePicker = props => {
    const initialVal = (props.initialVal) ? (new Date(props.initialVal)) : null;
    const [selectedDate, setSelectedDate] = React.useState(initialVal);

    const changeDate = date => {
        setSelectedDate(date);
        props.pickDate(date)
    };

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Picker inputVariant="outlined"
                margin="dense"
                required
                fullWidth
                ampm={false}
                label="Date and Time"
                value={selectedDate}
                onChange={changeDate}
                disablePast
                format="HH:mm MM/dd/yyyy" />
        </MuiPickersUtilsProvider>
    );
}

export default DateTimePicker;
