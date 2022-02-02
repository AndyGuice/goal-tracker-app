import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import IconButton from '@material-ui/core/IconButton';
import { addDays } from 'date-fns';

export default function DatePicker(props: any) {
  const { date, onChange } = props;

  let selectedDate = date;

  const handleDateChange = (newDate: Date) => {
    onChange(newDate);
  };

  const handleClick = (dateAdjustment: number) => {
    const newDate = addDays(date, dateAdjustment);
    onChange(newDate);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid xs={12} style={{ display: 'flex', justifyContent: 'center', padding: 5 }}>
        <IconButton>
          <ArrowBackIosIcon
            onClick={() => handleClick(-1)}
            color="primary"
          />
        </IconButton>
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
          size="small"
        />
        <IconButton>
          <ArrowForwardIosIcon
            onClick={() => handleClick(1)}
            color="primary"
          />
        </IconButton>
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
