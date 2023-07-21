
// Save the cart items to localStorage
export const saveCartItems = (cartItems) => {
    try {
      const storageCartItems = JSON.stringify(cartItems);
      localStorage.setItem('cart', storageCartItems);
    } catch (error) {
      console.error('Error saving cart items to localStorage:', error);
    }
  };
  
  // Get the cart items from localStorage
  export const getCartItems = () => {
    try {
      const storageCartItems = localStorage.getItem('cart');
      if (storageCartItems === null) {
        // if cart is empty, return [];
        return [];
      }
      return JSON.parse(storageCartItems);
    } catch (error) {
      console.error('Error getting cart items from localStorage:', error);
      // if get error, return [];
      return [];
    }
  };
  
  // Increase the quantity of a cart item in localStorage
  export const increaseCartItem = (productId) => {
    const cartItems = getCartItems();
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === productId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    saveCartItems(updatedCartItems);
  };
  
  // Decrease the quantity of a cart item in localStorage
  export const decreaseCartItem = (productId) => {
    const cartItems = getCartItems();
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === productId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    saveCartItems(updatedCartItems);
  };
  
  