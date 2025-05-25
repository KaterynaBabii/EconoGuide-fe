import React from 'react';
import { Typography, Button, Paper, Box } from '@mui/material';

function Introduction({ onStart }) {
  return (
    <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
      <Typography variant="h3" component="h1" gutterBottom>
        EconoGuide
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom>
        AI-Powered Economic Literacy Checker
      </Typography>
      <Box sx={{ my: 4 }}>
        <Typography variant="body1" paragraph>
          Welcome to EconoGuide! This interactive tool will help you assess your economic literacy
          through a series of 15 carefully crafted questions. Based on your responses, our AI will
          generate personalized recommendations to improve your financial knowledge and skills.
        </Typography>
        <Typography variant="body1" paragraph>
          Each question is designed to evaluate different aspects of economic understanding,
          from basic concepts to practical financial decision-making.
        </Typography>
        <Typography variant="body1" paragraph>
          Upon completion, you'll receive:
          • A comprehensive score out of 1500
          • 7 personalized recommendations
          • A detailed 12-month implementation plan
        </Typography>
      </Box>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={onStart}
      >
        Start Assessment
      </Button>
    </Paper>
  );
}

export default Introduction; 