import React from 'react';
import {
  Typography,
  Paper,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  LinearProgress,
  Button,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function Results({ results, onRestart }) {
  if (!results) return null;

  const { score, recommendations } = results;
  const parsedRecommendations = JSON.parse(recommendations);

  return (
    <Box>
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4">
            Your Economic Literacy Score
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            onClick={onRestart}
          >
            Start Over
          </Button>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box sx={{ width: '100%', mr: 1 }}>
            <LinearProgress
              variant="determinate"
              value={(score / 1500) * 100}
              sx={{ height: 20, borderRadius: 5 }}
            />
          </Box>
          <Box sx={{ minWidth: 100 }}>
            <Typography variant="h6">
              {score}/1500
            </Typography>
          </Box>
        </Box>
      </Paper>

      <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 2 }}>
        Your Personalized Recommendations
      </Typography>

      {parsedRecommendations.map((recommendation, index) => (
        <Accordion key={index} sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">
              {index + 1}. {recommendation.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography paragraph>
              {recommendation.description}
            </Typography>
            <Typography variant="h6" gutterBottom>
              12-Month Implementation Plan:
            </Typography>
            <Box component="ol" sx={{ pl: 2 }}>
              {recommendation.implementation_plan.map((step, stepIndex) => (
                <Typography component="li" key={stepIndex} paragraph>
                  Month {stepIndex + 1}: {step}
                </Typography>
              ))}
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}

export default Results; 