import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const WishlistContext = createContext();

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error('useWishlist must be used within a WishlistProvider');
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

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState(() => {
        const savedWishlist = localStorage.getItem('wishlist');
        return savedWishlist ? JSON.parse(savedWishlist) : [];
    });

    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    const addToWishlist = (product) => {
        setWishlist(prevWishlist => {
            if (prevWishlist.some(item => item.id === product.id)) {
                toast.info(
                    <div>
                        <strong>{product.name}</strong>
                        <br />
                        Already in your wishlist
                    </div>,
                    toastConfig
                );
                return prevWishlist;
            }
            toast.success(
                <div>
                    <strong>{product.name}</strong>
                    <br />
                    Added to wishlist
                </div>,
                toastConfig
            );
            return [...prevWishlist, product];
        });
    };

    const removeFromWishlist = (productId) => {
        setWishlist(prevWishlist => {
            const product = prevWishlist.find(item => item.id === productId);
            if (product) {
                toast.error(
                    <div>
                        <strong>{product.name}</strong>
                        <br />
                        Removed from wishlist
                    </div>,
                    toastConfig
                );
            }
            return prevWishlist.filter(item => item.id !== productId);
        });
    };

    const clearWishlist = () => {
        setWishlist([]);
        toast.info(
            <div>
                <strong>Wishlist Cleared</strong>
                <br />
                All items have been removed
            </div>,
            toastConfig
        );
    };

    const isInWishlist = (productId) => {
        return wishlist.some(item => item.id === productId);
    };

    const getWishlistCount = () => {
        return wishlist.length;
    };

    return (
        <WishlistContext.Provider
            value={{
                wishlist,
                addToWishlist,
                removeFromWishlist,
                clearWishlist,
                isInWishlist,
                getWishlistCount,
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
}; 