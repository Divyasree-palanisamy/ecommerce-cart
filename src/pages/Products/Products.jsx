import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Grid,
    Typography,
    Button,
    Box,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Slider,
    IconButton,
    Chip,
    Rating,
    Snackbar,
    Alert
} from '@mui/material';
import {
    ShoppingCart,
    Favorite,
    FavoriteBorder,
    ShoppingCartCheckout
} from '@mui/icons-material';
import { useCart } from '../../contexts/CartContext';
import { useWishlist } from '../../contexts/WishlistContext';
import { motion, AnimatePresence } from 'framer-motion';
import './Products.css';

// Import available product images
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

// Product images object
const productImages = {
    laptops: [laptop1, laptop2],
    phones: [phone1, phone2],
    watches: [smartwatch1, smartwatch2],
    headphones: [headphones1, headphones2],
    tablets: [tablet1, tablet2],
    cameras: [camera1, camera2]
};

// Create products with proper categorization
const createProducts = () => {
    const products = [];
    let id = 1;

    // Helper function to create product
    const createProduct = (name, price, image, category, brand) => ({
        id: id++,
        name,
        price,
        image,
        rating: Number((4 + Math.random()).toFixed(1)), // Rating with one decimal place
        category,
        brand,
        shortDescription: `High-performance ${category.slice(0, -1).toLowerCase()} with the latest technology.`,
        stock: Math.floor(Math.random() * 25)
    });

    // Laptops
    productImages.laptops.forEach((image, index) => {
        products.push(createProduct(
            `Premium Gaming Laptop ${index + 1} `,

            999.99 + (index * 200),
            image,
            "Laptops",
            ["Asus", "Dell"][index],

        ));
    });

    // Phones
    productImages.phones.forEach((image, index) => {
        products.push(createProduct(
            `Smartphone Pro ${index + 1}`,
            699.99 + (index * 100),
            image,
            "Phones",
            ["Apple", "Samsung"][index]
        ));
    });

    // Smartwatches
    productImages.watches.forEach((image, index) => {
        products.push(createProduct(
            `Smart Watch ${index + 1}`,
            299.99 + (index * 50),
            image,
            "Watches",
            ["Apple", "Samsung"][index]
        ));
    });

    // Headphones
    productImages.headphones.forEach((image, index) => {
        products.push(createProduct(
            `Premium Headphones ${index + 1}`,
            199.99 + (index * 50),
            image,
            "Headphones",
            ["Sony", "Bose"][index]
        ));
    });

    // Tablets
    productImages.tablets.forEach((image, index) => {
        products.push(createProduct(
            `Pro Tablet ${index + 1}`,
            449.99 + (index * 100),
            image,
            "Tablets",
            ["Apple", "Samsung"][index]
        ));
    });

    // Cameras
    productImages.cameras.forEach((image, index) => {
        products.push(createProduct(
            `Digital Camera ${index + 1}`,
            549.99 + (index * 150),
            image,
            "Cameras",
            ["Canon", "Nikon"][index]
        ));
    });

    return products;
};

