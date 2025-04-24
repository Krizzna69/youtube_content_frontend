import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Switch,
  FormControlLabel,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Collapse,
  Tabs,
  Tab,
  CircularProgress,
  Divider,
  Chip,
  OutlinedInput,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { toast } from 'react-toastify';
import { styled } from '@mui/material/styles';
import { generateTitle, generateDescription, suggestTags, generateThumbnailText } from '../services/api';

// Custom styled components
const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  overflow: 'visible',
}));

const ResultCard = styled(Card)(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(3),
  overflow: 'visible',
}));

const GradientButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
  color: 'white',
  fontWeight: 'bold',
  transition: 'all 0.3s',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 12px rgba(255, 0, 0, 0.25)',
  },
}));

const CopyButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: 8,
  right: 8,
  backgroundColor: theme.palette.background.paper,
  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  '&:hover': {
    backgroundColor: theme.palette.grey[200],
  },
}));

// Enhanced styled Select component
const StyledSelect = styled(Select)(({ theme }) => ({
  '& .MuiOutlinedInput-notchedOutline': {
    borderRadius: 12,
    borderColor: theme.palette.divider,
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.light,
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.main,
    borderWidth: 2,
  },
  '& .MuiSelect-select': {
    padding: '14px 16px',
  },
  '& .MuiSvgIcon-root': {
    color: theme.palette.primary.main,
  },
}));

// Enhanced styled MenuItem component
const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  padding: '12px 16px',
  '&:hover': {
    backgroundColor: theme.palette.primary.light + '15',
  },
  '&.Mui-selected': {
    backgroundColor: theme.palette.primary.light + '30',
    fontWeight: 500,
    '&:hover': {
      backgroundColor: theme.palette.primary.light + '40',
    },
  },
}));

// Enhanced styled FormControl for selects
const StyledFormControl = styled(FormControl)(({ theme }) => ({
  '& .MuiFormLabel-root': {
    fontSize: '1rem',
    '&.Mui-focused': {
      color: theme.palette.primary.main,
    },
  },
  marginBottom: theme.spacing(2),
}));

