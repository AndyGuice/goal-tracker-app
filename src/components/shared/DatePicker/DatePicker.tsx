import 'date-fns';
import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { addDays } from 'date-fns';
import useStyles from './styles';

export default function DatePicker() {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const classes = useStyles();

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
  };

  const handleClick = (dateAdjustment: number) => {
    const newDate = addDays(selectedDate, dateAdjustment);
    setSelectedDate(newDate);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justifyContent="center" alignItems="center">
        <ArrowBackIcon
          className={classes.button}
          onClick={() => handleClick(-1)}
        />
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker"
          label="Date picker"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <ArrowForwardIcon
          className={classes.button}
          onClick={() => handleClick(1)}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
