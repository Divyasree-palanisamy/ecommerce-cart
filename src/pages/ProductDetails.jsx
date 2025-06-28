import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Grid, Button } from '@mui/material';
import { ShoppingCart, Favorite } from '@mui/icons-material';

// Import product images
import laptop1 from '../assets/images/products/laptop1.jpeg';
import laptop2 from '../assets/images/products/laptop2.jpeg';
import phone1 from '../assets/images/products/phone1.jpeg';
import phone2 from '../assets/images/products/phone2.jpeg';
import smartwatch1 from '../assets/images/products/smartwatch1.jpeg';
import smartwatch2 from '../assets/images/products/smartwatch2.jpeg';
import headphones1 from '../assets/images/products/headphones1.jpeg';
import headphones2 from '../assets/images/products/headphones2.jpeg';
import tablet1 from '../assets/images/products/tablet1.jpeg';
import tablet2 from '../assets/images/products/tablet2.jpeg';
import camera1 from '../assets/images/products/camera1.jpeg';
import camera2 from '../assets/images/products/camera2.jpeg';

// Product data
const productsData = [
    { id: 1, name: 'Premium Gaming Laptop 1', price: 999.99, image: laptop1, category: 'Laptops', brand: 'Asus', stock: 10 },
    { id: 2, name: 'Premium Gaming Laptop 2', price: 1199.99, image: laptop2, category: 'Laptops', brand: 'Dell', stock: 8 },
    { id: 3, name: 'Smartphone Pro 1', price: 699.99, image: phone1, category: 'Phones', brand: 'Apple', stock: 15 },
    { id: 4, name: 'Smartphone Pro 2', price: 799.99, image: phone2, category: 'Phones', brand: 'Samsung', stock: 12 },
    { id: 5, name: 'Smart Watch 1', price: 299.99, image: smartwatch1, category: 'Watches', brand: 'Apple', stock: 20 },
    { id: 6, name: 'Smart Watch 2', price: 349.99, image: smartwatch2, category: 'Watches', brand: 'Samsung', stock: 18 },
    { id: 7, name: 'Premium Headphones 1', price: 199.99, image: headphones1, category: 'Headphones', brand: 'Sony', stock: 25 },
    { id: 8, name: 'Premium Headphones 2', price: 249.99, image: headphones2, category: 'Headphones', brand: 'Bose', stock: 22 },
    { id: 9, name: 'Pro Tablet 1', price: 449.99, image: tablet1, category: 'Tablets', brand: 'Apple', stock: 14 },
    { id: 10, name: 'Pro Tablet 2', price: 549.99, image: tablet2, category: 'Tablets', brand: 'Samsung', stock: 16 },
    { id: 11, name: 'Digital Camera 1', price: 549.99, image: camera1, category: 'Cameras', brand: 'Canon', stock: 10 },
    { id: 12, name: 'Digital Camera 2', price: 699.99, image: camera2, category: 'Cameras', brand: 'Nikon', stock: 8 }
];

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        // Find the product from our data
        const foundProduct = productsData.find(p => p.id === parseInt(id));
        if (foundProduct) {
            setProduct(foundProduct);
        }
    }, [id]);

    const addToCart = () => {
        if (!product) return;

        const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItem = currentCart.find(item => item.id === product.id);

        if (existingItem) {
            const updatedCart = currentCart.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
            );
            localStorage.setItem('cart', JSON.stringify(updatedCart));
        } else {
            const updatedCart = [...currentCart, { ...product, quantity }];
            localStorage.setItem('cart', JSON.stringify(updatedCart));
        }

        navigate('/cart');
    };

    const addToWishlist = () => {
        if (!product) return;

        const currentWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        if (!currentWishlist.find(item => item.id === product.id)) {
            const updatedWishlist = [...currentWishlist, product];
            localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
        }
        navigate('/wishlist');
    };

    const updateQuantity = (newQuantity) => {
        if (newQuantity >= 1 && newQuantity <= product.stock) {
            setQuantity(newQuantity);
        }
    };

    if (!product) {
        return (
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Typography variant="h5" align="center">Product not found</Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Box sx={{
                        background: '#fff',
                        borderRadius: '12px',
                        padding: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '500px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}>
                        <img
                            src={product.image}
                            alt={product.name}
                            style={{
                                maxWidth: '100%',
                                maxHeight: '100%',
                                objectFit: 'contain',
                                borderRadius: '8px',
                            }}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box sx={{
                        background: '#fff',
                        borderRadius: '12px',
                        padding: '2rem',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}>
                        <Typography
                            variant="h4"
                            component="h1"
                            gutterBottom
                            sx={{
                                color: '#000',
                                fontWeight: 600,
                                fontSize: '2rem',
                                mb: 2
                            }}
                        >
                            {product.name}
                        </Typography>

                        <Box sx={{ mb: 3 }}>
                            <Typography
                                variant="h5"
                                sx={{
                                    color: '#1976d2',
                                    fontWeight: 700,
                                    fontSize: '1.8rem'
                                }}
                            >
                                ${product.price.toFixed(2)}
                            </Typography>
                        </Box>

                        <Box sx={{ mb: 3 }}>
                            <Typography variant="body1" sx={{ color: '#000', mb: 1, fontWeight: 500 }}>
                                Brand: <span style={{ color: '#333' }}>{product.brand}</span>
                            </Typography>
                            <Typography variant="body1" sx={{ color: '#000', mb: 1, fontWeight: 500 }}>
                                Category: <span style={{ color: '#333' }}>{product.category}</span>
                            </Typography>
                            <Typography variant="body1" sx={{ color: '#000', fontWeight: 500 }}>
                                Availability: <span style={{ color: product.stock > 0 ? '#4caf50' : '#f44336' }}>
                                    {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                                </span>
                            </Typography>
                        </Box>

                        <Typography
                            variant="body1"
                            sx={{
                                color: '#333',
                                mb: 3,
                                lineHeight: 1.6
                            }}
                        >
                            High-quality {product.category.toLowerCase()} with premium features and exceptional performance.
                            Perfect for both professional use and everyday activities.
                        </Typography>

                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            mb: 3,
                            background: '#f8f8f8',
                            padding: '1rem',
                            borderRadius: '8px'
                        }}>
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                border: 1,
                                borderColor: 'divider',
                                borderRadius: 1,
                                background: '#fff'
                            }}>
                                <Button
                                    onClick={() => updateQuantity(quantity - 1)}
                                    disabled={quantity <= 1}
                                    sx={{
                                        minWidth: '40px',
                                        color: '#000'
                                    }}
                                >
                                    -
                                </Button>
                                <Typography sx={{ px: 3, color: '#000', fontWeight: 600 }}>{quantity}</Typography>
                                <Button
                                    onClick={() => updateQuantity(quantity + 1)}
                                    disabled={quantity >= product.stock}
                                    sx={{
                                        minWidth: '40px',
                                        color: '#000'
                                    }}
                                >
                                    +
                                </Button>
                            </Box>
                            <Typography sx={{ color: '#666', fontWeight: 500 }}>
                                {product.stock} items available
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Button
                                variant="contained"
                                startIcon={<ShoppingCart />}
                                size="large"
                                onClick={addToCart}
                                sx={{
                                    background: 'linear-gradient(45deg, #1976d2, #2196f3)',
                                    padding: '12px 24px',
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    flex: 2,
                                    '&:hover': {
                                        background: 'linear-gradient(45deg, #1565c0, #1976d2)',
                                    }
                                }}
                            >
                                Add to Cart
                            </Button>
                            <Button
                                variant="outlined"
                                startIcon={<Favorite />}
                                size="large"
                                onClick={addToWishlist}
                                sx={{
                                    borderColor: '#f50057',
                                    color: '#f50057',
                                    padding: '12px 24px',
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    flex: 1,
                                    '&:hover': {
                                        borderColor: '#c51162',
                                        color: '#c51162',
                                        background: 'rgba(245, 0, 87, 0.05)'
                                    }
                                }}
                            >
                                Wishlist
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ProductDetails; 