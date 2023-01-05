import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import categoriesSlice from '../redux/categoriesSlice';
import categorySlice from '../redux/categorySlice';
import productImagesSlice from '../redux/productImagesSlice';
import productSlice from '../redux/productSlice';

export const store = configureStore({
  reducer: {
    product: productSlice,
    category: categorySlice,
    categories: categoriesSlice,
    productImages: productImagesSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
