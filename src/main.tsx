import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { ScrollToTop } from './components/ScrollToTop'
import { DeferredVercelMetrics } from './components/DeferredVercelMetrics'
import { ProtectedRoute } from './components/admin/ProtectedRoute'
import './index.css'
import App from './App.tsx'

const ProjectsPage = lazy(() => import('./pages/ProjectsPage.tsx'))
const ProjectDetailPage = lazy(() => import('./pages/ProjectDetailPage.tsx'))
const CaseStudyLabamu = lazy(() => import('./pages/CaseStudyLabamu.tsx'))
const CaseStudyMyBeepr = lazy(() => import('./pages/CaseStudyMyBeepr.tsx'))
const InsightsListPage = lazy(() => import('./pages/InsightsListPage.tsx'))
const ArticleDetailPage = lazy(() => import('./pages/ArticleDetailPage.tsx'))
const LoginPage = lazy(() => import('./pages/admin/LoginPage.tsx'))
const ArticleListPage = lazy(() => import('./pages/admin/ArticleListPage.tsx'))
const ArticleEditorPage = lazy(() => import('./pages/admin/ArticleEditorPage.tsx'))

const adminPath = import.meta.env.VITE_ADMIN_PATH || 'admin'

function RouteFallback() {
  return <div className="min-h-[50vh] bg-slate-900" aria-busy="true" />;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <DeferredVercelMetrics />
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:slug" element={<ProjectDetailPage />} />
            <Route path="/case-study/labamu" element={<CaseStudyLabamu />} />
            <Route path="/case-study/mybeepr" element={<CaseStudyMyBeepr />} />
            <Route path="/insights" element={<InsightsListPage />} />
            <Route path="/insights/:slug" element={<ArticleDetailPage />} />

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
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
