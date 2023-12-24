import React from 'react'
import ReactDOM from 'react-dom/client'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { OpenCvProvider } from 'opencv-react'
import App from './components/App/App.jsx'
import './index.css'

const theme = createTheme({
  palette: {
    primary: {
      main: '#6BCB48'
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <OpenCvProvider openCvPath='/opencv/opencv.js'>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </OpenCvProvider>
  </React.StrictMode>,
)
