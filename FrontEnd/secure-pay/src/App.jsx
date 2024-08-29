import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import BorrowForm from './BorrowForm';

function App() {
  const handleBorrowSubmit = (data) => {
    console.log('Borrow Request Submitted:', data);
    // Here, you would handle the submission, e.g., by calling an API
  };

  return (
    <div className="App">
    <BorrowForm onSubmit={handleBorrowSubmit} />
  </div>
  )
}

export default App
