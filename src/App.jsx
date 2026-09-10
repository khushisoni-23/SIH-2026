import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';

import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { LandingPage } from './pages/LandingPage';
import { MainLayout } from './layouts/MainLayout';
import { Dashboard } from './pages/Dashboard';
import { FreightForecast } from './pages/FreightForecast';
import { VesselRecommendation } from './pages/VesselRecommendation';
import { PortIntelligence } from './pages/PortIntelligence';
import { RouteAnalysis } from './pages/RouteAnalysis';
import { RiskAlerts } from './pages/RiskAlerts';
import { CharterPlanning } from './pages/CharterPlanning';
import { MarketData } from './pages/MarketData';
import { Settings } from './pages/Settings';

// ProtectedRoute — redirects to /login if user is not authenticated
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
};

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected Main Application Routes inside MainLayout */}
      <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forecast" element={<FreightForecast />} />
        <Route path="/vessels" element={<VesselRecommendation />} />
        <Route path="/vessel" element={<VesselRecommendation />} />
        <Route path="/ports" element={<PortIntelligence />} />
        <Route path="/port" element={<PortIntelligence />} />
        <Route path="/routes" element={<RouteAnalysis />} />
        <Route path="/route" element={<RouteAnalysis />} />
        <Route path="/risk" element={<RiskAlerts />} />
        <Route path="/risks" element={<RiskAlerts />} />
        <Route path="/charter" element={<CharterPlanning />} />
        <Route path="/market-data" element={<MarketData />} />
        <Route path="/market" element={<MarketData />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      {/* Fallback redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
