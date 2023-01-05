import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectImage } from "../../redux/productImagesSlice";

export default function ProductImageList() {
  const productImagesState = useAppSelector((s) => s.productImages);
  const dispatch = useAppDispatch();
  const handleSelectImage = (image: import("../../services/ProductImageService").ProductImage) => {
    dispatch(selectImage(image))
  }

  return (
    <ImageList sx={{ width: "100%", height: 45, marginTop: 0 }} cols={9} rowHeight={45}>
      {productImagesState.data.items.map((item) => (
        <ImageListItem key={item.id}>
          <img
            style={{ cursor: "pointer" }}
            src={`data:image/jpeg;base64,${item.image}`}
            alt={"product"}
            onClick={() => handleSelectImage(item)}
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