function Dashboard() {
  const [inputType, setInputType] = useState('summary');
  const [category, setCategory] = useState('Technology');
  const [videoInput, setVideoInput] = useState('');
  const [keywords, setKeywords] = useState('');
  const [tone, setTone] = useState('Informative');
  const [includeTimestamps, setIncludeTimestamps] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [resultTab, setResultTab] = useState(0);
  const [expanded, setExpanded] = useState(false);
  
  const [results, setResults] = useState({
    title: '',
    description: '',
    tags: [],
    thumbnailText: [],
  });

  const handleInputTypeChange = (event) => {
    setInputType(event.target.value);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleResultTabChange = (event, newValue) => {
    setResultTab(newValue);
  };

  const handleCopyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      let summary = videoInput;
      if (inputType === 'existing') {
        summary = `Title: ${videoInput}\nKeywords: ${keywords}`;
      }

      // Generate title
      const titleResponse = await generateTitle({
        summary,
        category,
      });

      // Get optimized title
      const title = titleResponse.title;

      // Generate description
      const descriptionResponse = await generateDescription({
        summary,
        category,
        tone: tone.toLowerCase(),
        includeTimestamps,
      });

      // Generate tags
      const tagsResponse = await suggestTags({
        summary,
        category,
      });

      // Generate thumbnail text
      const thumbnailTextResponse = await generateThumbnailText({
        summary,
        title,
      });

      // Update state with all results
      setResults({
        title: title,
        description: descriptionResponse.description,
        tags: tagsResponse.tags,
        thumbnailText: thumbnailTextResponse.suggestions,
      });

      // Show success message
      toast.success('Content optimization completed!');
    } catch (error) {
      console.error('Error generating content:', error);
      toast.error('Failed to generate content. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderResults = () => {
    if (loading) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      );
    }

    if (!results.title) {
      return null;
    }

    return (
      <ResultCard elevation={3}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={resultTab} onChange={handleResultTabChange} aria-label="results tabs" variant="fullWidth">
            <Tab label="Title" icon={<AutoAwesomeIcon />} iconPosition="start" />
            <Tab label="Description" icon={<AutoAwesomeIcon />} iconPosition="start" />
            <Tab label="Tags" icon={<AutoAwesomeIcon />} iconPosition="start" />
            <Tab label="Thumbnail" icon={<AutoAwesomeIcon />} iconPosition="start" />
          </Tabs>
        </Box>
        
        {/* Title Tab */}
        {resultTab === 0 && (
          <Box sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>Optimized Title</Typography>
            <Paper elevation={1} sx={{ p: 3, position: 'relative', bgcolor: '#f9f9f9', borderRadius: 2 }}>
              <Typography variant="h6" color="primary">{results.title}</Typography>
              <Typography variant="caption" sx={{ display: 'block', mt: 2 }}>
                Character count: {results.title.length}/100 (YouTube limit is 100 characters)
              </Typography>
              <CopyButton 
                size="small" 
                onClick={() => handleCopyToClipboard(results.title)}
                aria-label="copy title"
              >
                <ContentCopyIcon fontSize="small" />
              </CopyButton>
            </Paper>
          </Box>
        )}
        
        {/* Description Tab */}
        {resultTab === 1 && (
          <Box sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>Optimized Description</Typography>
            <Paper elevation={1} sx={{ p: 3, position: 'relative', bgcolor: '#f9f9f9', borderRadius: 2 }}>
              <Typography 
                variant="body1" 
                sx={{ 
                  whiteSpace: 'pre-line'
                }}
              >
                {results.description}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="caption">
                Character count: {results.description.length}/5000 (YouTube limit is 5000 characters)
              </Typography>
              <CopyButton 
                size="small" 
                onClick={() => handleCopyToClipboard(results.description)}
                aria-label="copy description"
              >
                <ContentCopyIcon fontSize="small" />
              </CopyButton>
            </Paper>
          </Box>
        )}
        
        {/* Tags Tab */}
        {resultTab === 2 && (
          <Box sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>Suggested Tags</Typography>
            <Paper elevation={1} sx={{ p: 3, position: 'relative', bgcolor: '#f9f9f9', borderRadius: 2 }}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {results.tags.map((tag, index) => (
                  <Chip 
                    key={index} 
                    label={tag} 
                    color="primary" 
                    variant="outlined" 
                    size="medium"
                  />
                ))}
              </Box>
              <Divider sx={{ my: 2 }} />
              <Typography variant="caption">
                Total tags: {results.tags.length} | Character count: {results.tags.join(', ').length}/500 (YouTube limit is 500 characters)
              </Typography>
              <CopyButton 
                size="small" 
                onClick={() => handleCopyToClipboard(results.tags.join(', '))}
                aria-label="copy tags"
              >
                <ContentCopyIcon fontSize="small" />
              </CopyButton>
            </Paper>
          </Box>
        )}
        
        {/* Thumbnail Tab */}
        {resultTab === 3 && (
          <Box sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>Thumbnail Text Options</Typography>
            <Grid container spacing={2}>
              {results.thumbnailText.map((text, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Paper 
                    elevation={2} 
                    sx={{ 
                      p: 3, 
                      textAlign: 'center',
                      position: 'relative',
                      bgcolor: '#f9f9f9',
                      borderRadius: 2,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography variant="h4" fontWeight="bold" color="primary">
                      {text}
                    </Typography>
                    <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
                      <IconButton 
                        size="small" 
                        onClick={() => handleCopyToClipboard(text)}
                        sx={{ backgroundColor: 'white', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}
                      >
                        <ContentCopyIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </ResultCard>
    );
  };

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
        <AutoAwesomeIcon sx={{ mr: 1, color: 'primary.main' }} />
        <Typography variant="h4">YouTube Content Optimizer</Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <StyledCard elevation={3}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Generate Optimized Content
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Enhance your YouTube video's discoverability with AI-powered metadata optimization. 
                Simply enter your video details below and get optimized titles, descriptions, and tags.
              </Typography>
              
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <StyledFormControl fullWidth>
                      <InputLabel id="input-type-label">Input Type</InputLabel>
                      <StyledSelect
                        labelId="input-type-label"
                        id="input-type-select"
                        value={inputType}
                        label="Input Type"
                        onChange={handleInputTypeChange}
                        input={<OutlinedInput label="Input Type" />}
                        MenuProps={{
                          PaperProps: {
                            elevation: 3,
                            sx: {
                              borderRadius: 2,
                              mt: 0.5,
                              '& .MuiList-root': {
                                py: 1,
                              },
                            },
                          },
                        }}
                      >
                        <StyledMenuItem value="summary">Video Summary</StyledMenuItem>
                        <StyledMenuItem value="transcript">Video Transcript</StyledMenuItem>
                        <StyledMenuItem value="existing">Existing Title & Keywords</StyledMenuItem>
                      </StyledSelect>
                    </StyledFormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <StyledFormControl fullWidth>
                      <InputLabel id="category-label">Content Category</InputLabel>
                      <StyledSelect
                        labelId="category-label"
                        id="category-select"
                        value={category}
                        label="Content Category"
                        onChange={(e) => setCategory(e.target.value)}
                        input={<OutlinedInput label="Content Category" />}
                        MenuProps={{
                          PaperProps: {
                            elevation: 3,
                            sx: {
                              borderRadius: 2,
                              mt: 0.5,
                              maxHeight: 300,
                              '& .MuiList-root': {
                                py: 1,
                              },
                            },
                          },
                        }}
                      >
                        <StyledMenuItem value="Technology">Technology</StyledMenuItem>
                        <StyledMenuItem value="Gaming">Gaming</StyledMenuItem>
                        <StyledMenuItem value="Education">Education</StyledMenuItem>
                        <StyledMenuItem value="Entertainment">Entertainment</StyledMenuItem>
                        <StyledMenuItem value="Lifestyle">Lifestyle</StyledMenuItem>
                        <StyledMenuItem value="Travel">Travel</StyledMenuItem>
                        <StyledMenuItem value="Cooking">Cooking</StyledMenuItem>
                        <StyledMenuItem value="Fitness">Fitness</StyledMenuItem>
                        <StyledMenuItem value="Business">Business</StyledMenuItem>
                        <StyledMenuItem value="Other">Other</StyledMenuItem>
                      </StyledSelect>
                    </StyledFormControl>
                  </Grid>
                </Grid>

                {inputType === 'existing' ? (
                  <Grid container spacing={3} sx={{ mt: 0 }}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Existing Title"
                        value={videoInput}
                        onChange={(e) => setVideoInput(e.target.value)}
                        required
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                          },
                          mb: 2
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Keywords (comma separated)"
                        value={keywords}
                        onChange={(e) => setKeywords(e.target.value)}
                        placeholder="gaming, tutorial, minecraft, etc."
                        required
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                          },
                        }}
                      />
                    </Grid>
                  </Grid>
                ) : (
                  <Grid container spacing={3} sx={{ mt: 0 }}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label={inputType === 'summary' ? "Video Summary" : "Video Transcript"}
                        multiline
                        rows={5}
                        value={videoInput}
                        onChange={(e) => setVideoInput(e.target.value)}
                        placeholder={inputType === 'summary' 
                          ? "Describe what your video is about in a few sentences..." 
                          : "Paste a section of your video transcript here..."}
                        required
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                          },
                        }}
                      />
                    </Grid>
                  </Grid>
                )}

                <Button
                  variant="text"
                  color="primary"
                  onClick={handleExpandClick}
                  endIcon={expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  sx={{ mt: 2 }}
                >
                  Advanced Options
                </Button>

                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <Grid container spacing={3} sx={{ mt: 0 }}>
                    <Grid item xs={12} sm={6}>
                      <StyledFormControl fullWidth>
                        <InputLabel id="tone-label">Description Tone</InputLabel>
                        <StyledSelect
                          labelId="tone-label"
                          id="tone-select"
                          value={tone}
                          label="Description Tone"
                          onChange={(e) => setTone(e.target.value)}
                          input={<OutlinedInput label="Description Tone" />}
                          MenuProps={{
                            PaperProps: {
                              elevation: 3,
                              sx: {
                                borderRadius: 2,
                                mt: 0.5,
                                '& .MuiList-root': {
                                  py: 1,
                                },
                              },
                            },
                          }}
                        >
                          <StyledMenuItem value="Casual">Casual</StyledMenuItem>
                          <StyledMenuItem value="Conversational">Conversational</StyledMenuItem>
                          <StyledMenuItem value="Informative">Informative</StyledMenuItem>
                          <StyledMenuItem value="Professional">Professional</StyledMenuItem>
                          <StyledMenuItem value="Enthusiastic">Enthusiastic</StyledMenuItem>
                        </StyledSelect>
                      </StyledFormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={includeTimestamps}
                            onChange={(e) => setIncludeTimestamps(e.target.checked)}
                            color="primary"
                            sx={{
                              '& .MuiSwitch-switchBase.Mui-checked': {
                                color: 'primary.main',
                              },
                              '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                backgroundColor: 'primary.main',
                              },
                            }}
                          />
                        }
                        label="Include timestamp placeholders in description"
                        sx={{ height: '100%', display: 'flex', alignItems: 'center' }}
                      />
                    </Grid>
                  </Grid>
                </Collapse>
              </Box>
            </CardContent>

            <CardActions sx={{ p: 3, pt: 1 }}>
              <GradientButton 
                size="large" 
                variant="contained" 
                fullWidth 
                startIcon={<AutoAwesomeIcon />}
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Generate Optimized Content'}
              </GradientButton>
            </CardActions>
          </StyledCard>
        </Grid>
      </Grid>

      {renderResults()}
    </Box>
  );
}

export default Dashboard;