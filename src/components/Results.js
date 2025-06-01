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
  console.log(results)
  return (
    <Box>
       <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexDirection: isMobile ? 'column' : 'row' }}>
          <Typography variant="h6">
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
         <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 4, flexDirection: isMobile ? 'column' : 'row' }}>
           <Box sx={{ flex: 1, width: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: 'space-between' }}>
              <Typography sx={{ fontSize: 18, fontWeight: 'bold' }}>
                Total Score
              </Typography>
              <Typography sx={{ fontSize: 18, fontWeight: 'bold' }}>
                  {overall_assessment.total_score}/{question_scores.length * 100}
              </Typography>
            </Box>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress
                  variant="determinate"
                  value={(overall_assessment.total_score / (question_scores.length * 100)) * 100}
                  sx={{ height: 20, borderRadius: 5 }}
                />
              </Box>
           </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body1" sx={{ mt: 2 }}>
                {overall_assessment.score_interpretation}
              </Typography>
            </Box>
         </Box>
      </Paper>      

      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6">
            Your Financial Literacy Assessment
          </Typography>
        </Box>
         <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 4, flexDirection: isMobile ? 'column' : 'row' }}>
           <Box sx={{ flex: 1 }}>
              <ScoreChart score={overall_assessment.total_score} totalPossible={question_scores.length * 100} />
           </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body1" sx={{ mt: 2 }}>
                {overall_assessment.score_interpretation}
              </Typography>
            </Box>
         </Box>
        <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center', mb: 3 }}>
          <Button
            variant="outlined"
            color="primary"
            onClick={onRestart}
          >
            Start Over
          </Button>
        </Box>
          
      </Paper>      
      <FinancialDashboard results={results} />
    </Box>
  );
}

export default Results; 