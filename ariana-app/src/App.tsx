import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { LandingPage } from './pages/LandingPage';

const AdminPage = lazy(() => import('./pages/AdminPage').then(m => ({ default: m.AdminPage })));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={
          <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="w-8 h-8 border-2 border-rose/30 border-t-rose rounded-full animate-spin" /></div>}>
            <AdminPage />
          </Suspense>
        } />
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
