import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import ProductImageService, { ProductImage } from '../services/ProductImageService';
import ProductService from '../services/ProductService';
import { PaginatedList } from '../types';

type State = "loading" | "completed" | "failed"
interface ProductImagesState {
    data: PaginatedList<ProductImage>
    status: State
    addingStatus: State
    deletingStatus: State
    selectedImage?: ProductImage
}

const initialState: ProductImagesState = {
    data: {
        items: [],
        pageNumber: 0,
        totalPages: 0,
        totalCount: 0,
        hasNextPage: false,
        hasPreviousPage: false
    },
    addingStatus: "completed",
    deletingStatus: "completed",
    status: "loading"
};

export const getProductImagesAsync = createAsyncThunk(
    'productImages/get',
    (param: { id?: string, pageNumber: number, pageSize: number }, getThunkApi) => {
        let { id, pageNumber, pageSize } = param;
        const state = getThunkApi.getState() as RootState
        id ??= state.product.product.id || window.location.href.split("/")[4];
        return ProductService.images(id, pageNumber, pageSize);
    }
);


export const addProductImageAsync = createAsyncThunk(
    'productImages/add',
    (param: { productId?: string, file: File }, getThunkApi) => {
        const state = getThunkApi.getState() as RootState
        param.productId ??= state.product.product.id || window.location.href.split("/")[4];
        return ProductImageService.add(param.productId || state.product.product.id, param.file);
    }
);

export const deleteProductImageAsync = createAsyncThunk(
    'productImages/delete',
    (imageId: string, getThunkApi) => {
        return ProductImageService.delete(imageId)
    }
);


export const productImagesSlice = createSlice({
    name: 'productImages',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        select: (state, action: PayloadAction<ProductImage>) => {
            state.selectedImage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProductImagesAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getProductImagesAsync.fulfilled, (state, action: PayloadAction<PaginatedList<ProductImage>>) => {
                state.status = 'completed';
                state.data = action.payload;
                state.selectedImage = action.payload.items[0];
            })
            .addCase(getProductImagesAsync.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(addProductImageAsync.pending, (state) => {
                state.addingStatus = 'loading';
            })
            .addCase(addProductImageAsync.fulfilled, (state, action) => {
                state.addingStatus = 'completed';
                state.data.items.push(action.payload);
                state.data.totalCount += 1;
            })
            .addCase(addProductImageAsync.rejected, (state) => {
                state.addingStatus = 'failed';
            })
            .addCase(deleteProductImageAsync.pending, (state) => {
                state.deletingStatus = 'loading';
            })
            .addCase(deleteProductImageAsync.fulfilled, (state, action) => {
                state.deletingStatus = 'completed';
                state.data.items = state.data.items.filter(i => i.id !== action.payload);
                state.selectedImage = state.data.items[0];
                state.data.totalCount -= 1;
            })
            .addCase(deleteProductImageAsync.rejected, (state) => {
                state.deletingStatus = 'failed';
            });
    },
});

export const { select: selectImage } = productImagesSlice.actions;

export default productImagesSlice.reducer;
