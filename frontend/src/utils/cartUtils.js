export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  //CalculateItem Price
  state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  //Calculate Shipping Price (If order is over )
  state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

  //Calculate Tax Price (18% Tax)
  state.taxPrice = addDecimals(Number((0.18 * state.itemsPrice).toFixed(2)));

  //Calculate Total Price
  state.totalPrice = (Number(state.itemsPrice) + Number(state.shippingPrice) + Number(state.taxPrice)).toFixed(2);

  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
