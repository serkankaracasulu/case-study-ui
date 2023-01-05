import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import CategoryService, { Category } from '../services/CategoryService';
import ProductService from '../services/ProductService';
import { PaginatedList } from '../types';

type State = "loading" | "completed" | "failed"
interface CategoriesState {
    data: PaginatedList<Category>
    status: State
    addingStatus: State
    deletingStatus: State
}

const initialState: CategoriesState = {
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

export const getCategoriesAsync = createAsyncThunk(
    'categories/get',
    (param: { id?: string, pageNumber: number, pageSize: number }, getThunkApi) => {
        let { id, pageNumber, pageSize } = param;
        const state = getThunkApi.getState() as RootState
        id ??= state.product.product.id || window.location.href.split("/")[4];
        return ProductService.categories(id, pageNumber, pageSize);
    }
);


export const addCategoryAsync = createAsyncThunk(
    'categories/add',
    (param: { productId?: string, name: string }, getThunkApi) => {
        const state = getThunkApi.getState() as RootState
        param.productId ??= state.product.product.id || window.location.href.split("/")[4];
        return CategoryService.add(param.productId || state.product.product.id, param.name).then(result => {
            const pageSize = new URLSearchParams(window.location.href).get("pageSize");
            getThunkApi.dispatch(getCategoriesAsync({
                id: state.product.product.id,
                pageNumber: state.categories.data.pageNumber,
                pageSize: pageSize ? +pageSize : 10
            }));
            return result;
        });
    }
);

export const deleteCategoryAsync = createAsyncThunk(
    'categories/delete',
    (id: string, getThunkApi) => {
        const state = getThunkApi.getState() as RootState
        return CategoryService.delete(id).then(result => {
            const pageSize = new URLSearchParams(window.location.href).get("pageSize");
            getThunkApi.dispatch(getCategoriesAsync({
                id: state.product.product.id,
                pageNumber: state.categories.data.pageNumber,
                pageSize: pageSize ? +pageSize : 10
            }));
            return result;
        });
    }
);


export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        modify: (state, action: PayloadAction<PaginatedList<Category>>) => {
            state.data = action.payload;
        },
        clear: (state) => {
            state.data = initialState.data;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCategoriesAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getCategoriesAsync.fulfilled, (state, action: PayloadAction<PaginatedList<Category>>) => {
                state.addingStatus = 'completed';
                state.data = action.payload;
            })
            .addCase(getCategoriesAsync.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(addCategoryAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addCategoryAsync.fulfilled, (state) => {
                state.addingStatus = 'completed';
            })
            .addCase(addCategoryAsync.rejected, (state) => {
                state.addingStatus = 'failed';
            })
            .addCase(deleteCategoryAsync.pending, (state) => {
                state.deletingStatus = 'loading';
            })
            .addCase(deleteCategoryAsync.fulfilled, (state) => {
                state.deletingStatus = 'completed';
            })
            .addCase(deleteCategoryAsync.rejected, (state) => {
                state.deletingStatus = 'failed';
            });
    },
});

export const { modify, clear } = categoriesSlice.actions;

export default categoriesSlice.reducer;
