import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from './routes/Layout'
import './index.css'
import App from './App.jsx'
import WeatherDetail from './Components/WeatherDetail'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index={true} element={<App />} />
          <Route path="weatherDetail/:city" element={<WeatherDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
