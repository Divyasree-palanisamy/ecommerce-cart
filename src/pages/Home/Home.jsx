import React from 'react';
import { Link } from 'react-router-dom';
import {
    Container,
    Grid,
    Typography,
    Button,
    Card,
    CardContent,
    IconButton,
    Box,
    Badge,
} from '@mui/material';
import {
    ShoppingCart as CartIcon,
    Favorite as WishlistIcon,
    LocalShipping as ShippingIcon,
    Security as SecurityIcon,
    Support as SupportIcon,
    Payment as PaymentIcon,
    ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useCart } from '../../contexts/CartContext';
import { useWishlist } from '../../contexts/WishlistContext';
import './Home.css';

// Import images and video
import product1 from '../../assets/images/product1.avif';
import product2 from '../../assets/images/product2.jpg';
import product3 from '../../assets/images/product3.jpeg';
import bgVideo from '../../assets/videos/bg.mp4';

const Home = () => {
    const { getCartCount } = useCart();
    const { getWishlistCount } = useWishlist();

    const features = [
        {
            icon: <ShippingIcon sx={{ fontSize: 40 }} />,
            title: 'Free Express Shipping',
            description: 'Free shipping worldwide on all orders over $50. Fast delivery within 3-5 business days.'
        },
        {
            icon: <SecurityIcon sx={{ fontSize: 40 }} />,
            title: 'Secure Shopping',
            description: 'Your security is our top priority. We use industry-leading encryption for all transactions.'
        },
        {
            icon: <SupportIcon sx={{ fontSize: 40 }} />,
            title: '24/7 Premium Support',
            description: 'Our dedicated support team is available around the clock to assist you with any queries.'
        },
        {
            icon: <PaymentIcon sx={{ fontSize: 40 }} />,
            title: 'Easy Returns & Refunds',
            description: 'Hassle-free 30-day return policy. Not satisfied? Get a full refund with our no-questions-asked policy.'
        }
    ];

    return (
        <div className="home-container">
            {/* Hero Section with Video Background */}
            <div className="hero-section">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="video-background"
                >
                    <source src={bgVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="hero-content"
                >
                    <Typography
                        variant="h1"
                        className="hero-title"
                        sx={{
                            fontWeight: 800,
                            textAlign: 'center',
                            marginBottom: 2
                        }}
                    >
                        Tech Innovation
                    </Typography>
                    <Typography
                        variant="h3"
                        className="hero-subtitle"
                        sx={{
                            fontWeight: 500,
                            textAlign: 'center',
                            marginBottom: 4
                        }}
                    >
                        Discover Tomorrow's Technology Today
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button
                            component={Link}
                            to="/products"
                            variant="contained"
                            size="large"
                            className="hero-button"
                            endIcon={<ArrowForwardIcon />}
                            sx={{
                                fontSize: '1.2rem',
                                padding: '12px 32px',
                                borderRadius: '30px'
                            }}
                        >
                            Explore Products
                        </Button>
                    </Box>
                </motion.div>
            </div>

            {/* Features Section */}
            <div className="features-section">
                <Container>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <Typography variant="h3" className="section-title" align="center" gutterBottom>
                            Why Choose Us
                        </Typography>
                        <Typography variant="subtitle1" className="section-subtitle" align="center" gutterBottom>
                            Experience the best online shopping with our premium services
                        </Typography>
                    </motion.div>
                    <Grid container spacing={4} className="features-grid">
                        {features.map((feature, index) => (
                            <Grid item xs={12} sm={6} md={3} key={index}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.2 }}
                                    viewport={{ once: true }}
                                >
                                    <Card className="feature-card">
                                        <CardContent>
                                            <Box className="feature-icon">
                                                {feature.icon}
                                            </Box>
                                            <Typography variant="h6" className="feature-title">
                                                {feature.title}
                                            </Typography>
                                            <Typography variant="body1" className="feature-description">
                                                {feature.description}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </div>

            {/* Categories Section */}
            <div className="categories-section">
                <Container>
                    <Typography variant="h3" className="section-title" align="center" gutterBottom>
                        Shop By Category
                    </Typography>
                    <Typography variant="subtitle1" className="section-subtitle" align="center" gutterBottom>
                        Browse through our carefully curated categories
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="category-card large"
                            >
                                <img
                                    src={product1}
                                    alt="Premium Electronics"
                                />
                                <div className="category-content">
                                    <Typography variant="h4">Premium Electronics</Typography>
                                    <Typography variant="body1" sx={{ my: 2 }}>
                                        Discover cutting-edge technology and smart devices
                                    </Typography>
                                    <Button
                                        component={Link}
                                        to="/products?category=electronics"
                                        variant="contained"
                                        className="category-btn"
                                    >
                                        Explore Electronics
                                    </Button>
                                </div>
                            </motion.div>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        className="category-card small"
                                    >
                                        <img
                                            src={product2}
                                            alt="Luxury Fashion"
                                        />
                                        <div className="category-content">
                                            <Typography variant="h5">Luxury Fashion</Typography>
                                            <Typography variant="body1" sx={{ my: 2 }}>
                                                Elevate your wardrobe with designer collections
                                            </Typography>
                                            <Button
                                                component={Link}
                                                to="/products?category=fashion"
                                                variant="contained"
                                                className="category-btn"
                                            >
                                                Shop Fashion
                                            </Button>
                                        </div>
                                    </motion.div>
                                </Grid>
                                <Grid item xs={12}>
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        className="category-card small"
                                    >
                                        <img
                                            src={product3}
                                            alt="Designer Accessories"
                                        />
                                        <div className="category-content">
                                            <Typography variant="h5">Photograper Accessories</Typography>
                                            <Typography variant="body1" sx={{ my: 2 }}>
                                                Complete your look with premium accessories
                                            </Typography>
                                            <Button
                                                component={Link}
                                                to="/products?category=accessories"
                                                variant="contained"
                                                className="category-btn"
                                            >
                                                View Accessories
                                            </Button>
                                        </div>
                                    </motion.div>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </div>

            {/* Floating Icons */}
            <div className="floating-icons">
                <Link to="/cart" className="floating-icon cart-icon">
                    <Badge badgeContent={getCartCount()} color="primary">
                        <CartIcon />
                    </Badge>
                </Link>
                <Link to="/wishlist" className="floating-icon wishlist-icon">
                    <Badge badgeContent={getWishlistCount()} color="secondary">
                        <WishlistIcon />
                    </Badge>
                </Link>
            </div>
        </div>
    );
};

export default Home; 