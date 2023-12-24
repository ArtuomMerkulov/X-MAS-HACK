import React from 'react'
import ReactDOM from 'react-dom/client'
import { OpenCvProvider } from 'opencv-react'
import App from './components/App/App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <OpenCvProvider openCvPath='/opencv/opencv.js'>
      <App />
    </OpenCvProvider>
  </React.StrictMode>,
)
