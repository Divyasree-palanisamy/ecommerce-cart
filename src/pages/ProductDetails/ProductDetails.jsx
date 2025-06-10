import React, { useEffect, useState } from 'react';
import {
    Container,
    Grid,
    Typography,
    Button,
    Box,
    Rating,
    Chip,
    Divider,
    Paper,
    Zoom,
    Fade,
    IconButton
} from '@mui/material';
import {
    ShoppingCart,
    FlashOn,
    LocalShipping,
    VerifiedUser,
    AssignmentReturn,
    LocalOffer,
    ArrowBack,
    ArrowForward,
    FiberManualRecord,
    ArrowUpward,
    ArrowDownward,
    Fullscreen,
    FullscreenExit,
    Close,
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { motion } from 'framer-motion';

// Import all product images
import laptop1 from '../../assets/images/products/laptop1.jpeg';
import laptop2 from '../../assets/images/products/laptop2.jpeg';
import phone1 from '../../assets/images/products/phone1.jpeg';
import phone2 from '../../assets/images/products/phone2.jpeg';
import smartwatch1 from '../../assets/images/products/smartwatch1.jpeg';
import smartwatch2 from '../../assets/images/products/smartwatch2.jpeg';
import headphones1 from '../../assets/images/products/headphones1.jpeg';
import headphones2 from '../../assets/images/products/headphones2.jpeg';
import tablet1 from '../../assets/images/products/tablet1.jpeg';
import tablet2 from '../../assets/images/products/tablet2.jpeg';
import camera1 from '../../assets/images/products/camera1.jpeg';
import camera2 from '../../assets/images/products/camera2.jpeg';

import './ProductDetails.css';

const productImages = {
    1: laptop1,
    2: laptop2,
    3: phone1,
    4: phone2,
    5: smartwatch1,
    6: smartwatch2,
    7: headphones1,
    8: headphones2,
    9: tablet1,
    10: tablet2,
    11: camera1,
    12: camera2,
};

// Product views mapping
const getProductViews = (productId, category) => {
    // This is a sample implementation. In a real app, you would have actual different view images
    const views = {
        front: productImages[productId],
        left: category === 'Laptops' ? laptop2 :
            category === 'Phones' ? phone2 :
                category === 'Watches' ? smartwatch2 :
                    category === 'Headphones' ? headphones2 :
                        category === 'Tablets' ? tablet2 :
                            camera2,
        right: category === 'Laptops' ? laptop1 :
            category === 'Phones' ? phone1 :
                category === 'Watches' ? smartwatch1 :
                    category === 'Headphones' ? headphones1 :
                        category === 'Tablets' ? tablet1 :
                            camera1,
        top: productImages[productId], // In real app, replace with actual top view
        bottom: productImages[productId], // In real app, replace with actual bottom view
    };
    return views;
};

const ProductDetails = () => {
    const { productId } = useParams();
    const { addToCart } = useCart();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [currentView, setCurrentView] = useState('front');
    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
        setTimeout(() => setLoading(false), 500);
    }, []);

    const handleViewChange = (view) => {
        setCurrentView(view);
    };

    const toggleFullscreen = () => {
        setIsFullscreen(prev => !prev);
    };

    // In a real app, you would fetch this data from an API
    const product = {
        id: parseInt(productId),
        name: "Premium Gaming Laptop 1",
        price: 999.99,
        originalPrice: 1299.99,
        discount: "23% off",
        rating: 4.5,
        reviews: 1250,
        stock: 15,
        brand: "Asus",
        category: "Laptops",
        description: "High-performance gaming laptop with the latest technology. Features include:\n- Latest generation processor\n- High-end graphics card\n- Fast SSD storage\n- High refresh rate display\n- Premium build quality",
        highlights: [
            "8GB RAM | 512GB SSD",
            "15.6 inch Full HD Display",
            "NVIDIA GeForce RTX Graphics",
            "Windows 11 Home",
            "MS Office Included"
        ],
        specifications: {
            "Processor": "Intel Core i7 12th Gen",
            "RAM": "8GB DDR4",
            "Storage": "512GB NVMe SSD",
            "Display": "15.6 inch Full HD (1920 x 1080)",
            "Graphics": "NVIDIA GeForce RTX 3050",
            "Operating System": "Windows 11 Home"
        },
        offers: [
            "Bank Offer: 10% off on HDFC Bank Cards",
            "No Cost EMI available on select cards",
            "Partner Offer: Get GST invoice and save up to 28%"
        ],
        image: productImages[parseInt(productId)]
    };

    const handleAddToCart = () => {
        addToCart(product);
    };

    const handleBuyNow = () => {
        addToCart(product);
        navigate('/checkout');
    };

    if (loading) {
        return (
            <Container maxWidth="xl" className="product-details-container">
                <Box className="loading-skeleton-container">
                    <div className="loading-skeleton image-skeleton" />
                    <div className="loading-skeleton content-skeleton" />
                </Box>
            </Container>
        );
    }

    if (!product.image) {
        return (
            <Container maxWidth="xl" className="product-details-container">
                <Typography variant="h5" align="center">Product not found</Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="xl" className="product-details-container">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Grid container spacing={3}>
                    <Grid item xs={12} md={5}>
                        <Paper className="product-image-paper">
                            <div className="product-image-wrapper">
                                <IconButton
                                    className="fullscreen-button"
                                    onClick={toggleFullscreen}
                                >
                                    <Fullscreen />
                                </IconButton>

                                <div className="image-container">
                                    <motion.img
                                        src={product.image}
                                        alt={`${product.name} - ${currentView} view`}
                                        className={`product-detail-image view-${currentView}`}
                                        initial={false}
                                        animate={{
                                            rotateY: currentView === 'back' ? 180 : 0
                                        }}
                                        transition={{ duration: 0.8, ease: "easeInOut" }}
                                    />
                                </div>

                                {/* View Selection Controls */}
                                <div className="view-controls">
                                    <Button
                                        className={`view-button ${currentView === 'front' ? 'active' : ''}`}
                                        onClick={() => handleViewChange('front')}
                                    >
                                        Front View
                                    </Button>
                                    <Button
                                        className={`view-button ${currentView === 'back' ? 'active' : ''}`}
                                        onClick={() => handleViewChange('back')}
                                    >
                                        Back View
                                    </Button>
                                </div>

                                {/* Current View Indicator */}
                                <Typography className="view-indicator">
                                    {currentView.charAt(0).toUpperCase() + currentView.slice(1)} View
                                </Typography>
                            </div>

                            <div className="product-brief">
                                <Typography className="brief-title">
                                    Product Overview
                                </Typography>
                                <Typography className="brief-text">
                                    Experience premium quality and exceptional performance with this {product.category.toLowerCase()}.
                                    Designed for those who demand the best, it combines cutting-edge technology with elegant design.
                                </Typography>
                                <ul className="key-features">
                                    <li className="key-feature-item">
                                        <FiberManualRecord className="feature-bullet" fontSize="small" />
                                        <span>Premium {product.brand} quality and reliability</span>
                                    </li>
                                    <li className="key-feature-item">
                                        <FiberManualRecord className="feature-bullet" fontSize="small" />
                                        <span>Advanced technology for superior performance</span>
                                    </li>
                                    <li className="key-feature-item">
                                        <FiberManualRecord className="feature-bullet" fontSize="small" />
                                        <span>Elegant design with attention to detail</span>
                                    </li>
                                    <li className="key-feature-item">
                                        <FiberManualRecord className="feature-bullet" fontSize="small" />
                                        <span>Enhanced user experience and comfort</span>
                                    </li>
                                </ul>
                            </div>

                            <Box className="product-action-buttons">
                                <Button
                                    variant="contained"
                                    startIcon={<ShoppingCart />}
                                    onClick={handleAddToCart}
                                    className="cart-button"
                                    fullWidth
                                >
                                    ADD TO CART
                                </Button>
                                <Button
                                    variant="contained"
                                    startIcon={<FlashOn />}
                                    onClick={handleBuyNow}
                                    className="buy-button"
                                    fullWidth
                                >
                                    BUY NOW
                                </Button>
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Right Column - Product Details */}
                    <Grid item xs={12} md={7}>
                        <Box className="product-info-section">
                            <Typography variant="h5" component="h1" className="product-title">
                                {product.name}
                            </Typography>

                            <Box className="ratings-section">
                                <Chip
                                    label={`${product.rating} ★`}
                                    className="rating-chip"
                                    size="small"
                                />
                                <Typography variant="body2" color="textSecondary">
                                    {product.reviews.toLocaleString()} Ratings
                                </Typography>
                            </Box>

                            <Box className="price-section">
                                <Typography variant="h4" component="span" className="current-price">
                                    ${product.price.toLocaleString()}
                                </Typography>
                                <Typography variant="h6" component="span" className="original-price">
                                    ${product.originalPrice.toLocaleString()}
                                </Typography>
                                <Typography variant="h6" component="span" className="discount">
                                    {product.discount}
                                </Typography>
                            </Box>

                            <Box className="offers-section">
                                <Typography variant="h6" gutterBottom className="section-title">
                                    <LocalOffer className="offer-icon" /> Available offers
                                </Typography>
                                <ul className="offers-list">
                                    {product.offers.map((offer, index) => (
                                        <li key={index}>
                                            <Typography variant="body2">
                                                <LocalOffer className="bullet-icon" /> {offer}
                                            </Typography>
                                        </li>
                                    ))}
                                </ul>
                            </Box>

                            <Box className="stock-status">
                                <Typography
                                    variant="body1"
                                    className={product.stock > 0 ? 'in-stock' : 'out-of-stock'}
                                >
                                    {product.stock > 0 ? `In Stock (${product.stock} units)` : 'Out of Stock'}
                                </Typography>
                            </Box>

                            <Divider className="section-divider" />

                            {/* Highlights Section */}
                            <Box className="highlights-section">
                                <Typography variant="h6" gutterBottom>
                                    Highlights
                                </Typography>
                                <ul className="highlights-list">
                                    {product.highlights.map((highlight, index) => (
                                        <li key={index}>{highlight}</li>
                                    ))}
                                </ul>
                            </Box>

                            <Divider className="section-divider" />

                            {/* Services Section */}
                            <Box className="services-section">
                                <Grid container spacing={2}>
                                    <Grid item xs={6} md={3}>
                                        <Box className="service-item">
                                            <LocalShipping />
                                            <Typography variant="body2">Free Delivery</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={6} md={3}>
                                        <Box className="service-item">
                                            <AssignmentReturn />
                                            <Typography variant="body2">10 Days Return</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={6} md={3}>
                                        <Box className="service-item">
                                            <VerifiedUser />
                                            <Typography variant="body2">1 Year Warranty</Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>

                            <Divider className="section-divider" />

                            {/* Specifications Section */}
                            <Box className="specifications-section">
                                <Typography variant="h6" gutterBottom>
                                    Specifications
                                </Typography>
                                <Grid container spacing={2}>
                                    {Object.entries(product.specifications).map(([key, value]) => (
                                        <React.Fragment key={key}>
                                            <Grid item xs={4}>
                                                <Typography variant="body2" color="textSecondary">
                                                    {key}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={8}>
                                                <Typography variant="body2">
                                                    {value}
                                                </Typography>
                                            </Grid>
                                        </React.Fragment>
                                    ))}
                                </Grid>
                            </Box>

                            <Divider className="section-divider" />

                            {/* Description Section */}
                            <Box className="description-section">
                                <Typography variant="h6" gutterBottom>
                                    Description
                                </Typography>
                                <Typography variant="body2" className="description-text">
                                    {product.description}
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </motion.div>

            {/* Fullscreen View */}
            {isFullscreen && (
                <div className="fullscreen-view">
                    <div className="fullscreen-image-container">
                        <IconButton
                            className="close-fullscreen"
                            onClick={toggleFullscreen}
                        >
                            <Close />
                        </IconButton>
                        <div className="image-container">
                            <motion.img
                                src={product.image}
                                alt={`${product.name} - ${currentView} view`}
                                className={`fullscreen-image view-${currentView}`}
                                initial={false}
                                animate={{
                                    rotateY: currentView === 'back' ? 180 : 0
                                }}
                                transition={{ duration: 0.8, ease: "easeInOut" }}
                            />
                        </div>
                        {/* View Selection Controls for Fullscreen */}
                        <div className="view-controls fullscreen-controls">
                            <Button
                                className={`view-button ${currentView === 'front' ? 'active' : ''}`}
                                onClick={() => handleViewChange('front')}
                            >
                                Front View
                            </Button>
                            <Button
                                className={`view-button ${currentView === 'back' ? 'active' : ''}`}
                                onClick={() => handleViewChange('back')}
                            >
                                Back View
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </Container>
    );
};

export default ProductDetails; 