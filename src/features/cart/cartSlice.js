import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import cartItems from '../../cartItems';
const url = 'http://course-api.com/react-useReducer-cart-project';

const initialState = {
      cartItems: [],
      amount: 0,
      total: 0,
      isLoading: true,
};


export const getCartItems = createAsyncThunk('cart/getCartItems', async (name, thunkAPI) => {
      try {
            console.log(thunkAPI);

            const res = await axios(url);
            console.log(res);

            return res;
      } catch (error) {
            return thunkAPI.rejectWithValue('something went wrong');
      }

});

const cartSlice = createSlice({
      name: 'cart',
      initialState,
      reducers: {
            clearCart: (state) => {
                  state.cartItems = [];
            },
            removeItem: (state, action) => {
                  const itemId = action.payload;
                  state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
            },
            increase: (state, { payload }) => {
                  const cartItem = state.cartItems.find((item) => item.id === payload);
                  cartItem.amount = cartItem.amount + 1;
            },
            decrease: (state, { payload }) => {
                  const cartItem = state.cartItems.find((item) => item.id === payload);
                  cartItem.amount = cartItem.amount - 1;
            },
            calculateTotals: (state) => {
                  let amount = 0;
                  let total = 0;
                  state.cartItems.forEach((item) => {
                        amount += item.amount;
                        total += item.amount * item.price;
                  });
                  state.amount = amount;
                  state.total = total;
            },

      },
      extraReducers: {
            [getCartItems.pending]: (state, action) => {
                  state.isLoading = true;
            },
            [getCartItems.fulfilled]: (state, action) => {
                  state.isLoading = false;
                  state.cartItems = action.payload || cartItems;
            },
            [getCartItems.rejected]: (state, action) => {
                  state.isLoading = false;
            },
      }
});

export const {
      clearCart,
      removeItem,
      increase,
      decrease,
      calculateTotals,

} = cartSlice.actions;

export default cartSlice.reducer;