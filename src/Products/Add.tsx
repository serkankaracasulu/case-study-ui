import * as React from "react";

import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import ProductCreateDialog from './CreateDialog';

interface ProductAddButtonProps {
    onComplete: VoidFunction
}

export default function ProductAddButton(props: ProductAddButtonProps) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(!open);
    return (<>
        <Button variant="contained" endIcon={<AddIcon />} onClick={handleOpen}>
            Add
        </Button>
        <ProductCreateDialog onComplete={props.onComplete} open={open} handleOpen={handleOpen} />
    </>
    );
}