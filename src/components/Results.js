import React from 'react';
import {
  Typography,
  Paper,
  Box,
  LinearProgress,
  Button,
} from '@mui/material';
import FinancialDashboard from './FinancialDashboard';

function Results({ results, onRestart }) {
  if (!results) return null;

  const { question_scores, overall_assessment, targeted_recommendations } = results;
  console.log('targeted_recommendations', targeted_recommendations)
  return (
    <Box>
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4">
            Your Financial Literacy Assessment
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
              value={(overall_assessment.total_score / (question_scores.length * 100)) * 100}
              sx={{ height: 20, borderRadius: 5 }}
            />
          </Box>
          <Box sx={{ minWidth: 100 }}>
            <Typography variant="h6">
              {overall_assessment.total_score}/{question_scores.length * 100}
            </Typography>
          </Box>
        </Box>
        <Typography variant="body1" sx={{ mt: 2 }}>
          {overall_assessment.score_interpretation}
        </Typography>
      </Paper>      

      <FinancialDashboard results={results} />
    </Box>
  );
}

export default Results; 