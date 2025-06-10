import React from 'react';
import {
    Box,
    Container,
    Grid,
    Typography,
    IconButton,
    Link,
    Stack,
} from '@mui/material';
import {
    Facebook,
    Twitter,
    Instagram,
    LinkedIn,
    Email,
    Phone,
    LocationOn,
} from '@mui/icons-material';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <Box component="footer" className="footer">
            <Container maxWidth="lg">
                <Grid container spacing={4} className="footer-content">
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" className="footer-title">
                            TechShop
                        </Typography>
                        <Typography variant="body2" className="footer-description">
                            Your one-stop destination for all your tech needs. Quality products,
                            competitive prices, and excellent customer service.
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" className="footer-title">
                            Quick Links
                        </Typography>
                        <Stack spacing={1}>
                            <Link href="/" className="footer-link">Home</Link>
                            <Link href="/products" className="footer-link">Products</Link>
                            <Link href="/deals" className="footer-link">Deals</Link>
                            <Link href="/about" className="footer-link">About Us</Link>
                            <Link href="/contact" className="footer-link">Contact</Link>
                        </Stack>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" className="footer-title">
                            Contact Info
                        </Typography>
                        <Stack spacing={2}>
                            <Box className="contact-item">
                                <LocationOn className="contact-icon" />
                                <Typography variant="body2">
                                    123 Tech Street, Digital City, Coimbatore - 651421
                                </Typography>
                            </Box>
                            <Box className="contact-item">
                                <Email className="contact-icon" />
                                <Typography variant="body2">
                                    support@techshop.com
                                </Typography>
                            </Box>
                            <Box className="contact-item">
                                <Phone className="contact-icon" />
                                <Typography variant="body2">
                                    +91 9988776655
                                </Typography>
                            </Box>
                        </Stack>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" className="footer-title">
                            Follow Us
                        </Typography>
                        <Box className="social-icons">
                            <IconButton
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-icon"
                            >
                                <Facebook />
                            </IconButton>
                            <IconButton
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-icon"
                            >
                                <Twitter />
                            </IconButton>
                            <IconButton
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-icon"
                            >
                                <Instagram />
                            </IconButton>
                            <IconButton
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-icon"
                            >
                                <LinkedIn />
                            </IconButton>
                        </Box>
                    </Grid>
                </Grid>

                <Box className="footer-bottom">
                    <Typography variant="body2" align="center">
                        © {currentYear} TechShop. All rights reserved.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer; 