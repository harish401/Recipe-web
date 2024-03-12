// Login.js
import React, { useState } from "react";
import { Typography, TextField, Button, Link, Box, Grid, Card } from "@mui/material";
import { Lock, Mail } from "@mui/icons-material";
import { useAuth } from "../context/Auth";
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const success = await login(email, password);
    setLoading(false);
    if (success) {
      return navigate('/Home'); ;
    }
  };

  return (
    <Box>
      <Card sx={{ backgroundColor: "#ffff" }} elevation={1}>
        <Typography
          variant="h4"
          fontWeight={"800"}
          fontSize={22}
          sx={{ position: "absolute", top: "2rem", left: "2rem" }}
        >
          Recipe4U
        </Typography>
      </Card>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "100vh" }}
      >
        <Grid item xs={3}>
          <Typography textAlign={"center"} variant="h4">Let's get cooking</Typography>

          <TextField
            label="Email"
            fullWidth
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              endAdornment: <Mail />,
            }}
            sx={{ mt: 2, borderRadius: 5 }}
          />

          <TextField
            label="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            InputProps={{
              endAdornment: <Lock />,
            }}
            sx={{ mt: 2, borderRadius: 5 }}
          />

          <Button
            onClick={handleSubmit}
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading}
            sx={{ mt: 4, borderRadius: 2, padding: 1 }}
          >
            {loading ? 'Loading...' : 'Login'}
          </Button>

          <Typography variant="body1" sx={{ mt: 2 }}>
            Don't have an account? <Link href="#">Sign Up</Link>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
