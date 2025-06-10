import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

const toastConfig = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
    style: {
        background: 'rgba(0, 0, 0, 0.8)',
        borderRadius: '10px',
        padding: '16px',
        color: 'green',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
    }
};

export const CartProvider = ({ children }) => {
    // Initialize with an empty cart
    const [cart, setCart] = useState([]);

    // Load cart from localStorage when component mounts
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product, quantity = 1) => {
        console.log('Adding to cart:', product);
        const cartItem = {
            id: product.id,
            name: product.name,
            price: Number(product.price) || 0,
            quantity: quantity,
            image: product.image,
            description: product.description
        };
        setCart(prevCart => {
            let updatedCart;
            const existingItem = prevCart.find(item => item.id === product.id);
            if (existingItem) {
                toast.info(
                    <div>
                        <strong>{product.name}</strong>
                        <br />
                        Quantity updated to {existingItem.quantity + quantity}
                    </div>,
                    toastConfig
                );
                updatedCart = prevCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                toast.success(
                    <div>
                        <strong>{product.name}</strong>
                        <br />
                        Added to cart
                    </div>,
                    toastConfig
                );
                updatedCart = [...prevCart, cartItem];
            }
            return updatedCart;
        });
    };

    const removeFromCart = (productId, removeAll = false) => {
        setCart(prevCart => {
            let updatedCart;
            const itemToRemove = prevCart.find(item => item.id === productId);
            if (itemToRemove) {
                if (removeAll || itemToRemove.quantity === 1) {
                    toast.error(
                        <div>
                            <strong>{itemToRemove.name}</strong>
                            <br />
                            Removed from cart
                        </div>,
                        toastConfig
                    );
                    updatedCart = prevCart.filter(item => item.id !== productId);
                } else {
                    const newQuantity = itemToRemove.quantity - 1;
                    toast.info(
                        <div>
                            <strong>{itemToRemove.name}</strong>
                            <br />
                            Quantity updated to {newQuantity}
                        </div>,
                        toastConfig
                    );
                    updatedCart = prevCart.map(item =>
                        item.id === productId ? { ...item, quantity: newQuantity } : item
                    );
                }
            } else {
                updatedCart = prevCart; // If item not found, return previous cart unchanged
            }
            return updatedCart;
        });
    };

    const updateQuantity = (productId, newQuantity) => {
        setCart(prevCart => {
            let updatedCart;
            if (newQuantity <= 0) {
                const itemToRemove = prevCart.find(item => item.id === productId);
                if (itemToRemove) {
                    toast.error(
                        <div>
                            <strong>{itemToRemove.name}</strong>
                            <br />
                            Removed from cart
                        </div>,
                        toastConfig
                    );
                }
                updatedCart = prevCart.filter(item => item.id !== productId);
            } else {
                updatedCart = prevCart.map(item =>
                    item.id === productId
                        ? { ...item, quantity: newQuantity }
                        : item
                );
            }
            return updatedCart;
        });
    };

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem('cart');
        toast.info(
            <div>
                <strong>Cart Cleared</strong>
                <br />
                All items have been removed
            </div>,
            toastConfig
        );
    };

    const getCartTotal = () => {
        return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    };

    const getCartCount = () => {
        return cart.reduce((count, item) => count + item.quantity, 0);
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                getCartTotal,
                getCartCount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}; 