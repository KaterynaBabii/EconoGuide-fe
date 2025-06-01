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

function Quiz({ onComplete, onRestart }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resultLoading, setResultLoading] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [error, setError] = useState(null);

  const API_URL = "https://econoguide-backend-349130934423.us-central1.run.app/" || 'http://localhost:8000';

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await fetch(`${API_URL}/generate-questions`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to fetch questions');
      }
      const data = await response.json();
      
      // Validate response data
      if (!data.questions || !Array.isArray(data.questions) || data.questions.length === 0) {
        throw new Error('Invalid questions format received from server');
      }
      
      setQuestions(data.questions);
      setLoading(false);
      setError(null);
    } catch (error) {
      console.error('Error fetching questions:', error);
      setLoading(false);
      setError(error.message || 'Failed to load questions. Please try again.');
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

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(answers[currentQuestion + 1]?.selected_answer || '');
    } else {
      submitQuiz(answers);
    }
  };

  const submitQuiz = async (finalAnswers) => {
    setResultLoading(true);
    try {
      const response = await fetch(`${API_URL}/submit-quiz`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers: finalAnswers }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to submit quiz');
      }
      
      const results = await response.json();
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
      <Paper elevation={3} sx={{ p: 4 }}>
        <Loading message="Preparing your financial literacy assessment..." />
      </Paper>
    );
  }

  if (resultLoading) {
    return (
      <Paper elevation={3} sx={{ p: 4 }}>
        <Loading message="Analyzing your answers and generating personalized recommendations..." />
      </Paper>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography color="error" gutterBottom>{error}</Typography>
        <Button variant="contained" onClick={fetchQuestions}>
          Try Again
        </Button>
      </Box>
    );
  }

  // Ensure we have questions before rendering
  if (!questions.length || !questions[currentQuestion]) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography>No questions available.</Typography>
        <Button variant="contained" onClick={fetchQuestions}>
          Reload Questions
        </Button>
      </Box>
    );
  }

  const question = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;

  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Box sx={{ mb: 4 }}>
        <LinearProgress
          variant="determinate"
          value={(currentQuestion / questions.length) * 100}
        />
        <Typography variant="body2" sx={{ mt: 1 }}>
          Question {currentQuestion + 1} of {questions.length}
        </Typography>
      </Box>

      <Typography variant="h5" gutterBottom>
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
          />
        )) || null}
      </RadioGroup>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={onRestart}
        >
          Back to Start
        </Button>
        <Button
          variant="contained"
          color="primary"
          disabled={!selectedAnswer}
          onClick={handleNext}
        >
          {isLastQuestion ? 'Finish' : 'Next'}
        </Button>
      </Box>
    </Paper>
  );
}

export default Quiz; 