import React from 'react'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import MuiDatePicker from '@mui/lab/DatePicker'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import IconButton from '@mui/material/IconButton'
import { addDays } from 'date-fns'

export default function DatePicker(props: any) {
  const {
    date, onChange,
  } = props
  const selectedDate = date

  const handleUpdate = (newDate: Date) => {
    onChange(newDate)
  }

  const handleDateChange = (adjAmount: number) => {
    const newDate = addDays(selectedDate, adjAmount)
    onChange(newDate)
  }

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
        onClick={() => handleDateChange(-1)}
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
        onChange={(e: any) => handleUpdate(e.target.value)}
        value={selectedDate}
      />
      <IconButton
        onClick={() => handleDateChange(1)}
      >
        <ArrowForwardIosIcon
          color="primary"
        />
      </IconButton>
    </Grid>
  )
}
