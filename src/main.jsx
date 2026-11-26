import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import "./styles/global.css"
import "./styles/layout.css"
import "./styles/recipes.css"
import "./styles/details.css"
import "./styles/form.css"
import "./styles/home.css"
import "./styles/categories.css"
import "./styles/extras.css"
import "./styles/theme.css"
import "./styles/auth.css"
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
