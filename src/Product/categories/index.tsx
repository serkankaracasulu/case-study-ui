import * as React from "react";

import Box from "@mui/material/Box/Box";
import Chip from '@mui/material/Chip';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { deleteCategoryAsync, getCategoriesAsync } from "../../redux/categoriesSlice";
import CategoryCreateDialog from './CreateDialog';

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function ProductCategoryList() {
  const categoriesState = useAppSelector(s => s.categories);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(getCategoriesAsync({ pageNumber: 1, pageSize: 9999 }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

  const handleDelete = (categoryId: string) => {
    dispatch(deleteCategoryAsync(categoryId));
  }
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          listStyle: 'none',
          p: 0.5,
          m: 0,
        }}
        component="ul"
      >
        <ListItem >
          <Chip
            label={"Add"}
            disabled={categoriesState.deletingStatus === "loading"}
            onClick={handleOpen}
            icon={<AddIcon />}
            color="primary"
          />
        </ListItem>
        {categoriesState.data.items.map((category) => {
          return (
            <ListItem key={category.id}>
              <Chip
                label={category.name}
                onDelete={() => handleDelete(category.id)}
                disabled={categoriesState.deletingStatus === "loading"}
              />
            </ListItem>
          );
        })}
      </Box>
      <CategoryCreateDialog open={open} handleOpen={handleOpen} />
    </>
  );
}