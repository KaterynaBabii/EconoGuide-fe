import React, { useState, useEffect } from 'react';
import {
  Typography,
  Button,
  Paper,
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
  LinearProgress,
} from '@mui/material';
import Loading from './Loading';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';

import ScoreChart from './ScoreChart';
import { fetchQuizQuestions, submitQuizAnswers } from '../services/api.js';


function Quiz({ onComplete, onRestart }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resultLoading, setResultLoading] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [error, setError] = useState(null);
  const [quizResults, setQuizResults] = useState(null);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      const questions = await fetchQuizQuestions();
      setQuestions(questions);
      setError(null);
    } catch (error) {
      console.error('Error loading questions:', error);
      setError(error.message || 'Failed to load questions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (answer) => {
    if (!questions[currentQuestion]) return;
    
    setSelectedAnswer(answer);
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = {
      question_id: currentQuestion + 1,
      question: questions[currentQuestion].question,
      selected_answer: answer,
      all_answers: questions[currentQuestion].answers
    };
    setAnswers(newAnswers);
  };

  const handleBack = () => {
    setCurrentQuestion(currentQuestion - 1);
    setSelectedAnswer(answers[currentQuestion - 1]?.selected_answer || '');
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(answers[currentQuestion + 1]?.selected_answer || '');
    } else {
      handleQuizSubmit(answers);
    }
  };

  const handleQuizSubmit = async (finalAnswers) => {
    setResultLoading(true);
    try {
      const results = await submitQuizAnswers(finalAnswers);
      setQuizResults(results);
      onComplete(results);
    } catch (error) {
      console.error('Error submitting quiz:', error);
      setError(error.message || 'Failed to submit quiz. Please try again.');
    } finally {
      setResultLoading(false);
    }
  };

  if (loading) {
    return (
        <Loading message="Preparing your financial literacy assessment..." />
    );
  }

  if (resultLoading) {
    return (
        <Loading message="Analyzing your answers and generating personalized recommendations..." />
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography color="error" gutterBottom>{error}</Typography>
        <Button variant="contained" onClick={loadQuestions}>
          Try Again
        </Button>
      </Box>
    );
  }

  // if (quizResults) {
  //   return (
  //     <Paper elevation={3} sx={{ p: 4 }}>
  //       <Typography variant="h4" gutterBottom align="center">
  //         Quiz Results
  //       </Typography>
  //       <Box sx={{ my: 4 }}>
  //         <ScoreChart 
  //           score={quizResults.score || 0} 
  //           totalPossible={questions.length} 
  //         />
  //       </Box>
  //       <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
  //         <Button
  //           variant="contained"
  //           color="primary"
  //           onClick={onRestart}
  //         >
  //           Take Quiz Again
  //         </Button>
  //       </Box>
  //     </Paper>
  //   );
  // }


  if (!questions.length || !questions[currentQuestion]) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography>No questions available.</Typography>
        <Button variant="contained" onClick={loadQuestions}>
          Reload Questions
        </Button>
      </Box>
    );
  }

  const question = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;

  return (
    <Paper elevation={3} sx={{ p: 4, backgroundColor: '#f5f5f5' }}>
       <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
         <Typography variant="body2" sx={{ fontSize: '1.2rem', fontWeight: 600 }}>
             {currentQuestion + 1}/{questions.length}
        </Typography>
        <Box sx={{ width: '90%' }}>
          <LinearProgress
            variant="buffer"
            value={(currentQuestion / questions.length) * 100}
            sx={{ height: 10, borderRadius: 5 }}
          />
        </Box>
        <CloseIcon onClick={onRestart} />
      </Box>
      <Box sx={{ px: 5 }}>
        <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', py: 4, fontWeight: 500 }}>
          {question.question}
        </Typography>

        <RadioGroup 
          value={selectedAnswer}
          onChange={(e) => handleAnswer(e.target.value)}
        >
          {question.answers?.map((answer) => (
            <FormControlLabel
              key={answer}
              value={answer}
              control={<Radio />}
              label={answer}
              sx={{
                backgroundColor: '#fff',
                borderRadius: 3,
                marginBottom: 2,
                padding: 1,
              }}
            />
          )) || null}
        </RadioGroup>
      </Box>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
          <Button
            startIcon={<ArrowBackIcon />}
            sx={{
              background: 'none',
              border: 'none',
              boxShadow: 'none',
              padding: 0,
              textTransform: 'capitalize',
              minWidth: 0,
              '&:hover': {
                background: 'transparent',
              },
            }}
            onClick={handleBack}
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            disabled={!selectedAnswer}
            onClick={handleNext}
            sx={{ borderRadius: 3, px: 4, textTransform: 'capitalize' }}
          >
            {isLastQuestion ? 'Finish' : 'Next'}
          </Button>
        </Box>
    </Paper>
  );
}

export default Quiz; 