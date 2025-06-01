import React from 'react';
import {
  Box,
  Typography,
  Divider,
} from '@mui/material';


function AnswerBreakdownView({ results }) {
    if (!results?.question_scores) return null;

  return (
    <Box display="flex" flexDirection="column">
      {/* Row 1 */}
      <Box display="flex" alignItems="center">
        <Box flex={1} p={1}>
         <Typography variant="h6">Question</Typography>
        </Box>
        <Box flex={1} p={1}>
          <Typography variant="h6">Answer</Typography>
        </Box>
        <Box flex={1} p={1}>
          <Typography variant="h6">Score</Typography>
        </Box>
      </Box>
      <Divider color="black" pb={2}/>
       {results.question_scores.map((score) => (
                <Box display="flex" alignItems="start" pt={2}>
                    <Box flex={1} p={1}>
                    <Typography fontSize={18}>{score.question_id}: {score.question}</Typography>
                    </Box>
                    <Box flex={1} p={1}>
                    {score.selected_answer}
                    </Box>
                    <Box flex={1} p={1}>
                        <Typography color={score.score < 50 ? "error.main" : "success.main"}>
                        {score.score}/100
                        </Typography>
                        <Typography >
                        {score.explanation}
                        </Typography>
                    </Box>
            </Box>
              ))}
    </Box>
  );
}

export default AnswerBreakdownView; 