import React, { useState, useEffect } from 'react'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import LinearProgress from '@mui/material/LinearProgress'
import { getMonth, getDate } from 'date-fns'

function TaskRow(props: any) {
  const { task } = props
  const { datesCompleted } = task

  const [monthlyCount, setMonthlyCount] = useState(0)

  const today = new Date()
  const currentDay = getDate(today)
  const currentMonth = getMonth(today)

  const getMonthlyCompletion = () => {
    let count = 0

    datesCompleted.forEach((date: any) => {
      if (getMonth(new Date(date)) === currentMonth) {
        count++
      }
    })

    return count
  }

  const calculateLinearValue = () => {
    return (monthlyCount / currentDay) * 100
  }

  useEffect(() => {
    setMonthlyCount(getMonthlyCompletion())
  }, [])

  return (
    <TableRow
      key={task._id}
    >
      <TableCell component="th" scope="row">
        {task.title}
      </TableCell>
      <TableCell>
        <LinearProgress
          variant="determinate"
          color="primary"
          value={calculateLinearValue()}
        />
      </TableCell>
    </TableRow>
  )
}

export default TaskRow
