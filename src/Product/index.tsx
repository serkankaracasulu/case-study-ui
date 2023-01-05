import { CircularProgress, Divider } from "@mui/material";
import Container from "@mui/material/Container";
import Grid from '@mui/material/Grid/Grid';
import LinearProgress from "@mui/material/LinearProgress";
import Stack from "@mui/material/Stack/Stack";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getProductImagesAsync } from "../redux/productImagesSlice";
import { clear, getProductAsync, modify } from "../redux/productSlice";
import { clear as clearCategories } from "../redux/categoriesSlice";
import ProductCategoryList from "./categories";
import ProductImageList from "./images";
import ImageAddButton from "./images/Add";
import ProductActions from "./Actions";
import TextField from "@mui/material/TextField/TextField";
import ImageDeleteButton from "./images/Delete";

const ProductPage = () => {
    let { productId } = useParams();
    const dispatch = useAppDispatch();
    const { product, status } = useAppSelector(s => s.product);
    const { selectedImage, status: imageStatus } = useAppSelector(s => s.productImages);
    React.useEffect(() => {
        if (productId) {
            dispatch(getProductAsync(productId))
            dispatch(getProductImagesAsync({ id: productId, pageNumber: 0, pageSize: 1000 }))
        }
        return () => {
            dispatch(clear());
            dispatch(clearCategories());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {

        dispatch(modify({
            ...product, description: e.target.value
        }))
    }
    return <Container maxWidth="lg" sx={{ p: 2 }}>
        {status === "loading" && <LinearProgress />}
        <Grid container spacing={2}>
            <Grid container item md={6} sm={12} direction="row" spacing={2}>
                <Grid item xs={12} sx={{ overflow: "hidden", minWidth: 200, position: "relative" }}>
                    {imageStatus === "loading" ? <CircularProgress /> : selectedImage ? <img style={{ height: "400px" }} src={`data:image/jpeg;base64,${selectedImage.image}`} alt={product.name} height="100%" loading="lazy" /> : ""}
                    {selectedImage && <ImageDeleteButton image={selectedImage} />}
                </Grid>
                <Grid item xs={12} alignSelf="flex-start">
                    <ProductImageList />
                    <Divider />
                    <ImageAddButton />
                </Grid>
            </Grid>
            <Grid container item md={6} sm={12} flexDirection="column">
                <Stack spacing={2} alignItems="flex-start">
                    <Stack spacing={2} alignItems="flex-start">
                        <Typography variant="h5"> {product.name}</Typography>
                        <ProductCategoryList />
                    </Stack>
                    <TextField variant="outlined" onChange={handleChange} label={"description"} name="description" value={product.description} fullWidth multiline rows={6} sx={{ height: "100%" }} />
                </Stack>
            </Grid>
        </Grid>
        <ProductActions />
    </Container>
}
export default ProductPage;