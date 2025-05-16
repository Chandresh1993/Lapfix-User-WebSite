import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { lazy, Suspense } from "react";

import MainLayout from "./layouts/MainLayout";

const Home = lazy(() => import("./pages/Home/Home "));

function App() {
  return (
    <Router>
      <Suspense
        fallback={
          <div className="text-center mt-10 text-gray-600">Loading...</div>
        }
      >
        <Routes>
          <Route
            path="/"
            element={
              <MainLayout>
                <Home />
              </MainLayout>
            }
          />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
