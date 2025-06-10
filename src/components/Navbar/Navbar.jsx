// components/Navbar/Navbar.js

import React, { useState, useMemo } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Badge,
    Box,
    Container,
    Menu,
    MenuItem,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import {
    ShoppingCart,
    Favorite,
    Menu as MenuIcon,
    Search,
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext'; // Verify this path
import { useWishlist } from '../../contexts/WishlistContext'; // Verify this path
import './Navbar.css';

const Navbar = () => {
    // 1. CRITICAL: Destructure 'cart' directly, and getCartCount
    const { cart, getCartCount } = useCart();
    const { getWishlistCount } = useWishlist(); // Assuming wishlist is separate and works

    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [anchorEl, setAnchorEl] = useState(null);

    // Log the cart as Navbar receives it from the context
    console.log('[Navbar Top Level] Cart from useCart():', JSON.stringify(cart));

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    // 2. CRITICAL: Directly use getCartCount from context
    const cartItemCount = getCartCount();

    // Log the calculated count
    console.log('[Navbar] Calculated cartItemCount:', cartItemCount);

    const menuItems = [
        { text: 'Home', path: '/' },
        { text: 'Products', path: '/products' },
        { text: 'Deals', path: '/deals' },
        { text: 'About', path: '/about' },
        { text: 'Contact', path: '/contact' },
    ];

    return (
        <AppBar position="fixed" className="navbar">
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    {isMobile && (
                        <IconButton
                            color="inherit"
                            edge="start"
                            onClick={handleMenuOpen}
                            className="menu-button"
                        >
                            <MenuIcon />
                        </IconButton>
                    )}

                    <Typography
                        variant="h6"
                        component={Link}
                        to="/"
                        className="logo"
                    >
                        TechShop
                    </Typography>

                    {!isMobile && (
                        <Box className="nav-links">
                            {menuItems.map((item) => (
                                <Button
                                    key={item.text}
                                    component={Link}
                                    to={item.path}
                                    color="inherit"
                                    className="nav-link"
                                >
                                    {item.text}
                                </Button>
                            ))}
                        </Box>
                    )}

                    <Box className="nav-actions">
                        <IconButton color="inherit" onClick={() => navigate('/search')}>
                            <Search />
                        </IconButton>
                        <IconButton color="inherit" component={Link} to="/wishlist">
                            <Badge badgeContent={getWishlistCount()} color="error">
                                <Favorite />
                            </Badge>
                        </IconButton>
                        <IconButton color="inherit" component={Link} to="/cart">
                            {/* 3. CRITICAL: Use the directly obtained cartItemCount */}
                            <Badge badgeContent={cartItemCount} color="error">
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                    </Box>
                </Toolbar>
            </Container>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                className="mobile-menu"
            >
                {menuItems.map((item) => (
                    <MenuItem
                        key={item.text}
                        onClick={handleMenuClose}
                        component={Link}
                        to={item.path}
                    >
                        {item.text}
                    </MenuItem>
                ))}
            </Menu>
        </AppBar>
    );
};

export default Navbar;