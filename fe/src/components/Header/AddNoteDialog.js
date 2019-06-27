import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import Add from '@material-ui/icons/NoteAdd';

import { InputGroup } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <div>
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossorigin="anonymous"
      />
      <Button justIcon onClick={handleClickOpen}>
        <Add />
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Writting</DialogTitle>
        <DialogContent style={{width:"35rem", height:"50rem"}}>
          <div>
            <InputGroup>
              <FormControl as="textarea" aria-label="With textarea" rows="30" placeholder="Enter Here..." />
            </InputGroup>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="gray">
            Cancel
          </Button>
          <Button onClick={handleClose} color="gray">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}