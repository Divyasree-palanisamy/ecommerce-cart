import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import './HeroSection.css';

const HeroSection = () => {
    const navigate = useNavigate();

    return (
        <Box className="hero-section">
            <div className="hero-background">
                <video autoPlay muted loop className="hero-background-video">
                    <source src="/videos/hero-bg.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="hero-overlay" />
                <div className="hero-gradient" />
            </div>
            <Container maxWidth="xl" className="hero-content">
                <Typography variant="h1" className="hero-title">
                    Discover Amazing Tech
                </Typography>
                <Typography variant="h5" className="hero-subtitle">
                    Experience Innovation at Your Fingertips
                </Typography>
                <Button
                    variant="contained"
                    size="large"
                    startIcon={<ShoppingCart />}
                    className="shop-now-button"
                    onClick={() => navigate('/products')}
                >
                    Shop Now
                </Button>
            </Container>
        </Box>
    );
};

export default HeroSection; 