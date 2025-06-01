import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Box, Typography } from '@mui/material';

function ScoreChart({ score, totalPossible }) {
  console.log(score, totalPossible)
  const percentage = (score / totalPossible) * 100;
  
  const data = [
    { name: 'Score', value: score },
    { name: 'Remaining', value: totalPossible - score }
  ];

  const getGradientColors = (percent) => {
      // return ['#EB001B', '#FCE945', '#FCE945', '#007953'];
    if (percent >= 70) {
      return ['#4CAF50', '#FCE945', '#81C784'];
    } else if (percent >= 40) {
      return ['#FFA726', '#FFB74D']; // Yellow/Orange gradient
    } else {
      return ['#E57373', '#EF5350']; // Red gradient
    }
  };

  const colors = getGradientColors(percentage);

  return (
    <Box sx={{ 
      width: '100%', 
      height: 200, 
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <defs>
            <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={colors[0]} />
              <stop offset="50%" stopColor={colors[1]} />
              <stop offset="100%" stopColor={colors[2]} />
            </linearGradient>
          </defs>
           <Pie
             data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            startAngle={90}
            endAngle={-270}
            dataKey="value"
            cornerRadius={0}
          >
            <Cell 
              fill="url(#scoreGradient)"
              cornerRadius={40}
              style={{
                filter: 'drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.15))'
              }}
            />
            <Cell fill="#f5f5f5" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center'
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: colors[0] }}>
          {Math.round(percentage)}%
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {score}/{totalPossible}
        </Typography>
      </Box>
    </Box>
  );
}

export default ScoreChart; 