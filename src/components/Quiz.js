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

function Quiz({ onComplete, onRestart }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState('');

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await fetch('http://localhost:8000/generate-questions');
      const data = await response.json();
      setQuestions(JSON.parse(data.questions));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching questions:', error);
      setLoading(false);
    }
  };

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = {
      question_id: currentQuestion + 1,
      answer: answer
    };
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(answers[currentQuestion + 1]?.answer || '');
    } else {
      submitQuiz(answers);
    }
  };

  const submitQuiz = async (finalAnswers) => {
    try {
      const response = await fetch('http://localhost:8000/submit-quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers: finalAnswers }),
      });
      const results = await response.json();
      onComplete(results);
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };

  if (loading) {
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>
    );
  }

  const question = questions[currentQuestion];
  if (!question) return null;

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
        {question.answers.map((answer, index) => (
          <FormControlLabel
            key={index}
            value={answer}
            control={<Radio />}
            label={answer}
          />
        ))}
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