const Products = () => {
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const [successMessage, setSuccessMessage] = useState({ open: false, message: '', type: 'success' });
    const [loading, setLoading] = useState(true);

    const [products] = useState(createProducts());
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [priceRange, setPriceRange] = useState([0, 2000]);
    const [sortBy, setSortBy] = useState('');

    const categories = [...new Set(products.map(product => product.category))];
    const brands = [...new Set(products.map(product => product.brand))];

    // Simulate loading
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        let result = [...products];

        if (searchQuery) {
            result = result.filter(product =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (selectedCategory) {
            result = result.filter(product => product.category === selectedCategory);
        }

        if (selectedBrand) {
            result = result.filter(product => product.brand === selectedBrand);
        }

        result = result.filter(
            product => product.price >= priceRange[0] && product.price <= priceRange[1]
        );

        if (sortBy) {
            result.sort((a, b) => {
                switch (sortBy) {
                    case 'price-asc':
                        return a.price - b.price;
                    case 'price-desc':
                        return b.price - a.price;
                    case 'rating-desc':
                        return b.rating - a.rating;
                    default:
                        return 0;
                }
            });
        }

        setFilteredProducts(result);
    }, [products, searchQuery, selectedCategory, selectedBrand, priceRange, sortBy]);

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    const handleWishlistToggle = (product) => {
        if (isInWishlist(product.id)) {
            removeFromWishlist(product.id);
            setSuccessMessage({
                open: true,
                message: `${product.name} removed from wishlist`,
                type: 'info'
            });
        } else {
            addToWishlist(product);
            setSuccessMessage({
                open: true,
                message: `${product.name} added to wishlist`,
                type: 'success'
            });
        }
    };

    const handleAddToCart = (product) => {
        addToCart(product);
        setSuccessMessage({
            open: true,
            message: `${product.name} added to cart`,
            type: 'success'
        });
    };

    const handleCloseMessage = () => {
        setSuccessMessage({ ...successMessage, open: false });
    };

    const getStockStatus = (stock) => {
        if (stock === 0) return { text: 'Out of Stock', className: 'out' };
        if (stock <= 5) return { text: `Only ${stock} left`, className: 'low' };
        return { text: 'In Stock', className: '' };
    };

    return (
        <Container maxWidth="xl" className="products-container">
            <Box className="filters-section">
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3}>
                        <TextField
                            fullWidth
                            label="Search Products"
                            variant="outlined"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Type to search..."
                            InputLabelProps={{
                                style: { background: 'white' }
                            }}
                            InputProps={{
                                style: { color: '#000000' }
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel id="category-label" style={{ background: 'white' }}>Select Category</InputLabel>
                            <Select
                                labelId="category-label"
                                value={selectedCategory}
                                label="Select Category"
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                displayEmpty
                                style={{ color: '#000000' }}
                            >
                                <MenuItem value="">
                                    <em>All Categories</em>
                                </MenuItem>
                                {categories.map((category) => (
                                    <MenuItem key={category} value={category}>
                                        {category}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel id="brand-label" style={{ background: 'white' }}>Select Brand</InputLabel>
                            <Select
                                labelId="brand-label"
                                value={selectedBrand}
                                label="Select Brand"
                                onChange={(e) => setSelectedBrand(e.target.value)}
                                displayEmpty
                                style={{ color: '#000000' }}
                            >
                                <MenuItem value="">
                                    <em>All Brands</em>
                                </MenuItem>
                                {brands.map((brand) => (
                                    <MenuItem key={brand} value={brand}>
                                        {brand}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel id="sort-label" style={{ background: 'white' }}>Sort Products</InputLabel>
                            <Select
                                labelId="sort-label"
                                value={sortBy}
                                label="Sort Products"
                                onChange={(e) => setSortBy(e.target.value)}
                                displayEmpty
                                style={{ color: '#000000' }}
                            >
                                <MenuItem value="">
                                    <em>No Sorting</em>
                                </MenuItem>
                                <MenuItem value="price-asc">Price: Low to High</MenuItem>
                                <MenuItem value="price-desc">Price: High to Low</MenuItem>
                                <MenuItem value="rating-desc">Highest Rated</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" style={{ color: '#000000', fontWeight: 'bold' }} gutterBottom>
                            Price Range Filter
                        </Typography>
                        <Slider
                            value={priceRange}
                            onChange={(e, newValue) => setPriceRange(newValue)}
                            valueLabelDisplay="auto"
                            min={0}
                            max={2000}
                            marks={[
                                { value: 0, label: '$0' },
                                { value: 500, label: '$500' },
                                { value: 1000, label: '$1000' },
                                { value: 1500, label: '$1500' },
                                { value: 2000, label: '$2000' }
                            ]}
                            valueLabelFormat={(value) => `$${value}`}
                        />
                    </Grid>
                </Grid>
            </Box>

            <Box className="products-grid">
                {loading ? (
                    // Loading skeletons
                    Array.from({ length: 6 }).map((_, index) => (
                        <motion.div
                            key={`skeleton-${index}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="product-item loading-item"
                        >
                            <div className="product-image-container loading-skeleton" />
                            <div className="product-details">
                                <div className="loading-skeleton" style={{ height: '24px', width: '80%', marginBottom: '8px' }} />
                                <div className="loading-skeleton" style={{ height: '20px', width: '60%', marginBottom: '8px' }} />
                                <div className="loading-skeleton" style={{ height: '36px', width: '100%' }} />
                            </div>
                        </motion.div>
                    ))
                ) : filteredProducts.length === 0 ? (
                    <Box sx={{ gridColumn: '1/-1', textAlign: 'center', py: 8 }}>
                        <Typography variant="h6" color="text.secondary">
                            No products found matching your criteria
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ mt: 2 }}
                            onClick={() => {
                                setSearchQuery('');
                                setSelectedCategory('');
                                setSelectedBrand('');
                                setPriceRange([0, 2000]);
                                setSortBy('');
                            }}
                        >
                            Clear Filters
                        </Button>
                    </Box>
                ) : (
                    filteredProducts.map((product) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="product-item"
                            onClick={() => handleProductClick(product.id)}
                        >
                            <div className="product-image-container">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="product-image"
                                />
                                <IconButton
                                    className={`wishlist-button ${isInWishlist(product.id) ? 'active' : ''}`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleWishlistToggle(product);
                                    }}
                                >
                                    {isInWishlist(product.id) ? (
                                        <Favorite />
                                    ) : (
                                        <FavoriteBorder />
                                    )}
                                </IconButton>
                            </div>
                            <div className="product-details">
                                <div className="product-content">
                                    <Box>
                                        <Typography variant="h6" className="product-name">
                                            {product.name}
                                        </Typography>
                                        <Typography variant="body2" className="product-description">
                                            {product.shortDescription}
                                        </Typography>
                                    </Box>
                                    <Box className="product-tags">
                                        <Chip label={product.category} size="small" />
                                        <Chip label={product.brand} size="small" />
                                    </Box>
                                    <Box className="product-rating" sx={{ mb: 1 }}>
                                        <Rating value={product.rating} precision={0.1} readOnly size="small" />
                                        <Typography className="rating-value">
                                            {product.rating.toFixed(1)}
                                        </Typography>
                                    </Box>
                                    <Typography variant="h6" className="product-price">
                                        ${product.price.toFixed(2)}
                                    </Typography>
                                    <Typography className={`product-stock ${getStockStatus(product.stock).className}`}>
                                        {getStockStatus(product.stock).text}
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        startIcon={<ShoppingCart />}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleAddToCart(product);
                                        }}
                                        disabled={product.stock === 0}
                                        sx={{
                                            mt: 1,
                                            width: '100%',
                                            background: product.stock === 0 ? '#cccccc' : 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                                            color: 'white',
                                            '&:hover': {
                                                background: product.stock === 0 ? '#cccccc' : 'linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)',
                                                transform: product.stock === 0 ? 'none' : 'scale(1.02)'
                                            },
                                            transition: 'all 0.3s ease-in-out',
                                            boxShadow: product.stock === 0 ? 'none' : '0 3px 5px 2px rgba(255, 105, 135, .3)',
                                        }}
                                    >
                                        {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    ))
                )}
            </Box>

            <Snackbar
                open={successMessage.open}
                autoHideDuration={3000}
                onClose={handleCloseMessage}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert
                    icon={successMessage.type === 'success' ? <ShoppingCartCheckout /> : undefined}
                    onClose={handleCloseMessage}
                    severity={successMessage.type}
                    elevation={6}
                    variant="filled"
                    className="success-alert"
                >
                    {successMessage.message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Products; 