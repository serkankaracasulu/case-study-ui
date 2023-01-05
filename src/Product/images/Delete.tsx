import React from "react";

import PhotoCamera from '@mui/icons-material/DeleteForever';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import LoadingButton from '@mui/lab/LoadingButton';

import { deleteProductImageAsync } from "../../redux/productImagesSlice";
import { ProductImage } from "../../services/ProductImageService";

interface ImageDeleteButtonProps {
    image: ProductImage
}

export default function ImageDeleteButton(props: ImageDeleteButtonProps) {
    const dispatch = useAppDispatch();
    const status = useAppSelector(s => s.productImages.deletingStatus);
    const handleDelete = () => {
        dispatch(deleteProductImageAsync(props.image.id))
    }
    return (
        <LoadingButton sx={{ position: "absolute", top: (t) => t.spacing(2), right: (t) => t.spacing(2), }} onClick={handleDelete} disabled={status === "loading"} loading={status === "loading"} aria-label="upload picture" component="label" startIcon={<PhotoCamera />} color="secondary">
            <span style={{ textShadow: "2px 2px 4px white" }}>{"DELETE"}</span>
        </LoadingButton>
    );
}