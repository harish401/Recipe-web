import React, { useEffect, useState } from 'react';
import { Chip, Box, Typography, Grid, Card, CardContent, CardMedia, Button, Container, AppBar, Toolbar, IconButton, Avatar, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/Auth';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const [allTags, setAllTags] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('http://localhost:3000/recipes');
        const data = await response.json();
        setRecipes(data);
        setAllTags([...new Set(data.flatMap(recipe => recipe.tags))]); // Gather all unique tags
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
  };

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleCloseMenu();
    localStorage.removeItem("userId");
    navigate('/login');
  };

  const filteredRecipes = selectedTag
    ? recipes.filter((recipe) => recipe.tags.includes(selectedTag))
    : recipes;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <img src="./logo.png" alt="logo" width="50" style={{ marginTop: 10 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
            Recipe4U
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" component="div" sx={{ mr: 3 }}>
              Home
            </Typography>
            <Typography variant="h6" component="div" sx={{ mr: 3 }}>
              Explore
            </Typography>
            <Typography variant="h6" component="div" sx={{ mr: 3 }}>
              Create
            </Typography>
            <Typography variant="h6" component="div" sx={{ mr: 3 }}>
              Profile
            </Typography>
            {!isLoggedIn && (
              <div>
                <IconButton
                  size="large"
                  edge="end"
                  color="inherit"
                  aria-label="avatar"
                  onClick={handleAvatarClick}
                >
                  <Avatar sx={{ bgcolor: 'secondary.main' }}>U</Avatar>
                </IconButton>
                <Menu
                  id="avatar-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleCloseMenu}
                >
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </div>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Container mt={5}>
        <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 1, marginTop: 10 }}>
          {allTags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              variant="outlined"
              color={selectedTag === tag ? 'primary' : 'default'}
              onClick={() => handleTagClick(tag)}
              sx={{ mr: 1, mb: 1 }}
            />
          ))}
        </Box>
        <Grid container justifyContent="center" alignItems="center" spacing={2} sx={{ mt: 4 }}>
          {filteredRecipes.map((recipe, index) => (
            <Grid key={index} item xs={12} md={10}>
              <Card elevation={0} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2, borderRadius: 3 }}>
                <img width={400} src={recipe.url} alt={recipe.title} />
                <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <CardContent>
                    <Typography variant="h5" component="div" sx={{ color: 'black' }}>
                      {recipe.title}
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'black' }}>
                      {recipe.directions} {/* Displaying the first instruction */}
                    </Typography>
                  </CardContent>
                  <Box sx={{ p: 2 }}>
                    <Button variant="contained" color="primary">
                      View Recipe
                    </Button>
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
