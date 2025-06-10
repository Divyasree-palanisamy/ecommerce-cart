import React, { useState } from 'react';
import {
    Container,
    Typography,
    Box,
    TextField,
    Button,
    Paper,
    Link,
    InputAdornment,
    IconButton,
    Grid,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle registration logic here
        console.log('Registration data:', formData);
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 8, mb: 4 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 3,
                    }}
                >
                    <Box sx={{ textAlign: 'center', mb: 2 }}>
                        <Typography variant="h4" component="h1" gutterBottom>
                            Create Account
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Please fill in the information below
                        </Typography>
                    </Box>

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                label="First Name"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                autoComplete="given-name"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                label="Last Name"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                autoComplete="family-name"
                            />
                        </Grid>
                    </Grid>

                    <TextField
                        required
                        fullWidth
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="email"
                    />

                    <TextField
                        required
                        fullWidth
                        label="Password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={handleChange}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPassword(!showPassword)}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <TextField
                        required
                        fullWidth
                        label="Confirm Password"
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        edge="end"
                                    >
                                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        size="large"
                        sx={{ mt: 2 }}
                    >
                        Create Account
                    </Button>

                    <Box sx={{ textAlign: 'center', mt: 2 }}>
                        <Typography variant="body2">
                            Already have an account?{' '}
                            <Link component={RouterLink} to="/login">
                                Sign in
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default Register; 