import React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MuiDatePicker from '@mui/lab/DatePicker';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import IconButton from '@mui/material/IconButton';

export default function DatePicker(props: any) {
  const {
    date, onChange, onDateIncrement, onDateDecrement,
  } = props;
  const selectedDate = date;

  const handleDateChange = (newDate: Date) => {
    onChange(newDate);
  };

  return (
    <Grid
      item
      xs={12}
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: 20,
      }}
    >
      <IconButton
        onClick={onDateDecrement}
      >
        <ArrowBackIosIcon
          color="primary"
        />
      </IconButton>
      <MuiDatePicker
        renderInput={
            /* eslint-disable-next-line react/jsx-props-no-spreading */
            (inputProps: any) => <TextField {...inputProps} label="Selected Date" />
        }
        onChange={(e: any) => handleDateChange(e.target.value)}
        value={selectedDate}
      />
      <IconButton
        onClick={onDateIncrement}
      >
        <ArrowForwardIosIcon
          color="primary"
        />
      </IconButton>
    </Grid>
  );
}
