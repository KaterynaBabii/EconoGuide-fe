import React from 'react';
import { Box, keyframes, Typography } from '@mui/material';

const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const wave = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

function Loading({ message = "Analyzing your answers..." }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        minHeight: 300,
        position: 'relative',
        p: 4,
      }}
    >
      <Box
        sx={{
          width: 100,
          height: 100,
          borderRadius: '50%',
          border: '2px solid',
          borderColor: 'primary.main',
          position: 'relative',
          animation: `${rotate} 4s linear infinite`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            width: 60,
            height: 60,
            borderRadius: '50%',
            bgcolor: 'primary.main',
            animation: `${pulse} 2s ease-in-out infinite`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            component="span"
            sx={{
              color: 'white',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              fontFamily: 'monospace',
            }}
          >
            AI
          </Box>
        </Box>
      </Box>

      <Typography variant="h6" sx={{ mt: 4, mb: 2, textAlign: 'center' }}>
        {message}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          gap: 1,
          mt: 1,
        }}
      >
        {[0, 1, 2].map((i) => (
          <Box
            key={i}
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              bgcolor: 'primary.main',
              animation: `${wave} 1s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </Box>

      {[...Array(6)].map((_, i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            width: 4,
            height: 4,
            borderRadius: '50%',
            bgcolor: 'primary.light',
            animation: `${pulse} 1.5s ease-in-out infinite`,
            animationDelay: `${i * 0.2}s`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </Box>
  );
}

export default Loading;