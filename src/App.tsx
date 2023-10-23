import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Login } from "./pages/login/login";
import { Home } from "./pages/home/home";
import { MyImages } from "./pages/my-images/my-images";
import { ImageDetail } from "./pages/image-detail/image-detail";
import ProtectedRoute from "./shared/protected-route";
import { NoMatch } from "./pages/no-match";
import { AnimatePresence } from "framer-motion";

export default function App() {
  return (
    <BrowserRouter>
      <AppNavigation />
    </BrowserRouter>
  );
}

function AppNavigation() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/images"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/images/:id"
          element={
            <ProtectedRoute>
              <ImageDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-images"
          element={
            <ProtectedRoute>
              <MyImages />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Login />} />
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <NoMatch />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}