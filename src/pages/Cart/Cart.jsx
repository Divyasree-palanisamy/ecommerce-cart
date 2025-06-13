import React, { useEffect } from 'react';
import { useCart } from '../../contexts/CartContext';
import { Container, Box, Grid, Card, CardMedia, CardContent, Typography, IconButton, Button, Paper, Divider } from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingCartIcon, RemoveIcon, AddIcon, DeleteIcon } from '../../icons';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.5,
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
        },
    };

    const handleQuantityChange = (productId, currentQuantity, change) => {
        const newQuantity = currentQuantity + change;
        if (newQuantity >= 1) {
            updateQuantity(productId, newQuantity);
        } else {
            removeFromCart(productId, true);
        }
    };

    const handleRemoveItem = (productId) => {
        removeFromCart(productId, true);
    };

    if (cart.length === 0) {
        return (
            <Container maxWidth="md" className="empty-cart-container">
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    minHeight="60vh"
                    textAlign="center"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <ShoppingCartIcon sx={{ fontSize: 100, mb: 2 }} />
                        <Typography variant="h4" gutterBottom>
                            Your Cart is Empty
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Looks like you haven't added anything to your cart yet.Add it soon to grab offers!!!
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            component={Link}
                            to="/products"
                            startIcon={<ShoppingCartIcon />}
                            className="continue-shopping"
                        >
                            Start Shopping
                        </Button>
                    </motion.div>
                </Box>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" className="cart-page">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <Typography
                    variant="h4"
                    component="h1"
                    gutterBottom
                    className="page-title"
                    sx={{
                        background: 'linear-gradient(45deg, #1976d2 30%, #2196f3 90%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3) !important',
                        fontWeight: 700,
                        fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
                    }}
                >
                    Shopping Cart
                </Typography>
            </motion.div>

            <Grid container spacing={4}>
                <Grid item xs={12} md={8}>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {cart.map((item) => (
                            <motion.div key={item.id} variants={itemVariants}>
                                <Card className="cart-item">
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={4}>
                                            <CardMedia
                                                component="img"
                                                height="140"
                                                image={item.image}
                                                alt={item.name}
                                                className="cart-item-image"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={8}>
                                            <CardContent className="cart-item-content">
                                                <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                                                    <div>
                                                        <Typography
                                                            variant="h6"
                                                            gutterBottom
                                                            className="product-name"
                                                        >
                                                            {item.name}
                                                        </Typography>
                                                        <Typography
                                                            variant="h6"
                                                            className="price"
                                                            sx={{
                                                                color: '#1976d2 !important',
                                                                fontWeight: 600,
                                                                fontSize: '1.1rem'
                                                            }}
                                                        >
                                                            ${item.price.toFixed(2)}
                                                        </Typography>
                                                    </div>
                                                    <IconButton
                                                        onClick={() => handleRemoveItem(item.id)}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Box>
                                                <Box
                                                    display="flex"
                                                    alignItems="center"
                                                    className="quantity-controls"
                                                >
                                                    <IconButton
                                                        onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                                                    >
                                                        <RemoveIcon />
                                                    </IconButton>
                                                    <Typography
                                                        className="quantity-number"
                                                        sx={{ mx: 2 }}
                                                        key={item.id + "-" + item.quantity}
                                                    >
                                                        {item.quantity}
                                                    </Typography>
                                                    <IconButton
                                                        onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                                                    >
                                                        <AddIcon />
                                                    </IconButton>
                                                </Box>
                                                <Typography
                                                    variant="subtitle1"
                                                    className="item-total"
                                                >
                                                    Total: ${(item.price * item.quantity).toFixed(2)}
                                                </Typography>
                                            </CardContent>
                                        </Grid>
                                    </Grid>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </Grid>

                <Grid item xs={12} md={4}>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Paper className="cart-summary" sx={{ background: 'rgba(255, 255, 255, 0.95) !important' }}>
                            <Typography variant="h6" gutterBottom sx={{ color: '#000000', fontWeight: 600 }}>
                                Order Summary
                            </Typography>
                            <Divider sx={{ my: 2, background: 'rgba(0, 0, 0, 0.1)' }} />
                            <Box display="flex" justifyContent="space-between" mb={2}>
                                <Typography sx={{ color: '#000000', fontWeight: 500 }}>Subtotal</Typography>
                                <Typography sx={{ color: '#000000', fontWeight: 600 }}>${getCartTotal().toFixed(2)}</Typography>
                            </Box>
                            <Box display="flex" justifyContent="space-between" mb={2}>
                                <Typography sx={{ color: '#000000', fontWeight: 500 }}>Shipping</Typography>
                                <Typography sx={{ color: '#000000', fontWeight: 500 }}>Free</Typography>
                            </Box>
                            <Divider sx={{ my: 2, background: 'rgba(0, 0, 0, 0.1)' }} />
                            <Box display="flex" justifyContent="space-between" mb={3}>
                                <Typography variant="h6" sx={{ color: '#000000', fontWeight: 600 }}>Total</Typography>
                                <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 600 }}>
                                    ${getCartTotal().toFixed(2)}
                                </Typography>
                            </Box>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                size="large"
                                className="checkout-button"
                                sx={{
                                    background: 'linear-gradient(45deg, #1976d2, #2196f3) !important',
                                    color: '#ffffff !important',
                                    fontWeight: 600,
                                    '&:hover': {
                                        background: 'linear-gradient(45deg, #1565c0, #1976d2) !important',
                                    }
                                }}
                            >
                                Proceed to Checkout
                            </Button>
                            {cart.length > 0 && (
                                <Button
                                    variant="outlined"
                                    color="error"
                                    fullWidth
                                    size="large"
                                    onClick={clearCart}
                                    className="clear-cart-button"
                                    sx={{
                                        mt: 2,
                                        borderColor: '#f44336',
                                        color: '#f44336',
                                        fontWeight: 500,
                                        '&:hover': {
                                            borderColor: '#d32f2f',
                                            background: 'rgba(244, 67, 54, 0.08)',
                                        }
                                    }}
                                >
                                    Clear Cart
                                </Button>
                            )}
                        </Paper>
                    </motion.div>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Cart;