import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Slide from '@mui/material/Slide'
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ConfirmDialog = (props: any) => {
  const { open, onClose, object } = props;

  const handleClose = (confirmDelete: boolean) => {
    onClose(confirmDelete)
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      aria-describedby="confirm-action-dialog-box"
    >
      <DialogTitle>{'Confirm Delete'}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this {object}? This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
      <Button
        onClick={() => handleClose(false)}
        color="error"
        variant="contained"
        sx={{
          marginRight: 2
        }}
      >
        Cancel
      </Button>
        <Button
          onClick={() => handleClose(true)}
          color="success"
          variant="contained"
        >Confirm
      </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
