import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import CategoryService, { Category } from '../services/CategoryService';

const initialCategory: Category = {
    id: "",
    name: "",
}
type State = "loading" | "completed" | "failed"


const initialState = {
    category: initialCategory,
    status: "loading" as State,
    addingStatus: "completed" as State
};

export const getCategoryAsync = createAsyncThunk(
    'category/get',
    (id: string) => {
        return CategoryService.get(id);
    }
);


export const categorySlice = createSlice({
    name: 'category',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        modify: (state, action: PayloadAction<Category>) => {
            state.category = action.payload;
        },
        refresh: (state) => {
            getCategoryAsync(state.category.id)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCategoryAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getCategoryAsync.fulfilled, (state, action: PayloadAction<Category>) => {
                state.status = 'completed';
                state.category = action.payload;
            })
            .addCase(getCategoryAsync.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export const { modify } = categorySlice.actions;

export default categorySlice.reducer;
