import React from 'react';
import { Box, CircularProgress, Typography, Paper } from '@mui/material';

function Loading({ message = "Analyzing your answers..." }) {
  return (
    <Paper elevation={3} sx={{ p: 6 }}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="50vh" 
      >
        <CircularProgress thickness={6} size={60} />
        <Typography fontWeight="bold" sx={{ mt: 2, fontSize: "1.2rem" }}>
          {message}
        </Typography>
      </Box>
    </Paper>
  );
}

export default Loading;