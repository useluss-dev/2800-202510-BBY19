'use client';
import { createContext, useContext, useState } from 'react';

//used createContext hook to create a context for the cart
//useContext hook to access context in other components
//useState to manage state of cart items
const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);

    return (
        <CartContext.Provider value={{ cartItems, setCartItems }}>{children}</CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
