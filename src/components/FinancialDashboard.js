import React, { useState } from 'react';
import {
  Box,
  ToggleButtonGroup,
  ToggleButton,
  Paper,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import RecommendationView from './RecommendationView';
import AnswerBreakdownView from './AnswerBreakdownView';

function FinancialDashboard({ results }) {
   const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [view, setView] = useState('recommendation');

  const handleViewChange = (event, newView) => {
    if (newView !== null) {
      setView(newView);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 3 }}>
      <Paper
        elevation={0}
        sx={(theme) => ({
          display: 'flex',
          border: `1px solid ${theme.palette.divider}`,
          flexWrap: 'wrap',
      
          p: 0.5,
          bgcolor: 'grey.200',
          borderRadius: 10,
          width: "fit-content"

        })}
      >
        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={handleViewChange}
          aria-label="view selector"
          sx={{
            '& .MuiToggleButton-root': {
              border: 'none',
              pl: isMobile ? 2 : 8, 
              pr: isMobile ? 2 : 8,
              pb: 0,
              pt: 0,
              '&.Mui-selected': {
                bgcolor: 'white',
                borderRadius: 10,
                color: 'blue',
                '&:hover': {
                  bgcolor: 'white',
                  border: 'none',
                },
              },
            },
          }}
        >
          <ToggleButton value="breakdown" sx={{ textTransform: 'none', fontSize: isMobile ? 14 : 16 }}>
            Answer Breakdown
          </ToggleButton>
          <ToggleButton value="recommendation" sx={{ textTransform: 'none', fontSize: isMobile ? 14 : 16 }}>
            Recommendation
          </ToggleButton>
        </ToggleButtonGroup>
    </Paper>
      <Box sx={{ flex: 1 }}>
        {view === 'recommendation' ? (
          <RecommendationView results={results} />
        ) : (
         <AnswerBreakdownView results={results}/>
        )}
      </Box>
    </Box>
  );
}

export default FinancialDashboard; 