import React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import GoalRow from './GoalRow'

function GoalsTable(props: any) {
  const { goals } = props

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableBody>
          {goals.map((goal: any) => (
            <GoalRow goal={goal} key={goal._id} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default GoalsTable
