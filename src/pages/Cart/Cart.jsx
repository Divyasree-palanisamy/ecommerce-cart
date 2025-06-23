import React, { useEffect } from 'react';
import { useCart } from '../../contexts/CartContext';
import { Container, Box, Grid, Card, CardMedia, CardContent, Typography, IconButton, Button, Paper, Divider, Modal, TextField, Alert } from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingCart, Remove, Add, Delete } from '@mui/icons-material';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
    const [openPayment, setOpenPayment] = React.useState(false);
    const [orderPlaced, setOrderPlaced] = React.useState(false);
    const [paymentMethod, setPaymentMethod] = React.useState('');
    const [paymentDetails, setPaymentDetails] = React.useState({ name: '', card: '' });

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

    const handlePlaceOrder = () => {
        setOrderPlaced(true);
        clearCart();
        setOpenPayment(false);
        setTimeout(() => setOrderPlaced(false), 4000);
    };

    useEffect(() => {
        console.log('paymentMethod:', paymentMethod);
    }, [paymentMethod]);

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
                        <ShoppingCart sx={{ fontSize: 100, mb: 2 }} />
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
                            startIcon={<ShoppingCart />}
                            className="continue-shopping"
                        >
                            Start Shopping
                        </Button>
                    </motion.div>
                </Box>
                {orderPlaced && (
                    <Alert severity="success" sx={{ mb: 2 }}>
                        Your order has been placed successfully!
                    </Alert>
                )}
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" className="cart-page">
            {orderPlaced && (
                <Alert severity="success" sx={{ mb: 2 }}>
                    Your order has been placed successfully!
                </Alert>
            )}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <Typography
                    variant="h3"
                    component="h1"
                    gutterBottom
                    align="center"
                    className="page-title"
                    sx={{ color: '#000', fontWeight: 400, mt: 4 }}
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
                                                image={item.image}
                                                alt={item.name}
                                                className="cart-item-image"
                                                sx={{ height: 170, width: '100%', objectFit: 'cover', borderRadius: 2, background: '#f5f5f5', p: 1 }}
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
                                                        <Delete />
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
                                                        <Remove />
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
                                                        <Add />
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
                        <Paper className="cart-summary" sx={{ boxShadow: 6, borderRadius: 3, p: 3, background: 'rgba(255,255,255,0.98)' }}>
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
                                onClick={() => {
                                    setOpenPayment(true);
                                    setPaymentMethod('');
                                    setPaymentDetails({ name: '', card: '' });
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
            <Modal
                open={openPayment}
                onClose={() => {
                    setOpenPayment(false);
                    setPaymentMethod('');
                    setPaymentDetails({ name: '', card: '' });
                }}
                aria-labelledby="payment-modal-title"
                aria-describedby="payment-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 370,
                    bgcolor: '#fff',
                    border: '2px solid #1976d2',
                    boxShadow: 12,
                    borderRadius: 3,
                    p: 4,
                    zIndex: 2000
                }}>
                    <Typography id="payment-modal-title" variant="h6" component="h2" gutterBottom>
                        Payment Method
                    </Typography>
                    {!paymentMethod && (
                        <Box>
                            <Button
                                variant="outlined"
                                color="primary"
                                fullWidth
                                sx={{ mb: 2 }}
                                onClick={() => setPaymentMethod('cod')}
                            >
                                Cash on Delivery
                            </Button>
                            <Button
                                variant="outlined"
                                color="secondary"
                                fullWidth
                                onClick={() => setPaymentMethod('online')}
                            >
                                Online Payment
                            </Button>
                        </Box>
                    )}
                    {paymentMethod === 'cod' && (
                        <Box>
                            <Typography sx={{ mt: 2, mb: 2 }}>
                                You have selected <b>Cash on Delivery</b>.
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={handlePlaceOrder}
                            >
                                Place Order
                            </Button>
                        </Box>
                    )}
                    {paymentMethod === 'online' && (
                        <Box>
                            <TextField
                                label="Name on Card"
                                fullWidth
                                margin="normal"
                                value={paymentDetails.name}
                                onChange={e => setPaymentDetails({ ...paymentDetails, name: e.target.value })}
                            />
                            <TextField
                                label="Card Number"
                                fullWidth
                                margin="normal"
                                value={paymentDetails.card}
                                onChange={e => setPaymentDetails({ ...paymentDetails, card: e.target.value })}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{ mt: 2 }}
                                onClick={handlePlaceOrder}
                                disabled={!paymentDetails.name || !paymentDetails.card}
                            >
                                Pay & Place Order
                            </Button>
                        </Box>
                    )}
                </Box>
            </Modal>
        </Container>
    );
};

export default Cart;