import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
// Fonts loaded via index.css Google Fonts
import './index.css'
import App from './App.tsx'
import ProjectsPage from './pages/ProjectsPage.tsx'
import CaseStudyLabamu from './pages/CaseStudyLabamu.tsx'
import CaseStudyMyBeepr from './pages/CaseStudyMyBeepr.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/case-study/labamu" element={<CaseStudyLabamu />} />
        <Route path="/case-study/mybeepr" element={<CaseStudyMyBeepr />} />
      </Routes>
    </HashRouter>
  </StrictMode>,
)
