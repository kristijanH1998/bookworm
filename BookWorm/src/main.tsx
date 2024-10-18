import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Renders App component within the root element from index.html
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <App />
)
