import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Typography,
    Box,
    Grid,
    Card,
    CardContent,
    Button,
    IconButton,
    Divider,
} from '@mui/material';
import { Add, Remove, Delete, ShoppingCart, Favorite, Search, Notifications } from '@mui/icons-material';
import { useCart } from '../contexts/CartContext';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
    const navigate = useNavigate();

    const handleUpdateQuantity = (itemId, change) => {
        const item = cart.find(i => i.id === itemId);
        if (item) {
            updateQuantity(itemId, item.quantity + change);
        }
    };

    const handleRemoveItem = (itemId) => {
        removeFromCart(itemId, true);
    };

    const calculateTotal = () => {
        return getCartTotal().toFixed(2);
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                <ShoppingCart sx={{ mr: 1 }} /> Shopping Cart
            </Typography>

            {cart.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                    <Typography variant="h6" color="text.secondary">
                        Your cart is empty
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2 }}
                        onClick={() => navigate('/products')}
                    >
                        Continue Shopping
                    </Button>
                </Box>
            ) : (
                <Grid container spacing={4}>
                    <Grid item xs={12} md={8}>
                        {cart.map((item) => (
                            <div key={item.id} className="cart-item">
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={12} sm={3}>
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="cart-item-image"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={9}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                                            <Box>
                                                <Typography variant="h6" sx={{ mb: 1, color: '#333333 !important' }}>{item.name}</Typography>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        mb: 1,
                                                        color: '#444444 !important',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        whiteSpace: 'nowrap',
                                                        width: '100%',
                                                        display: 'block'
                                                    }}
                                                >
                                                    {item.description.split('.')[0] + '.'}
                                                </Typography>
                                                <Typography variant="h6" color="#333333" sx={{ mb: 2 }}>
                                                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                                                </Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', border: 1, borderRadius: 1, borderColor: 'divider' }}>
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        disabled={item.quantity <= 1}
                                                        sx={{
                                                            color: item.quantity <= 1 ? 'grey !important' : 'black !important',
                                                        }}
                                                    >
                                                        <Remove />
                                                    </IconButton>

                                                    <Typography sx={{ px: 2, color: 'black !important' }}>
                                                        {item.quantity}
                                                    </Typography>

                                                    <IconButton
                                                        size="small"
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        sx={{
                                                            color: 'black !important',
                                                        }}
                                                    >
                                                        <Add />
                                                    </IconButton>
                                                </Box>
                                                <IconButton
                                                    color="error"
                                                    onClick={() => removeFromCart(item.id)}
                                                    sx={{ ml: 1 }}
                                                >
                                                    <Delete />
                                                </IconButton>
                                            </Box>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </div>
                        ))}
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card sx={{ position: 'sticky', top: '2rem' }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Order Summary
                                </Typography>
                                <Box sx={{ my: 2 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                        <Typography>Subtotal</Typography>
                                        <Typography>${getCartTotal().toFixed(2)}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                        <Typography>Shipping</Typography>
                                        <Typography>Free</Typography>
                                    </Box>
                                    <Divider sx={{ my: 2 }} />
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                        <Typography variant="h6">Total</Typography>
                                        <Typography variant="h6">${getCartTotal().toFixed(2)}</Typography>
                                    </Box>
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        size="large"
                                        onClick={() => navigate('/checkout')}
                                        sx={{
                                            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                                            boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)'
                                        }}
                                    >
                                        Proceed to Checkout
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            )}
        </Container>
    );
};

export default Cart;