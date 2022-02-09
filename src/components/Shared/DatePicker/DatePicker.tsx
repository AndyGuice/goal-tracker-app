import React, { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import MuiDatePicker from '@mui/lab/DatePicker'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { addDays } from 'date-fns'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme: any) => ({
  paper: {
    padding: theme.spacing(1),
    display: 'flex',
  }
}))

export default function DatePicker(props: any) {
  const {
    date, onChange, today
  } = props

  const [disableDayIncrement, setDisableDayIncrement] = useState(false)
  const selectedDate = date
  const classes = useStyles()

  const handleUpdate = (newDate: Date) => {
    onChange(newDate)
  }

  const handleDateChange = (adjAmount: number) => {
    const newDate = addDays(selectedDate, adjAmount)
    onChange(newDate)
  }

  useEffect(() => {
    if (date.toLocaleDateString() === today.toLocaleDateString()) {
      setDisableDayIncrement(true)
    } else {
      setDisableDayIncrement(false)
    }
  }, [date])

  return (
    <Grid
      item
      xs={12}
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Paper className={classes.paper}>
        <IconButton
          id="Decrement date button"
          aria-label="Decrement date button"
          color="primary"
          onClick={() => handleDateChange(-1)}
        >
          <ArrowBackIosIcon />
        </IconButton>
        <MuiDatePicker
          renderInput={
            /* eslint-disable-next-line react/jsx-props-no-spreading */
            (inputProps: any) => <TextField {...inputProps} label="Selected Date" />
          }
          onChange={(e: any) => handleUpdate(e)}
          value={selectedDate}
          maxDate={today}
        />
        <IconButton
          id="Increment date button"
          aria-label="Increment date button"
          disabled={disableDayIncrement}
          color="primary"
          onClick={() => handleDateChange(1)}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Paper>
    </Grid>
  )
}
