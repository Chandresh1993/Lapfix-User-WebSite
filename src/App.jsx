import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import { lazy, Suspense } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext"; // ✅ import AuthProvider
import MainLayout from "./layouts/MainLayout";

const Signup = lazy(() => import('./pages/Auth/Login'));
const Home = lazy(() => import('./pages/home/Home'));

function App() {
  return (
    <AuthProvider> {/* ✅ Wrap everything inside AuthProvider */}
      <Router>
        <Suspense fallback={<div className="text-center mt-10 text-gray-600">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Signup />} />
            <Route path="/home" element={
            <ProtectedRoute>
              <MainLayout>
                <Home />
              </MainLayout>
            </ProtectedRoute>
          } />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;
