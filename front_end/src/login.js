import React, { useState } from 'react';
import axios from 'axios';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import Alert from '@mui/material/Alert';
import { TextField, Button, Box, Typography, Container, Alert, Paper } from '@mui/material';

const logoUrl = 'bank_logo.png';
const backgroundUrl = 'city_background.jpg'



const Login = ({ onLogin }) => {

    const [username, setUsername] = useState(''); 
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLoginClick = async () => {
        try {
            const response = await axios.post('http://localhost:8000/login', {
                username,
                password
            });
            
            if (response.data.message === 'Login successful!') {
                onLogin(username);
            }
            else {
                setError('Login failed');
            }
        } catch (error) {
            setError('Invalid username or password');
        }
    };

    return (
        <Container component="main" sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            alignItems: 'center',
            justifyContent: 'flex-start', // Change to 'center' to center it vertically
            backgroundImage: `url(${backgroundUrl})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            paddingTop: '64px', // Add some padding at the top or adjust as needed
        }}>
            <Paper elevation={3} sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: 2,
                backgroundColor: '#fff', // Ensure this is white
                borderRadius: '16px', // Optional: for rounded corners
                maxWidth: 400, // Set a max-width for the Paper
                width: '100%', // Make Paper width responsive
                margin: '0 auto', // Center the Paper block
                position: 'relative', // Needed for z-index to work
                zIndex: 2, // Ensure Paper is above the background
                '& > img': { // Apply styles to img tag directly within Paper
                    maxWidth: '150px',
                    height: 'auto',
                    margin: '16px 0', // Adjust space around the logo
                },
            }}>
                <img src={logoUrl} alt="Logo" />

                {/* Another Box component acting as a form element with additional top margin styling */}
                <Box component="form" sx={{ mt: 1, width: '100%' }}>
                    {/* TextField is an input component for user text input for the username */}
                    <TextField
                        margin="normal" // adds normal margin around the TextField
                        // required // indicates the field is required
                        fullWidth // the TextField will take up the full width of its parent
                        id="username" // id for the input element
                        label="Username" // the label text for the input
                        name="username" // name attribute for the input ? 
                        autoComplete="username" // helps browers auto-fill the input based on its name ?
                        autoFocus // automatically focuses this input when component loads ?
                        value={username} // controlled component with 'username' being the state
                        onChange={(e) => setUsername(e.target.value)} // updates state on user input
                        variant="outlined" // the style variant for the TextField border
                    />

                    {/* another TextField for the password */}
                    <TextField
                        margin="normal" 
                        // required 
                        fullWidth 
                        type="password"
                        id="password" 
                        label="Password" 
                        name="password" 
                        autoComplete="new-password"
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        variant="outlined"
                    />

                    {/* button component that triggers the login action when clicked */}
                    <Button
                        type="button"
                        fullWidth
                        variant="contained" // stype variant of the button, with a background colour
                        sx={{ mt: 3, mb: 2 }} // adds top and bottom margins
                        onClick={handleLoginClick} // function to call when the button is clicked
                    >
                        Login
                    </Button>
                
                {/* conditional rendering of the Alert component if there is an error */}
                {error && (
                    <Alert severity='error' sx={{ mt: 2 }}>
                        {error}
                    </Alert>
                )}
            </Box>              
        </Paper>
    </Container>
)};

export default Login;

