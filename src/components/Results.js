import React from 'react';
import {
  Typography,
  Paper,
  Box,
  LinearProgress,
  Button,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import FinancialDashboard from './FinancialDashboard';
import ScoreChart from './ScoreChart';

function Results({ results, onRestart }) {
   const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  if (!results) return null;

  const { question_scores, overall_assessment } = results;

  return (
    <Box>   
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
         <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', mb: 3, flexDirection: isMobile ? 'column' : 'row' }}>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            Your Financial Literacy Assessment
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            onClick={onRestart}
             sx={{
              background: 'none',
              border: 'none',
              boxShadow: 'none',
              padding: 0,
              textTransform: 'capitalize',
              minWidth: 0,
              fontSize: '1rem',
            }}
          >
            Start Over
          </Button>
        </Box>
         <Box sx={{ display: 'flex', alignItems: 'center', m: 5, flexDirection: isMobile ? 'column' : 'row' }}>
           <Box sx={{ flex: 1 }}>
              <ScoreChart score={overall_assessment.total_score} totalPossible={question_scores.length * 100} />
           </Box>
            <Box sx={{ flex: 2 }}>
              <Typography variant="body1" sx={{ mt: 2, fontSize: '1rem' }}>
                {overall_assessment.score_interpretation}
              </Typography>
            </Box>
         </Box>    
      </Paper>      
      <FinancialDashboard results={results} />
    </Box>
  );
}

export default Results; 