import React, { useEffect } from 'react';
import {
    Container,
    Typography,
    Grid,
    Paper,
    Box,
    Card,
    CardContent,
    CardMedia,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    useTheme, // Import useTheme hook
} from '@mui/material';
import {
    Speed,
    Security,
    LocalShipping,
    Support,
    People,
    Storefront,
    ThumbUp,
    Verified,
    LightbulbOutlined, // For Vision
    RocketLaunchOutlined, // For Mission
    InfoOutlined, // For Interesting Facts
} from '@mui/icons-material';
import { motion } from 'framer-motion';

// Import placeholder images for team members (products)
import teamMember1 from '../assets/images/products/laptop1.jpeg';
import teamMember2 from '../assets/images/products/phone1.jpeg';
import teamMember3 from '../assets/images/products/tablet1.jpeg';
import teamMember4 from '../assets/images/products/camera1.jpeg';
import teamMember5 from '../assets/images/products/smartwatch1.jpeg';
import teamMember6 from '../assets/images/products/headphones1.jpeg';

// Import background video
import bgVideo from '../assets/videos/bg1q.jpeg';

// Import hero video
import heroVideo from '../assets/videos/hero-video.mp4';

const About = () => {
    const theme = useTheme(); // Use the theme to access colors and shadows

    useEffect(() => {
        console.log('About component mounted');
    }, []);

    const teamMembers = [
        {
            name: 'Laptops',
            position: 'High-Performance',
            image: teamMember1,
        },
        {
            name: 'Smart Phones',
            position: 'Cutting-Edge Mobiles',
            image: teamMember2,
        },
        {
            name: 'Tablets',
            position: 'Versatile & Portable',
            image: teamMember3,
        },
        {
            name: 'Cameras',
            position: 'Capture Moments',
            image: teamMember4,
        },
        {
            name: 'Smart Watches',
            position: 'Wearable Tech',
            image: teamMember5,
        },
        {
            name: 'Headphones',
            position: 'Immersive Audio',
            image: teamMember6,
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1, // Stagger children animations
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring', // Smoother animation
                stiffness: 100,
            },
        },
    };

    return (
        <motion.div
            className="about-page"
            initial="hidden"
            animate="visible"
            variants={containerVariants} // Apply container variants
        >
            <Container maxWidth="lg" sx={{ mt: 4, mb: 8, overflowX: 'hidden' }} disableGutters>
                {/* Hero Section with Video Background */}
                <motion.div variants={itemVariants}>
                    <Paper
                        elevation={6} // More prominent shadow
                        sx={{
                            position: 'relative',
                            height: { xs: '300px', sm: '400px', md: '450px' }, // Responsive height
                            overflow: 'hidden',
                            borderRadius: '12px',
                            boxShadow: theme.shadows[10], // Use theme shadows for depth
                        }}
                    >
                        {/* Video content for the hero section */}
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                overflow: 'hidden',
                                zIndex: 0,
                                borderRadius: '12px',
                            }}
                        >
                            <video
                                autoPlay
                                loop
                                muted
                                playsInline
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    display: 'block',
                                }}
                            >
                                <source src={heroVideo} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </Box>
                        {/* Overlay content */}
                        <Box sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            color: theme.palette.common.white, // White text for contrast
                            textAlign: 'center',
                            zIndex: 1,
                            width: { xs: '90%', sm: '80%', md: '70%' },
                            padding: { xs: '1rem', sm: '2rem', md: '2.5rem' },
                            background: 'rgba(23, 32, 42, 0.75)', // Darker, more professional overlay
                            borderRadius: '12px',
                            backdropFilter: 'blur(5px)', // Increased blur for better separation
                            boxShadow: theme.shadows[5], // Shadow on the overlay
                        }}>
                            <Typography
                                variant="h2"
                                component="h1"
                                gutterBottom
                                sx={{
                                    color: theme.palette.common.white, // Explicitly white
                                    textShadow: '2px 2px 4px rgba(0,0,0,0.1)', // Add text shadow
                                }}
                            >
                                About TechShop
                            </Typography>
                            <Typography
                                variant="h5"
                                sx={{
                                    color: theme.palette.grey[300], // Slightly off-white for subheading
                                    mt: 2,
                                }}
                            >
                                Your trusted destination for premium tech products...
                            </Typography>
                        </Box>
                    </Paper>
                </motion.div>

                {/* Our Interesting Facts Section - Now in a separate box */}
                <motion.div variants={itemVariants}>
                    <Paper
                        elevation={4} // Added elevation
                        sx={{
                            p: { xs: 3, md: 6 },
                            mb: 6,
                            mt: 6,
                            background: theme.palette.background.paper,
                            textAlign: 'center',
                            borderLeft: `8px solid ${theme.palette.primary.main}`, // Left border for accent
                            borderRadius: '12px',
                            boxShadow: theme.shadows[6], // Deeper shadow for prominence
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
                            <InfoOutlined sx={{ fontSize: '3rem', color: theme.palette.primary.main, mr: 2 }} />
                            <Typography variant="h4" component="h2" sx={{ color: theme.palette.primary.main, fontWeight: 700 }}>
                                Our Interesting Facts
                            </Typography>
                        </Box>
                        <Typography variant="body1" paragraph sx={{ maxWidth: '800px', margin: '0 auto', color: theme.palette.text.primary }}>
                            At TechShop, we are passionate about bringing cutting-edge electronics into the hands of enthusiasts and everyday users alike. Our curated selection includes high-performance gaming laptops, immersive headphones, sleek smartwatches, versatile tablets, powerful smartphones, and professional cameras—all offered at competitive prices without compromising on quality.
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ maxWidth: '800px', margin: '0 auto', color: theme.palette.text.primary }}>
                            Our mission is to democratize premium technology, making it accessible to everyone. We achieve this by meticulously sourcing products, ensuring exceptional customer service, and providing expert guidance every step of the way. We believe that owning advanced tech should be a seamless and rewarding experience.
                        </Typography>
                    </Paper>
                </motion.div>

                {/* Our Vision & Mission Section - Now in separate boxes */}
                <Grid container spacing={4} sx={{ mb: 6 }} alignItems="stretch"> {/* alignItems="stretch" to ensure equal height */}
                    <Grid item xs={12} md={6}>
                        <motion.div variants={itemVariants}>
                            <Paper
                                elevation={4}
                                sx={{
                                    p: { xs: 3, md: 5 },
                                    height: '100%', // Ensure equal height
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    background: `linear-gradient(45deg, ${theme.palette.primary.light} 30%, ${theme.palette.primary.main} 90%)`, // Gradient background
                                    color: 'white',
                                    borderRadius: '12px',
                                    boxShadow: theme.shadows[6],
                                    transition: 'transform 0.3s ease-in-out',
                                    '&:hover': {
                                        transform: 'translateY(-5px)',
                                        boxShadow: theme.shadows[8],
                                    }
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <LightbulbOutlined sx={{ fontSize: '3rem', color: theme.palette.secondary.main, mr: 2 }} />
                                    <Typography variant="h4" component="h3" sx={{ color: theme.palette.common.white, fontWeight: 700 }}>
                                        Our Vision
                                    </Typography>
                                </Box>
                                <Typography variant="body1" paragraph sx={{ color: theme.palette.grey[200], flexGrow: 1 }}>
                                    To be the leading global e-commerce platform for electronics, recognized for our commitment to innovation, unparalleled customer satisfaction, and delivering a truly seamless and inspiring shopping experience.
                                </Typography>
                            </Paper>
                        </motion.div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <motion.div variants={itemVariants}>
                            <Paper
                                elevation={4}
                                sx={{
                                    p: { xs: 3, md: 5 },
                                    height: '100%', // Ensure equal height
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    background: theme.palette.background.paper, // White background for contrast
                                    border: `1px solid ${theme.palette.primary.light}`, // Subtle border
                                    borderRadius: '12px',
                                    boxShadow: theme.shadows[6],
                                    transition: 'transform 0.3s ease-in-out',
                                    '&:hover': {
                                        transform: 'translateY(-5px)',
                                        boxShadow: theme.shadows[8],
                                    }
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <RocketLaunchOutlined sx={{ fontSize: '3rem', color: theme.palette.primary.main, mr: 2 }} />
                                    <Typography variant="h4" component="h3" sx={{ color: theme.palette.primary.main, fontWeight: 700 }}>
                                        Our Mission
                                    </Typography>
                                </Box>
                                <Typography variant="body1" paragraph sx={{ color: theme.palette.text.primary, flexGrow: 1 }}>
                                    To empower our customers by providing a diverse and continuously updated range of high-quality tech products, backed by expert support and a dedication to transparency and continuous improvement in every interaction.
                                </Typography>
                            </Paper>
                        </motion.div>
                    </Grid>
                </Grid>

                {/* Team Section (now "About our Products") */}
                <Box sx={{ mb: 6 }}>
                    <Typography variant="h4" gutterBottom align="center" sx={{ color: theme.palette.primary.main, mb: 4 }}>
                        Explore Our Product Categories
                    </Typography>
                    <Grid container spacing={4} justifyContent="center"> {/* Centered grid */}
                        {teamMembers.map((member, index) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={index}> {/* Adjusted grid sizes */}
                                <motion.div variants={itemVariants}>
                                    <Card
                                        sx={{
                                            height: '100%', // Ensure cards have same height
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <CardMedia
                                            component="img"
                                            image={member.image}
                                            alt={member.name}
                                            sx={{
                                                height: 220, // Consistent image height
                                                objectFit: 'cover',
                                                borderTopLeftRadius: '12px',
                                                borderTopRightRadius: '12px',
                                            }}
                                        />
                                        <CardContent sx={{ textAlign: 'center', background: theme.palette.background.paper, flexGrow: 1 }}>
                                            <Typography variant="h6" gutterBottom sx={{ color: theme.palette.text.primary }}>
                                                {member.name}
                                            </Typography>
                                            <Typography variant="subtitle1" color="text.secondary">
                                                {member.position}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* Values Section */}
                <motion.div variants={itemVariants}>
                    <Paper sx={{ p: { xs: 3, md: 6 }, background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`, color: 'white' }}>
                        <Typography variant="h4" gutterBottom align="center" sx={{ color: theme.palette.common.white, mb: 4 }}>
                            Our Core Values
                        </Typography>
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={6}>
                                <List>
                                    <ListItem>
                                        <ListItemIcon sx={{ minWidth: '40px', color: theme.palette.secondary.main }}>
                                            <People fontSize="large" />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={<Typography variant="h6" sx={{ color: theme.palette.common.white }}>Customer First</Typography>}
                                            secondary={<Typography variant="subtitle1" sx={{ color: theme.palette.grey[300] }}>We prioritize our customers' needs above all else, ensuring satisfaction.</Typography>}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon sx={{ minWidth: '40px', color: theme.palette.secondary.main }}>
                                            <Storefront fontSize="large" />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={<Typography variant="h6" sx={{ color: theme.palette.common.white }}>Quality Products</Typography>}
                                            secondary={<Typography variant="subtitle1" sx={{ color: theme.palette.grey[300] }}>We meticulously select products that meet the highest standards of performance and durability.</Typography>}
                                        />
                                    </ListItem>
                                </List>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <List>
                                    <ListItem>
                                        <ListItemIcon sx={{ minWidth: '40px', color: theme.palette.secondary.main }}>
                                            <ThumbUp fontSize="large" />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={<Typography variant="h6" sx={{ color: theme.palette.common.white }}>Excellence in Service</Typography>}
                                            secondary={<Typography variant="subtitle1" sx={{ color: theme.palette.grey[300] }}>We strive for excellence in every interaction, from Browse to after-sales support.</Typography>}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon sx={{ minWidth: '40px', color: theme.palette.secondary.main }}>
                                            <Verified fontSize="large" />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={<Typography variant="h6" sx={{ color: theme.palette.common.white }}>Trust & Reliability</Typography>}
                                            secondary={<Typography variant="subtitle1" sx={{ color: theme.palette.grey[300] }}>Building lasting relationships through reliable service and transparent practices.</Typography>}
                                        />
                                    </ListItem>
                                </List>
                            </Grid>
                        </Grid>
                    </Paper>
                </motion.div>
            </Container>
        </motion.div>
    );
};

export default About;