import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@mui/material/TextField'
import MuiDatePicker from '@mui/lab/DatePicker'
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
      <Grid
        item
        xs={12}
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: 20
        }}
      >
        <IconButton>
          <ArrowBackIosIcon
            onClick={() => handleClick(-1)}
            color="primary"
          />
        </IconButton>
        <MuiDatePicker
          renderInput={
            props => <TextField {...props} label="Selected Date" />
          }
          onChange={handleDateChange}
          value={selectedDate}
        />
        <IconButton>
          <ArrowForwardIosIcon
            onClick={() => handleClick(1)}
            color="primary"
          />
        </IconButton>
      </Grid>
  );
}
