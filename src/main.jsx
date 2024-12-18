import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { UserProvider } from './UserProvider.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  // COMMENT BACK IN LATER
  <React.StrictMode>
    <UserProvider>
      <Router>
        <App />
      </Router>
    </UserProvider>
  </React.StrictMode>
)
