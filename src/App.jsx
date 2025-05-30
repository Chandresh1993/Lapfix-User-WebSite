import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { lazy, Suspense } from "react";

import MainLayout from "./layouts/MainLayout";
import Loader from "./components/Loader";

const Home = lazy(() => import("./pages/Home/Home"));
const SingleProduct = lazy(() => import("./pages/product/GetSingleProduct"));

function App() {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route
            path="/"
            element={
              <MainLayout>
                <Home />
              </MainLayout>
            }
          />
          <Route
            path="/product"
            element={
              <MainLayout>
                <SingleProduct />
              </MainLayout>
            }
          />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
