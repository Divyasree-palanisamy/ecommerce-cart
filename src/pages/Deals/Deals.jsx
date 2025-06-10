import React from 'react';
import {
    Container,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Button,
    Box,
    Chip,
} from '@mui/material';
import { motion } from 'framer-motion';
import { ShoppingCart, LocalOffer } from '@mui/icons-material';
import { useCart } from '../../contexts/CartContext';
import './Deals.css';

const deals = [
    {
        id: 1,
        name: "Premium Wireless Headphones",
        originalPrice: 299.99,
        discountedPrice: 199.99,
        discount: 33,
        image: "https://source.unsplash.com/800x800/?headphones",
        description: "High-quality wireless headphones with noise cancellation",
        price: 199.99
    },
    {
        id: 2,
        name: "Ultra HD 4K Smart TV",
        originalPrice: 1299.99,
        discountedPrice: 899.99,
        discount: 31,
        image: "https://source.unsplash.com/800x800/?tv",
        description: "Stunning 4K resolution with smart features and voice control.",
        price: 899.99
    },
    {
        id: 3,
        name: "Smart Fitness Tracker",
        originalPrice: 79.99,
        discountedPrice: 49.99,
        discount: 37,
        image: "https://source.unsplash.com/800x800/?fitness-tracker",
        description: "Track your steps, heart rate, and sleep with this sleek device.",
        price: 49.99
    },
    {
        id: 4,
        name: "Portable Bluetooth Speaker",
        originalPrice: 99.99,
        discountedPrice: 69.99,
        discount: 30,
        image: "https://source.unsplash.com/800x800/?bluetooth-speaker",
        description: "Powerful sound in a compact design, perfect for on-the-go.",
        price: 69.99
    },
    {
        id: 5,
        name: "Gaming Keyboard & Mouse Combo",
        originalPrice: 149.99,
        discountedPrice: 89.99,
        discount: 40,
        image: "https://source.unsplash.com/800x800/?gaming-keyboard",
        description: "Responsive mechanical keyboard and precision gaming mouse.",
        price: 89.99
    },
    {
        id: 6,
        name: "Professional DSLR Camera Kit",
        originalPrice: 1499.99,
        discountedPrice: 999.99,
        discount: 33,
        image: "https://source.unsplash.com/800x800/?camera-kit",
        description: "Capture breathtaking photos with this advanced DSLR camera.",
        price: 999.99
    }
];

const Deals = () => {
    const { addToCart } = useCart();

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
                Special Deals
            </Typography>
            <Grid container spacing={3}>
                {deals.map((deal) => (
                    <Grid item xs={12} sm={6} md={4} key={deal.id}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Card className="deal-card">
                                <Box sx={{ position: 'relative' }}>
                                    <CardMedia
                                        component="img"
                                        height="300"
                                        image={deal.image}
                                        alt={deal.name}
                                        sx={{
                                            objectFit: 'cover',
                                            background: 'transparent'
                                        }}
                                    />
                                    <Chip
                                        label={`${deal.discount}% OFF`}
                                        color="error"
                                        icon={<LocalOffer />}
                                        className="discount-badge"
                                    />
                                </Box>
                                <CardContent sx={{ height: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                    <Box>
                                        <Typography gutterBottom variant="h6" component="h2">
                                            {deal.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                            {deal.description}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                            <span>
                                                <s>${deal.originalPrice.toFixed(2)}</s>
                                                <strong>${deal.discountedPrice.toFixed(2)}</strong>
                                            </span>
                                        </Box>
                                        <Button
                                            variant="contained"
                                            startIcon={<ShoppingCart />}
                                            onClick={() => addToCart({
                                                id: deal.id,
                                                name: deal.name,
                                                price: Number(deal.discountedPrice) || 0,
                                                originalPrice: deal.originalPrice,
                                                discountedPrice: deal.discountedPrice,
                                                discount: deal.discount,
                                                image: deal.image,
                                                description: deal.description
                                            })}
                                            fullWidth
                                            sx={{
                                                background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                                                boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                                                color: 'white',
                                                '&:hover': {
                                                    background: 'linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)',
                                                    transform: 'scale(1.02)'
                                                },
                                                transition: 'all 0.3s ease-in-out',
                                            }}
                                        >
                                            Add to Cart
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Deals; 