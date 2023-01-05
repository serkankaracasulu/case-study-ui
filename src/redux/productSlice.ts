import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import ProductService, { Product } from '../services/ProductService';

const initialProduct: Product = {
    id: "",
    description: "",
    name: "",
}
type State = "loading" | "completed" | "failed"


const initialState = {
    product: initialProduct,
    status: "loading" as State
};

export const getProductAsync = createAsyncThunk(
    'product/get',
    (id: string) => {
        return ProductService.get(id);
    }
);

export const updateProductAsync = createAsyncThunk(
    'product/update',
    (_, getThunkApi) => {
        const state = getThunkApi.getState() as RootState
        return ProductService.update(state.product.product.id, state.product.product);
    }
);

export const deleteProductAsync = createAsyncThunk(
    'product/delete',
    (_, getThunkApi) => {
        const state = getThunkApi.getState() as RootState
        return ProductService.delete(state.product.product.id).then(() => {
            window.location.href = "/";
        });
    }
);

export const refreshProductAsync = createAsyncThunk(
    'product/refresh',
    (_, getThunkApi) => {
        const state = getThunkApi.getState() as RootState
        return getThunkApi.dispatch(getProductAsync(state.product.product.id))
    }
);

export const productSlice = createSlice({
    name: 'product',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        modify: (state, action: PayloadAction<Product>) => {
            state.product = action.payload;
        },
        clear: (state) => {
            state.product = initialProduct;
        },
        refresh: (state) => {
            getProductAsync(state.product.id)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProductAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getProductAsync.fulfilled, (state, action) => {
                state.status = 'completed';
                state.product = action.payload;
            })
            .addCase(getProductAsync.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(updateProductAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateProductAsync.fulfilled, (state, action) => {
                state.status = 'completed';
                state.product = action.payload;
            })
            .addCase(updateProductAsync.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(deleteProductAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteProductAsync.fulfilled, (state) => {
                state.status = 'completed';
                state.product = initialProduct;
            })
            .addCase(deleteProductAsync.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export const { modify, clear } = productSlice.actions;

export default productSlice.reducer;
