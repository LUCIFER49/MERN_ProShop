import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : { cartItems: [] }; //localStorage can only holds string in object format

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {      //state: current state of cart && action: any data in payload
      const item = action.payload;

      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) => x._id === existItem._id ? item : x);
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      return updateCart(state);

    },
  }, //it will contains all the functions(or actions) that are related to cart
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
