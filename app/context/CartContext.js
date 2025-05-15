'use client';
import { createContext, useContext, useState, useEffect } from 'react';

//used createContext hook to create a context for the cart
//useContext hook to access context in other components
//useState to manage state of cart items
const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);

    //load the cart from local storage once page mounted
    useEffect(() => {
        const stored = localStorage.getItem('cart');
        if (stored) {
            setCartItems(JSON.parse(stored));
        }
    }, []);

    //save the cart to local storage
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    //addToCart function to add items to cart
    const addToCart = (prod) => {
        //check if there is a product
        if (!prod || typeof prod !== 'object' || !prod.id) {
            console.error('addToCart received invalid product:', prod);
            return;
        }

        setCartItems((pre) => {
            //checs if the product is already in cart
            const existing = pre.find((item) => item.id === prod.id);

            //if the product exists, map though the cart then increase its quantity by 1 & leave other products as they are
            //if not then add the product to the cart with quantity = 1
            if (existing) {
                return pre.map((item) =>
                    item.id === prod.id ? { ...item, quantity: item.quantity + 1 } : item,
                );
            }
            return [...pre, { ...prod, quantity: 1 }];
        });
    };

    //update quantity function to update the quantity of item in the cart
    const updateQuantity = (id, newQuantity) => {
        //check if quantity is less than 1 and return to prevent 0 or negative
        if (newQuantity < 1) return;
        //setCartItems map through the cart and update the quantity of item with the given id and leave other items as they are
        setCartItems((prev) =>
            prev.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)),
        );
    };

    const removeFromCart = (id) => {
        //setCartItems filter through the cart and remove the item with the given id
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    //clears/removes all items in the cart and removes the cart from localStorage
    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('cart');
    };

    //CartContext.Provider used to pass in the cart items and addToCart function to child elemeents
    return (
        <CartContext.Provider
            value={{ cartItems, addToCart, updateQuantity, removeFromCart, clearCart }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
