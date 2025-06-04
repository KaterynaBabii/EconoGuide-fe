const API_URL = process.env.REACT_APP_API_URL || "https://econoguide-backend-349130934423.us-central1.run.app" || 'http://localhost:8000';
  // const API_URL = "https://econoguide-backend-349130934423.us-central1.run.app/" || 'http://localhost:8000';

export const fetchQuizQuestions = async () => {
  const response = await fetch(`${API_URL}/generate-questions`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Failed to fetch questions');
  }
  const data = await response.json();
  
  if (!data.questions || !Array.isArray(data.questions) || data.questions.length === 0) {
    throw new Error('Invalid questions format received from server');
  }
  
  return data.questions;
};

export const submitQuizAnswers = async (answers) => {
  const response = await fetch(`${API_URL}/submit-quiz`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ answers }),
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Failed to submit quiz');
  }
  
  return response.json();
}; 
