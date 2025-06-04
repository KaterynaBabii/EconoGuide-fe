import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Introduction from './components/Introduction';
import Quiz from './components/Quiz';
import Results from './components/Results';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  const [currentStep, setCurrentStep] = useState('intro');
  const [quizResults, setQuizResults] = useState(null);

  const handleStartQuiz = () => {
    setCurrentStep('quiz');
  };

  const handleQuizComplete = (results) => {
    setQuizResults(results);
    setCurrentStep('results');
  };

  const handleRestart = () => {
    setCurrentStep('intro');
    setQuizResults(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          {currentStep === 'intro' && (
            <Introduction onStart={handleStartQuiz} />
          )}
          {currentStep === 'quiz' && (
            <Quiz onComplete={handleQuizComplete} onRestart={handleRestart} />
          )}
          {currentStep === 'results' && (
            <Results results={quizResults} onRestart={handleRestart} />
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App; 