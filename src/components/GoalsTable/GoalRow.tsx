import React from 'react'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import TaskRow from './TaskRow'

function GoalRow(props: any) {
  const { goal } = props
  const { title: goalTitle } = goal
  const { tasks } = goal

  return (
    <>
      <TableRow sx={{ backgroundColor: 'lightgray' }}>
        <TableCell
          colSpan={2}
          sx={{ textAlign: 'center', fontSize: '1.25rem' }}
        >
          {goalTitle}
        </TableCell>
      </TableRow>
      {tasks.map((task: any) => (
        <TaskRow task={task} key={task._id} />
      ))}
    </>
  )
}

export default GoalRow
