import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { VariableListProvider } from './contexts/VariableListProvider'
import { BrowserRouter } from 'react-router-dom'


ReactDOM.createRoot(document.getElementById('root')).render(

  <VariableListProvider >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </VariableListProvider>,

)
