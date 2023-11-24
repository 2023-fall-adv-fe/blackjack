import React from 'react';
import logo from './logo.svg';
import './App.css'
import Button from '@mui/material/Button';
import SmartDisplay from '@mui/icons-material/SmartDisplay';

function App() {
  return (
    <div className="App">
    <Button
      variant='outlined'
      size='large'
      startIcon={
        <SmartDisplay />
      }
    >
      Play Blackjack
      </Button>
    </div>
  );
}

export default App;
