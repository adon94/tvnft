import { configureStore } from '@reduxjs/toolkit';
import promoForm from './reducers/promoFormReducer';

export const store = configureStore({
  reducer: {
    promoForm,
  },
});