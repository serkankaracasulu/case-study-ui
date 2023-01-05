import React from "react";

import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import LoadingButton from '@mui/lab/LoadingButton';

import { addProductImageAsync } from "../../redux/productImagesSlice";

export default function ImageAddButton() {
    const fileRef = React.useRef<HTMLInputElement>(null);
    const dispatch = useAppDispatch();
    const status = useAppSelector(s => s.productImages.addingStatus);

    return (
        <LoadingButton disabled={status === "loading"} loading={status === "loading"} aria-label="upload picture" component="label" startIcon={<PhotoCamera />}>
            <input hidden required ref={fileRef} type='file' name="image" onChange={e => {
                if (e.target.files) {
                    const file = e.target.files[0];
                    if (file)
                        dispatch(addProductImageAsync({ file }))
                }

            }} accept=".jpg,.jpeg" />
            {"Add"}
        </LoadingButton>
    );
}