# EconoGuide Frontend

A React-based frontend for the 'EconoGuide' (Economic Literacy Assessment application).
For [Hackonomics 2025](https://hackonomics25.devpost.com/) hackathon project EconoGuide.  
Project for backend - https://github.com/nbabii/EconoGuide-be



## Features

- Interactive 15-question economic literacy assessment
- Progress tracking with visual indicators
- Dynamic question navigation
- Responsive Material UI design
- Score visualization
- Expandable recommendations view

## Tech Stack

- React 18
- Material UI (MUI)
- Axios for API communication

## Project Structure

```
fe/
├── public/              
├── src/                 
│   ├── components/      
│   │   ├── Introduction.js  
│   │   ├── Quiz.js         
│   │   └── Results.js      
│   ├── App.js          
│   └── index.js        
└── package.json        
```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`.

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
