import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import React from 'react';
import { FormEventHandler } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addCategoryAsync } from '../../redux/categoriesSlice';
import { DialogProps } from '../../types';

interface CategoryCreateDialogProps extends DialogProps {

}

export default function CategoryCreateDialog(props: CategoryCreateDialogProps) {
  const { open, handleOpen } = props;
  const nameRef = React.useRef<HTMLInputElement>(null);
  const addingStatus = useAppSelector(s => s.categories.addingStatus)
  const dispatch = useAppDispatch();
  const handleSubmit: FormEventHandler<any> = (e) => {
    e.preventDefault();
    dispatch(addCategoryAsync({ name: nameRef.current!.value }));
  }
  return (
    <Dialog open={open} onClose={handleOpen}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Add Category</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            name="name"
            fullWidth
            inputRef={nameRef}
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOpen}>Cancel</Button>
          <LoadingButton loading={addingStatus === "loading"} disabled={addingStatus === "loading"} type='submit' >Create</LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
}