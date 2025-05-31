import React from 'react';
import {
  Typography,
  Paper,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  LinearProgress,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function Results({ results, onRestart }) {
  if (!results) return null;

  const { question_scores, overall_assessment, targeted_recommendations } = results;

  return (
    <Box>
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4">
            Your Financial Literacy Assessment
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            onClick={onRestart}
          >
            Start Over
          </Button>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box sx={{ width: '100%', mr: 1 }}>
            <LinearProgress
              variant="determinate"
              value={(overall_assessment.total_score / (question_scores.length * 100)) * 100}
              sx={{ height: 20, borderRadius: 5 }}
            />
          </Box>
          <Box sx={{ minWidth: 100 }}>
            <Typography variant="h6">
              {overall_assessment.total_score}/{question_scores.length * 100}
            </Typography>
          </Box>
        </Box>
        <Typography variant="body1" sx={{ mt: 2 }}>
          {overall_assessment.score_interpretation}
        </Typography>
      </Paper>

      <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 2 }}>
        Question Breakdown
      </Typography>

      {question_scores.map((score) => (
        <Accordion key={`question-${score.question_id}`} sx={{ mb: 1 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              <Typography sx={{ width: '80%', flexShrink: 0 }}>
                Question {score.question_id}: {score.question}
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                Score: {score.score}/100
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography color="text.secondary" gutterBottom>
              Your answer: {score.selected_answer}
            </Typography>
            <Typography>
              {score.explanation}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}

      <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 2 }}>
        Personalized Recommendations
      </Typography>

      {targeted_recommendations.map((recommendation, index) => (
        <Accordion key={`recommendation-${recommendation.area.replace(/\s+/g, '-')}-${index}`} sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">
              {recommendation.area}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              Current Status:
            </Typography>
            <Typography paragraph>
              {recommendation.current_status}
            </Typography>
            
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              Immediate Actions:
            </Typography>
            <List>
              {recommendation.improvement_plan.immediate_actions.map((action, idx) => (
                <ListItem key={`action-${recommendation.area}-${idx}`}>
                  <ListItemText primary={action} />
                </ListItem>
              ))}
            </List>

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              Long-term Goals:
            </Typography>
            <List>
              {recommendation.improvement_plan.long_term_goals.map((goal, idx) => (
                <ListItem key={`goal-${recommendation.area}-${idx}`}>
                  <ListItemText primary={goal} />
                </ListItem>
              ))}
            </List>

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              Recommended Resources:
            </Typography>
            <List>
              {recommendation.improvement_plan.resources.map((resource, idx) => (
                <ListItem key={`resource-${recommendation.area}-${idx}`}>
                  <ListItemText primary={resource} />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}

export default Results; 