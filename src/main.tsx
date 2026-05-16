import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { ScrollToTop } from './components/ScrollToTop'
import './index.css'
import App from './App.tsx'
import ProjectsPage from './pages/ProjectsPage.tsx'
import ProjectDetailPage from './pages/ProjectDetailPage.tsx'
import CaseStudyLabamu from './pages/CaseStudyLabamu.tsx'
import CaseStudyMyBeepr from './pages/CaseStudyMyBeepr.tsx'
import InsightsListPage from './pages/InsightsListPage.tsx'
import ArticleDetailPage from './pages/ArticleDetailPage.tsx'
import LoginPage from './pages/admin/LoginPage.tsx'
import ArticleListPage from './pages/admin/ArticleListPage.tsx'
import ArticleEditorPage from './pages/admin/ArticleEditorPage.tsx'
import { ProtectedRoute } from './components/admin/ProtectedRoute.tsx'

const adminPath = import.meta.env.VITE_ADMIN_PATH || 'admin'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:slug" element={<ProjectDetailPage />} />
          <Route path="/case-study/labamu" element={<CaseStudyLabamu />} />
          <Route path="/case-study/mybeepr" element={<CaseStudyMyBeepr />} />
          <Route path="/insights" element={<InsightsListPage />} />
          <Route path="/insights/:slug" element={<ArticleDetailPage />} />

          {/* Admin routes */}
          <Route path={`/${adminPath}/login`} element={<LoginPage />} />
          <Route
            path={`/${adminPath}`}
            element={
              <ProtectedRoute>
                <ArticleListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={`/${adminPath}/articles/new`}
            element={
              <ProtectedRoute>
                <ArticleEditorPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={`/${adminPath}/articles/:id/edit`}
            element={
              <ProtectedRoute>
                <ArticleEditorPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
