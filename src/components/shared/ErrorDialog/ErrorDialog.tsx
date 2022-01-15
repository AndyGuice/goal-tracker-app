import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import Typography from '@material-ui/core/Typography'

const ErrorDialog = (props: any) => {
  const { open, onClose, error } = props

  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>Error</DialogTitle>
      <Typography style={{ padding: 10 }}>
        Error: {error}
      </Typography>
    </Dialog>
  )
}

export default ErrorDialog
