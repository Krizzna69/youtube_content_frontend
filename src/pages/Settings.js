import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Switch,
  FormControlLabel,
  TextField,
  Button,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  Snackbar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Card,
  CardContent,
  Grid,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import ApiIcon from '@mui/icons-material/Api';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import SecurityIcon from '@mui/icons-material/Security';
import NotificationsIcon from '@mui/icons-material/Notifications';
import YouTubeIcon from '@mui/icons-material/YouTube';
import SaveIcon from '@mui/icons-material/Save';
import { toast } from 'react-toastify';

function Settings() {
  const [apiKey, setApiKey] = useState('');
  const [youtubeApiKey, setYoutubeApiKey] = useState('');
  const [theme, setTheme] = useState('light');
  const [maxResults, setMaxResults] = useState(10);
  const [notifications, setNotifications] = useState(true);
  const [saveHistory, setSaveHistory] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSaveSettings = () => {
    // In a real app, this would save to localStorage or a backend
    toast.success('Settings saved successfully');
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
        <SettingsIcon sx={{ mr: 1, color: 'primary.main' }} />
        <Typography variant="h4">Settings</Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Card elevation={2} sx={{ position: 'sticky', top: '80px' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Settings Menu</Typography>
              <List component="nav" aria-label="settings sections">
                <ListItem button component="a" href="#api-settings">
                  <ListItemIcon>
                    <ApiIcon />
                  </ListItemIcon>
                  <ListItemText primary="API Configuration" />
                </ListItem>
                <ListItem button component="a" href="#youtube-settings">
                  <ListItemIcon>
                    <YouTubeIcon />
                  </ListItemIcon>
                  <ListItemText primary="YouTube Integration" />
                </ListItem>
                <ListItem button component="a" href="#appearance">
                  <ListItemIcon>
                    <ColorLensIcon />
                  </ListItemIcon>
                  <ListItemText primary="Appearance" />
                </ListItem>
                <ListItem button component="a" href="#privacy">
                  <ListItemIcon>
                    <SecurityIcon />
                  </ListItemIcon>
                  <ListItemText primary="Privacy & Data" />
                </ListItem>
                <ListItem button component="a" href="#notifications">
                  <ListItemIcon>
                    <NotificationsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Notifications" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={9}>
          <Paper elevation={2} sx={{ p: 4, mb: 4 }} id="api-settings">
            <Typography variant="h5" gutterBottom>
              API Configuration
            </Typography>
            <Typography variant="body2" paragraph color="text.secondary">
              Configure your API keys to use the YouTube Content Optimizer. Your keys are stored locally and never shared.
            </Typography>
            
            <TextField
              label="Gemini API Key"
              type="password"
              fullWidth
              margin="normal"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              helperText="Enter your Google Gemini API key"
            />
            
            <Alert severity="info" sx={{ mt: 2 }}>
              You can obtain a Gemini API key from the <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer">Google AI Studio</a>.
            </Alert>
          </Paper>
          
          <Paper elevation={2} sx={{ p: 4, mb: 4 }} id="youtube-settings">
            <Typography variant="h5" gutterBottom>
              YouTube Integration
            </Typography>
            <Typography variant="body2" paragraph color="text.secondary">
              Connect to the YouTube API to directly update your video metadata and fetch video analytics.
            </Typography>
            
            <TextField
              label="YouTube API Key"
              type="password"
              fullWidth
              margin="normal"
              value={youtubeApiKey}
              onChange={(e) => setYoutubeApiKey(e.target.value)}
              helperText="Enter your YouTube Data API key"
            />
            
            <FormControl fullWidth margin="normal">
              <InputLabel id="max-results-label">Maximum Results</InputLabel>
              <Select
                labelId="max-results-label"
                value={maxResults}
                label="Maximum Results"
                onChange={(e) => setMaxResults(e.target.value)}
              >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
              </Select>
            </FormControl>
            
            <Alert severity="info" sx={{ mt: 2 }}>
              You can obtain a YouTube API key from the <a href="https://console.developers.google.com/" target="_blank" rel="noopener noreferrer">Google Developer Console</a>.
            </Alert>
          </Paper>
          
          <Paper elevation={2} sx={{ p: 4, mb: 4 }} id="appearance">
            <Typography variant="h5" gutterBottom>
              Appearance
            </Typography>
            
            <FormControl fullWidth margin="normal">
              <InputLabel id="theme-label">Theme</InputLabel>
              <Select
                labelId="theme-label"
                value={theme}
                label="Theme"
                onChange={(e) => setTheme(e.target.value)}
              >
                <MenuItem value="light">Light</MenuItem>
                <MenuItem value="dark">Dark</MenuItem>
                <MenuItem value="system">System Default</MenuItem>
              </Select>
            </FormControl>
          </Paper>
          
          <Paper elevation={2} sx={{ p: 4, mb: 4 }} id="privacy">
            <Typography variant="h5" gutterBottom>
              Privacy & Data
            </Typography>
            
            <FormControlLabel
              control={
                <Switch
                  checked={saveHistory}
                  onChange={(e) => setSaveHistory(e.target.checked)}
                  color="primary"
                />
              }
              label="Save optimization history"
            />
            
            <Typography variant="body2" sx={{ mt: 1, ml: 3 }} color="text.secondary">
              When enabled, your generated content will be saved locally for future reference.
            </Typography>
            
            <Box sx={{ mt: 3 }}>
              <Button variant="outlined" color="error">
                Clear All Data
              </Button>
            </Box>
          </Paper>
          
          <Paper elevation={2} sx={{ p: 4, mb: 4 }} id="notifications">
            <Typography variant="h5" gutterBottom>
              Notifications
            </Typography>
            
            <FormControlLabel
              control={
                <Switch
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                  color="primary"
                />
              }
              label="Enable notifications"
            />
          </Paper>
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<SaveIcon />}
              onClick={handleSaveSettings}
            >
              Save Settings
            </Button>
          </Box>
        </Grid>
      </Grid>
      
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="Settings saved successfully"
      />
    </Box>
  );
}

export default Settings;