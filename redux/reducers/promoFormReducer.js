import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { writeListing } from '../../api';

const defaultForm = {
  pieceType: 'SINGLE',
  name: 'Test Name',
  description: 'Test description bla bla bla. This is a sentence.',
  image: null,
  marketplace: 'OpenSea',
  url: 'opensea.io', // landing page or marketplace url
  twitterHandle: 'mirros_nft',
  displayDate: new Date(),
  media: null,
  blockchain: 'Ethereum',
  price: '15',
  dateAvailable: new Date(),
  supply: 1,
};

export const submitForm = createAsyncThunk(
  'promoForm/submitForm',
  async ({ formData }) => {
    const response = await writeListing(formData);
    return response;
  },
);

const promoFormReducer = createSlice({
  name: 'promoForm',
  initialState: {
    formData: { ...defaultForm },
    status: 'idle',
    error: null,
  },
  reducers: {
    setFormData: (state, action) => {
      return {
        ...state,
        formData: action.payload,
      };
    },
    clearForm: (state) => {
      return {
        ...state,
        formData: { ...defaultForm },
      }
    },
  },
  // extraReducers: {
  //   [fetchWeekMoods.pending]: (state, action) => {
  //     state.status = 'loading';
  //   },
  //   [fetchWeekMoods.fulfilled]: (state, action) => {
  //     return {
  //       ...state,
  //       status: 'idle',
  //       weekMoods: action.payload,
  //     };
  //   },
  //   [fetchWeekMoods.rejected]: (state, action) => {
  //     state.status = 'failed';
  //     state.error = action.error.message;
  //   },
  // },
});

export const { setFormData, clearForm } = promoFormReducer.actions;

export default promoFormReducer.reducer;