import { LinearProgress } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import React from 'react';
import { FormEventHandler } from 'react';
import ProductService from '../services/ProductService';
import { DialogProps } from '../types';

interface ProductCreateDialogProps extends DialogProps {
  onComplete: VoidFunction
}

export default function ProductCreateDialog(props: ProductCreateDialogProps) {
  const { open, handleOpen } = props;
  const nameRef = React.useRef<HTMLInputElement>(null);
  const [adding, setAdding] = React.useState(false);
  const descRef = React.useRef<HTMLInputElement>(null);
  const handleSubmit: FormEventHandler<any> = (e) => {
    e.preventDefault();
    setAdding(true);
    ProductService.add({ name: nameRef.current!.value, description: descRef.current!.value }).finally(() => setAdding(false)).then(props.onComplete);
  }
  return (
    <Dialog open={open} onClose={handleOpen}>
      {adding && <LinearProgress />}
      <form onSubmit={handleSubmit}>
        <DialogTitle>Add Product</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            name="name"
            fullWidth
            inputRef={nameRef}
            variant="standard"
            required
          />
          <TextField
            required
            autoFocus
            margin="dense"
            label="Description"
            name="description"
            fullWidth
            inputRef={descRef}
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOpen}>Cancel</Button>
          <Button type='submit' disabled={adding}>Create</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}