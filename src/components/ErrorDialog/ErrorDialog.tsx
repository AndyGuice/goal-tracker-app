import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'

const ErrorDialog = (props) => {
  const { open, error } = props

  return (
    <Dialog
      open={open}
    >
      <DialogTitle>Error</DialogTitle>
      {error}
    </Dialog>
  )
}

export default ErrorDialog
