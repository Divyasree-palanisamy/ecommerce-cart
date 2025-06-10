import React, { useState, useEffect } from 'react';
// import './Contact/Contact.css'; // Removed as per your instruction

import {
    Container,
    Typography,
    Grid,
    Paper,
    TextField,
    Button,
    Box,
    Card,
    CardContent,
    Snackbar,
    Alert,
    useTheme,
    Dialog, // Added Dialog for the custom message box
    DialogTitle, // Added DialogTitle
    DialogContent, // Added DialogContent
    DialogActions, // Added DialogActions
    IconButton, // Added IconButton for close button
} from '@mui/material';
import {
    Phone,
    Email,
    LocationOn,
    AccessTime,
    Facebook,
    Twitter,
    Instagram,
    LinkedIn,
    YouTube,
    CheckCircleOutline, // Icon for success message
    Close as CloseIcon, // Icon for closing the dialog
} from '@mui/icons-material';

// Import background image
import bgImage from '../assets/videos/bg1q.jpeg';

const Contact = () => {
    const theme = useTheme();

    useEffect(() => {
        console.log('Contact component mounted');
    }, []);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success',
    });

    // State for the custom success dialog
    const [successDialogOpen, setSuccessDialogOpen] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the form data to your backend
        console.log('Form submitted:', formData);

        // Instead of Snackbar, open the custom dialog
        setSuccessDialogOpen(true);

        // You can still use the Snackbar if you want a subtle notification in addition
        // setSnackbar({
        //     open: true,
        //     message: 'Thank you for your message. We will get back to you soon!',
        //     severity: 'success',
        // });

        // Reset form
        setFormData({
            name: '',
            email: '',
            subject: '',
            message: '',
        });
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    // Handler for closing the custom success dialog
    const handleCloseSuccessDialog = () => {
        setSuccessDialogOpen(false);
    };

    const contactInfo = [
        {
            icon: <Phone fontSize="large" />,
            title: 'Phone',
            primary: '+91 9988776655',
            secondary: 'Mon-Fri 9:00 AM - 6:00 PM',
        },
        {
            icon: <Email fontSize="large" />,
            title: 'Email',
            primary: 'support@techshop.com',
            secondary: 'sales@techshop.com',
        },
        {
            icon: <LocationOn fontSize="large" />,
            title: 'Address',
            primary: '123 Tech Street',
            secondary: 'Coimbatore - 651421',
        },
        {
            icon: <AccessTime fontSize="large" />,
            title: 'Business Hours',
            primary: 'Mon-Fri: 9:00 AM - 6:00 PM',
            secondary: 'Sat-Sun: 10:00 AM - 4:00 PM',
        },
    ];

    const socialLinks = [
        { name: 'Facebook', url: 'https://www.facebook.com/divyasree.palanisamy', icon: <Facebook fontSize="large" sx={{ color: '#1877F2' }} />, emoji: '👍' },
        { name: 'Instagram', url: 'https://www.instagram.com/accounts/onetap/?next=%2F', icon: <Instagram fontSize="large" sx={{ color: '#E4405F' }} />, emoji: '📸' },
        { name: 'LinkedIn', url: 'https://www.linkedin.com/in/divyasree-p-9603b9265/', icon: <LinkedIn fontSize="large" sx={{ color: '#0A66C2' }} />, emoji: '💼' },
        { name: 'YouTube', url: 'https://www.youtube.com/', icon: <YouTube fontSize="large" sx={{ color: '#FF0000' }} />, emoji: '▶️' },
    ];

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }} className="contact-page-container">
            {/* Header with Background Image */}
            <Paper
                elevation={0}
                sx={{
                    position: 'relative',
                    height: { xs: '300px', sm: '400px', md: '500px' },
                    mb: 6,
                    overflow: 'hidden',
                    borderRadius: 2,
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundImage: `url(${bgImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'brightness(0.7)',
                    }}
                />
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        textAlign: 'center',
                        color: 'white',
                        width: '90%',
                        maxWidth: '800px',
                        zIndex: 1,
                        background: 'rgba(0, 0, 0, 0.6)',
                        padding: { xs: '2rem', sm: '3rem', md: '4rem' },
                        borderRadius: '12px',
                        backdropFilter: 'blur(8px)',
                    }}
                >
                    <Typography
                        variant="h2"
                        component="h1"
                        gutterBottom
                        sx={{
                            fontWeight: 'bold',
                            fontSize: { xs: '2.5rem', sm: '3rem', md: '4rem' },
                            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                        }}
                    >
                        Contact Us
                    </Typography>
                    <Typography
                        variant="h5"
                        sx={{
                            opacity: 0.9,
                            fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.8rem' },
                        }}
                    >
                        We'd love to hear from you. Please get in touch!
                    </Typography>
                </Box>
            </Paper>

            {/* Contact Information Cards */}
            <Grid container spacing={4} sx={{ mb: 6 }}>
                {contactInfo.map((info, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Card sx={{ height: '100%', boxShadow: theme.shadows[3] }}>
                            <CardContent sx={{ textAlign: 'center', p: 3 }}>
                                <Box sx={{ color: theme.palette.primary.main, mb: 2 }}>
                                    {info.icon}
                                </Box>
                                <Typography variant="h6" gutterBottom color="text.primary">
                                    {info.title}
                                </Typography>
                                <Typography variant="body1" paragraph color="text.secondary">
                                    {info.primary}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {info.secondary}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Contact Form & Connect with Us Section */}
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 4, boxShadow: theme.shadows[3] }}>
                        <Typography variant="h4" sx={{ color: '#19743d' }} gutterBottom>
                            Send us a Message
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Your Name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Email Address"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Message"
                                        name="message"
                                        multiline
                                        rows={4}
                                        value={formData.message}
                                        onChange={handleChange}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        size="large"
                                        fullWidth
                                        sx={{ bgcolor: theme.palette.primary.main, '&:hover': { bgcolor: theme.palette.primary.dark } }}
                                    >
                                        Send Message
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                </Grid>

                {/* Connect with Us Section */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 4, height: '100%', boxShadow: theme.shadows[3] }}>
                        <Typography variant="h4" sx={{ color: '#19743d' }} gutterBottom>
                            Connect with Us! 🌐
                        </Typography>
                        <Typography variant="body1" color="text.secondary" paragraph>
                            Follow us on our social media channels to stay updated on the latest tech, offers, and news!
                        </Typography>
                        <Box sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                {socialLinks.map((link, index) => (
                                    <Grid item xs={12} sm={6} key={index}>
                                        <Button
                                            variant="outlined"
                                            fullWidth
                                            startIcon={link.icon}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            sx={{
                                                justifyContent: 'flex-start',
                                                p: 1.5,
                                                borderColor: theme.palette.grey[300],
                                                color: 'text.primary',
                                                '&:hover': {
                                                    borderColor: link.icon.props.sx.color || theme.palette.primary.light,
                                                    bgcolor: `${link.icon.props.sx.color}10`,
                                                },
                                            }}
                                        >
                                            {link.name} {link.emoji}
                                        </Button>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>

            {/* Snackbar for general feedback (optional, if you want it in addition to the dialog) */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbar.severity}
                    variant="filled"
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>

            {/* Custom Success Message Dialog */}
            <Dialog
                open={successDialogOpen}
                onClose={handleCloseSuccessDialog}
                aria-labelledby="success-dialog-title"
                sx={{
                    '& .MuiDialog-paper': {
                        borderRadius: 2,
                        boxShadow: theme.shadows[5],
                        p: 2, // Padding for dialog content
                    },
                }}
            >
                <DialogTitle id="success-dialog-title" sx={{ m: 0, p: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography variant="h5" component="span" sx={{ color: theme.palette.success.main, display: 'flex', alignItems: 'center' }}>
                            <CheckCircleOutline sx={{ mr: 1, fontSize: 32 }} /> Message Sent!
                        </Typography>
                        <IconButton
                            aria-label="close"
                            onClick={handleCloseSuccessDialog}
                            sx={{
                                color: (theme) => theme.palette.grey[500],
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </DialogTitle>
                <DialogContent dividers sx={{ p: 3 }}>
                    <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
                        Thank you for reaching out! Your message has been sent successfully. We appreciate your interest and will get back to you as soon as possible.
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 2, fontStyle: 'italic', color: theme.palette.text.disabled }}>
                        You can close this window now.
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ p: 2, justifyContent: 'center' }}>
                    <Button onClick={handleCloseSuccessDialog} variant="contained" sx={{ bgcolor: theme.palette.success.main, '&:hover': { bgcolor: theme.palette.success.dark } }}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default Contact;