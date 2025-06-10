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
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
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
        // Handle login logic here
        console.log('Login data:', formData);
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
                            Welcome Back
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Please sign in to continue
                        </Typography>
                    </Box>

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
                        autoComplete="current-password"
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

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        size="large"
                        sx={{ mt: 2 }}
                    >
                        Sign In
                    </Button>

                    <Box sx={{ textAlign: 'center', mt: 2 }}>
                        <Typography variant="body2">
                            Don't have an account?{' '}
                            <Link component={RouterLink} to="/register">
                                Sign up
                            </Link>
                        </Typography>
                        <Link
                            component={RouterLink}
                            to="/forgot-password"
                            sx={{ display: 'inline-block', mt: 1 }}
                        >
                            Forgot password?
                        </Link>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default Login; 