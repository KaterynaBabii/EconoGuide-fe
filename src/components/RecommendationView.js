import React, { useRef, useMemo, useState, useEffect } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  Divider,
  Link,
  Grid,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  SavingsOutlined as PiggyBankIcon,
  AssignmentOutlined as ClipboardIcon,
  TrackChangesOutlined as TargetIcon,
  MenuOutlined as MenuIcon,
} from '@mui/icons-material';


function RecommendationView({ results }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const categoryRefs = useRef({});
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const categories = useMemo(() => {
        if (!results?.targeted_recommendations) return [];
        
        return results.targeted_recommendations.map(recommendation => ({
            id: recommendation.area.toLowerCase().replace(/\s+/g, '-'),
            label: recommendation.area
        }));
    }, [results?.targeted_recommendations]);

  const [selectedCategory, setSelectedCategory] = useState(() =>  categories.length > 0 ? categories[0].id : '');

    useEffect(() => {
    if (categories.length > 0 && !categories.find(cat => cat.id === selectedCategory)) {
        setSelectedCategory(categories[0].id);
    }
    }, [categories, selectedCategory]);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setMobileMenuOpen(false);
    
    if (categoryRefs.current[categoryId]) {
      const element = categoryRefs.current[categoryId];
      const offset = 80; // Adjust this value based on your header/navigation height
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  const renderSidebar = () => (
    <List
      component="nav"
      sx={{
        width: '100%',
        maxWidth: 240,
        bgcolor: 'background.paper',
        borderRadius: 2,
        position: 'sticky',
        top: 20,
        maxHeight: 'calc(100vh - 40px)',
        overflowY: 'auto',
        ...(isMobile && {
          position: 'absolute',
          zIndex: 1,
          display: mobileMenuOpen ? 'block' : 'none',
          boxShadow: 3,
        }),
      }}
    >
      {categories.map((category) => (
        <ListItem
          key={category.id}
          button
          selected={selectedCategory === category.id}
          onClick={() => handleCategoryChange(category.id)}
          sx={{
            borderRadius: 0,
            borderBottom: '1px solid',
            '&.Mui-selected': {
              bgcolor: 'grey.200',
              '&:hover': {
                bgcolor: 'grey.200',
              },
            },
          }}
        >
          <ListItemText
            primary={category.label}
            sx={{
              '& .MuiTypography-root': {
                fontWeight: selectedCategory === category.id ? 600 : 400,
              },
            }}
          />
        </ListItem>
      ))}
    </List>
  );

  if (!results?.targeted_recommendations) return null;

  return (
    <Box sx={{ display: 'flex', gap: 3, position: 'relative', scrollBehavior: 'smooth' }}>
      {isMobile && (
        <IconButton
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          sx={{ position: 'absolute', top: -50, right: 0 }}
        >
          <MenuIcon />
        </IconButton>
      )}

      {!isMobile && (
        <Box sx={{ minWidth: 240 }}>
          {renderSidebar()}
        </Box>
      )}
      {isMobile && renderSidebar()}
      <Box sx={{ flex: 1 }}>
        {results.targeted_recommendations.map((recommendation) => {
          const categoryId = recommendation.area.toLowerCase().replace(/\s+/g, '-');

          return (
            <Box
              key={categoryId}
              ref={(el) => (categoryRefs.current[categoryId] = el)}
              sx={{ mb: 6 }}
              href={categoryId}
            >
              <Paper  elevation={0} sx={{ p: 3, mb: 3, backdropFilter: 'blur(10px)', boxShadow: '0px 0px 10px 5px rgba(0, 0, 0, 0.2)' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <PiggyBankIcon sx={{ fontSize: 32, mr: 2, color: 'primary.main' }} />
                    <Typography variant="h5" component="h2">
                    {recommendation.area}
                    </Typography>
                </Box>
                <Typography variant="body1" paragraph>
                  {recommendation.current_status}
                </Typography>

                <Grid container spacing={3}>
                  {/* Immediate Actions Section */}
                  <Grid item xs={12} md={6}>
                    <Box sx={{ height: '100%' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <ClipboardIcon sx={{ mr: 1, color: 'primary.main' }} />
                        <Typography variant="h6">Immediate Actions</Typography>
                      </Box>
                      <List>
                        {recommendation.improvement_plan.immediate_actions.map((action, idx) => (
                          <ListItem key={`${categoryId}-action-${idx}`}>
                            <ListItemText primary={action} />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  </Grid>

                  {/* Long-term Goals Section */}
                  <Grid item xs={12} md={6}>
                    <Box sx={{ height: '100%' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <TargetIcon sx={{ mr: 1, color: 'primary.main' }} />
                        <Typography variant="h6">Long-term Goals</Typography>
                      </Box>
                      <List>
                        {recommendation.improvement_plan.long_term_goals.map((goal, idx) => (
                          <ListItem key={`${categoryId}-goal-${idx}`}>
                            <ListItemText primary={goal} />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 3 }} />

                <Typography variant="h6" gutterBottom>
                  Helpful Resources
                </Typography>
                <List>
                  {recommendation.improvement_plan.resources.map((resource, idx) => (
                    <ListItem key={`${categoryId}-resource-${idx}`}>
                      <Link href={resource.includes('http') ? resource : `https://${resource}`} target="_blank" rel="noopener">
                        {resource}
                      </Link>
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export default RecommendationView; 