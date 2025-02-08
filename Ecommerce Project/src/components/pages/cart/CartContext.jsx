import { useReducer, createContext, useContext, useEffect } from "react";

const CartContext = createContext();

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const updatedCart = [...state.cartItems, action.payload];
      localStorage.setItem("cartItems", JSON.stringify(updatedCart)); // Save updated cart to localStorage
      return {
        ...state,
        cartItems: updatedCart,
      };
    case "UPDATE_CART":
      return { ...state, cartItems: action.payload };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ cartState: state, cartDispatch: dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
