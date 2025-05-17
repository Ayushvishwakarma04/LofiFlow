import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.jsx'
import Navbar from './components/navbar.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import FutureScope from './pages/futureScope.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/futureScope" element={<FutureScope />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
