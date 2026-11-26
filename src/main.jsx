import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import "./styles/base.css"
import "./styles/layout.css"
import "./styles/home.css"
import "./styles/recipes.css"
import "./styles/details.css"
import "./styles/pages.css"
import App from './App.jsx'
import AuthProvider from "./contexts/AuthProvider";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
