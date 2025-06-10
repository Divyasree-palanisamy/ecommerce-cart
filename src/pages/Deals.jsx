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
    Rating,
} from '@mui/material';
import { motion } from 'framer-motion';
import { ShoppingCart, LocalOffer } from '@mui/icons-material';
import { useCart } from '../contexts/CartContext';
import './Deals.css';

// Import local images for deals
import headphonesImage from '../assets/images/deals/headphones.jpg';
import tvImage from '../assets/images/deals/tv.jpg';
import fitnessTrackerImage from '../assets/images/deals/fitness-tracker.jpg';
import bluetoothSpeakerImage from '../assets/images/deals/bluetooth-speaker.jpg';
import gamingKeyboardImage from '../assets/images/deals/gaming-keyboard.jpg';
import cameraKitImage from '../assets/images/deals/camera-kit.jpg';

const deals = [
    {
        id: 1,
        name: "Premium Wireless Headphones",
        originalPrice: 299.99,
        discountedPrice: 199.99,
        discount: 33,
        image: headphonesImage, // Use imported image
        description: "High-quality wireless headphones with noise cancellation",
        rating: 4.5,
    },
    {
        id: 2,
        name: "Ultra HD 4K Smart TV",
        originalPrice: 1299.99,
        discountedPrice: 899.99,
        discount: 31,
        image: tvImage, // Use imported image
        description: "Stunning 4K resolution with smart features and voice control.",
        rating: 4.8,
    },
    {
        id: 3,
        name: "Smart Fitness Tracker",
        originalPrice: 79.99,
        discountedPrice: 49.99,
        discount: 37,
        image: fitnessTrackerImage, // Use imported image
        description: "Track your steps, heart rate, and sleep with this sleek device.",
        rating: 4.2,
    },
    {
        id: 4,
        name: "Portable Bluetooth Speaker",
        originalPrice: 99.99,
        discountedPrice: 69.99,
        discount: 30,
        image: bluetoothSpeakerImage, // Use imported image
        description: "Powerful sound in a compact design, perfect for on-the-go.",
        rating: 4.0,
    },
    {
        id: 5,
        name: "Gaming Keyboard & Mouse Combo",
        originalPrice: 149.99,
        discountedPrice: 89.99,
        discount: 40,
        image: gamingKeyboardImage, // Use imported image
        description: "Responsive mechanical keyboard and precision gaming mouse.",
        rating: 4.7,
    },
    {
        id: 6,
        name: "Professional DSLR Camera Kit",
        originalPrice: 1499.99,
        discountedPrice: 999.99,
        discount: 33,
        image: cameraKitImage, // Use imported image
        description: "Capture breathtaking photos with this advanced DSLR camera.",
        rating: 4.9,
    }
];

const Deals = () => {
    const { addToCart } = useCart();

    return (
        <Container maxWidth="lg" sx={{ py: 4 }} className="deals-page">
            <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 4, color: '#000000' }}>
                🎉 Special Deals
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
                                <Box sx={{ height: '180px', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                    <Chip
                                        label={`${deal.discount}% OFF`}
                                        color="error"
                                        icon={<LocalOffer />}
                                        className="discount-badge"
                                        sx={{ ml: 2, mt: 2, mb: 1 }}
                                    />
                                    <CardMedia
                                        component="img"
                                        image={deal.image}
                                        alt={deal.name}
                                        sx={{
                                            background: 'transparent',
                                            p: 0,
                                            flexGrow: 1,
                                            width: '100%',
                                            objectFit: 'contain',
                                        }}
                                    />
                                </Box>
                                <Typography variant="h6" component="h2" sx={{ mt: '3px', mb: 0, px: 2 }}>
                                    {deal.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ px: 2, mb: 1 }}>
                                    {deal.description}
                                </Typography>
                                <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                    <Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5, mb: 0.5 }}>
                                            <Rating value={deal.rating} precision={0.1} readOnly size="small" />
                                            <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                                                ({deal.rating.toFixed(1)})
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                            <Typography variant="h6" color="error.main">
                                                ${deal.discountedPrice.toFixed(2)}
                                            </Typography>
                                            <Typography
                                                variant="body1"
                                                sx={{
                                                    textDecoration: 'line-through',
                                                    color: '#000000'
                                                }}
                                            >
                                                ${deal.originalPrice.toFixed(2)}
                                            </Typography>
                                        </Box>
                                        <Button
                                            variant="contained"
                                            startIcon={<ShoppingCart />}
                                            onClick={() => addToCart({
                                                id: deal.id,
                                                name: deal.name,
                                                price: deal.discountedPrice,
                                                quantity: 1,
                                                image: deal.image,
                                                description: deal.description
                                            })}
                                            fullWidth
                                            sx={{
                                                background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                                                boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                                                color: '#000000',
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