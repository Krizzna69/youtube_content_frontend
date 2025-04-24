import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  Divider,
  Chip,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import HistoryIcon from '@mui/icons-material/History';
import { toast } from 'react-toastify';

// Mock data - in a real app this would come from localStorage or a database
const mockHistory = [
  {
    id: '1',
    date: 'April 17, 2025',
    title: 'Top 10 AI Tools That Will Revolutionize Content Creation in 2025',
    description: 'Discover the most powerful AI tools for content creators in 2025...',
    tags: ['AI tools', 'content creation', 'productivity', '2025 trends'],
    category: 'Technology',
  },
  {
    id: '2',
    date: 'April 15, 2025',
    title: 'How to Grow Your YouTube Channel from 0 to 10K Subscribers',
    description: 'In this comprehensive guide, I share my proven strategies for growing...',
    tags: ['youtube growth', 'subscribers', 'content strategy'],
    category: 'Education',
  },
];

function History() {
  const [history, setHistory] = React.useState(mockHistory);

  const handleCopyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const handleDelete = (id) => {
    setHistory(history.filter(item => item.id !== id));
    toast.success('Item removed from history');
  };

  const handleClear = () => {
    setHistory([]);
    toast.success('History cleared');
  };

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <HistoryIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h4">Optimization History</Typography>
        </Box>
        {history.length > 0 && (
          <Button 
            variant="outlined" 
            color="error" 
            startIcon={<DeleteIcon />}
            onClick={handleClear}
          >
            Clear History
          </Button>
        )}
      </Box>

      {history.length === 0 ? (
        <Paper elevation={2} sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">
            Your optimization history will appear here
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            After generating optimized content, it will be saved in your history for easy reference
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {history.map((item) => (
            <Grid item xs={12} key={item.id}>
              <Card elevation={2}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        {item.date}
                      </Typography>
                      <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                        {item.title}
                      </Typography>
                      <Chip 
                        label={item.category} 
                        size="small" 
                        sx={{ mt: 1 }} 
                        color="primary" 
                        variant="outlined" 
                      />
                    </Box>
                    <IconButton 
                      color="error" 
                      onClick={() => handleDelete(item.id)}
                      aria-label="delete"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {item.description.substring(0, 150)}...
                  </Typography>
                  
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {item.tags.map((tag, index) => (
                      <Chip key={index} label={tag} size="small" />
                    ))}
                  </Box>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                  <Button 
                    size="small" 
                    startIcon={<ContentCopyIcon />}
                    onClick={() => handleCopyToClipboard(item.title)}
                  >
                    Copy Title
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default History;