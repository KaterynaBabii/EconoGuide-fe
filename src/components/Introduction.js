import React from 'react';
import { Typography, Button, Box, ListItemIcon, List, ListItem, useTheme, useMediaQuery, Paper } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import EconoGuide from '../assets/econo-guide.png';

function Introduction({ onStart }) {
   const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const getListItem = (text) => {
    return (
      <ListItem sx={{ padding: 0, fontSize: "1.2rem" }}>
         <ListItemIcon sx={{ minWidth: 0, mr: 1, justifyContent: 'center' }}>
          <CheckIcon color="success" />
        </ListItemIcon>
        {text}
      </ListItem>
    )
  }

  return (
    <Paper elevation={3} sx={{ p: 6 }}>
       <Box sx={{ display: 'flex', mb: 3, gap: 10, flexDirection: isMobile ? 'column' : 'row' }}>
        <Box>
          <Typography variant="h2" component="h1" gutterBottom fontWeight={600} fontSize={isMobile ? "3.5rem" : "4.5rem"}>
            EconoGuide
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom fontWeight={600}>
            Al-Powered Economic Literacy Checker
          </Typography>
            <Typography variant="body1" paragraph sx={{ my: 8, fontSize: "1.2rem" }}>
              This interactive tool will help you assess your economic literacy through a series of 15 carefully crafted questions. Based on your responses, our Al will generate personalized recommendations to improve your financial knowledge and skills.
            </Typography>
          
        </Box>
        <Box>
          <img src={EconoGuide} alt="EconoGuide" style={{ width: isMobile ? "100%" : "auto", height: isMobile ? "auto" : "100%" }} />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexDirection: isMobile ? 'column' : 'row'  }}>
        <Box>
           <Typography variant="h6" component="h5" fontWeight={600} gutterBottom>
              Upon completion, you'll receive:
          </Typography>
          <List sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {getListItem("A comprehensive score out of 1500")}
            {getListItem("7 personalized recommendations")}
            {getListItem(" A detailed 12-month implementation plan")}
          </List>
        </Box>
         <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={onStart}
          sx={{ borderRadius: 3 }}
        >
          Start Assessment
        </Button>
      </Box>
    </Paper>
  );
}

export default Introduction; 