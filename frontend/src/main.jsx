import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async' // 1. استيراد الموفر
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider> {/* 2. تغليف التطبيق بالكامل لكي يعمل SEO بشكل صحيح */}
      <App />
    </HelmetProvider>
  </StrictMode>,
)