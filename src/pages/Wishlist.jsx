import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Typography,
    Grid,
    Button,
    Box,
    IconButton,
} from '@mui/material';
import { Delete, ShoppingCart } from '@mui/icons-material';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { toast } from 'react-toastify';

const Wishlist = () => {
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { wishlist, removeFromWishlist } = useWishlist();

    const moveToCart = (item) => {
        addToCart(item, 1);
        removeFromWishlist(item.id);
        toast.success(
            <div>
                <strong>{item.name}</strong>
                <br />
                Moved to cart
            </div>
        );
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                My Wishlist
            </Typography>

            {wishlist.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                    <Typography variant="h6" color="text.secondary">
                        Your wishlist is empty
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2 }}
                        onClick={() => navigate('/products')}
                    >
                        Browse Products
                    </Button>
                </Box>
            ) : (
                <Grid container spacing={3}>
                    {wishlist.map((item) => (
                        <Grid item xs={12} sm={6} md={4} key={item.id}>
                            <div className="wishlist-item">
                                <div className="wishlist-image-container">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="wishlist-image"
                                    />
                                </div>
                                <Box sx={{ p: 2, flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <Typography variant="h6" gutterBottom sx={{ color: '#000000' }}>
                                        {item.name}
                                    </Typography>
                                    <Typography variant="h6" color="primary" gutterBottom>
                                        ${item.price}
                                    </Typography>
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        mt: 'auto',
                                        gap: 2
                                    }}>
                                        <Button
                                            variant="contained"
                                            startIcon={<ShoppingCart />}
                                            onClick={() => moveToCart(item)}
                                            sx={{
                                                flex: 1,
                                                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                                                boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                                                color: 'black'
                                            }}
                                        >
                                            Move to Cart
                                        </Button>
                                        <IconButton
                                            color="error"
                                            onClick={() => removeFromWishlist(item.id)}
                                            sx={{
                                                bgcolor: 'rgba(244, 67, 54, 0.1)',
                                                '&:hover': {
                                                    bgcolor: 'rgba(244, 67, 54, 0.2)'
                                                }
                                            }}
                                        >
                                            <Delete />
                                        </IconButton>
                                    </Box>
                                </Box>
                            </div>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
};

export default Wishlist; 