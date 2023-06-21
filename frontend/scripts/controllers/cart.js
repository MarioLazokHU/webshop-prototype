let cartItems = [];

export function addToCart(item) {
  const existingItemIndex = cartItems.findIndex(
    (cartItem) => cartItem.name === item.name
  );

  if (existingItemIndex !== -1) {
    const existingItem = cartItems[existingItemIndex];
    existingItem.amount += item.amount;
    existingItem.totalPrice += item.totalPrice;
  } else {
    cartItems.push(item);
  }
}

export function clearCartData() {
  cartItems = [];
}

export function getCartItems() {
  return cartItems;
}
