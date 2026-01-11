import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';

// Client Pages
import Home from './pages/Home';
import Search from './pages/Search';
import Scanner from './pages/Scanner';
import Validation from './pages/Validation';
import Profile from './pages/Profile';
import Orders from './pages/Orders';

// Auth Pages
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';

// Restaurant Pages
import { RestaurantLayout } from './layouts/RestaurantLayout';
import RestaurantDashboard from './pages/restaurant/Dashboard';
import Promotions from './pages/restaurant/Promotions';
import PromotionForm from './pages/restaurant/PromotionForm';
import RestaurantProfile from './pages/restaurant/Profile';
import QRCodePage from './pages/restaurant/QRCode';
import FinancePage from './pages/restaurant/Finance';
import SettingsPage from './pages/restaurant/Settings';
import OnboardingWizard from './pages/restaurant/OnboardingWizard';
import RestaurantDetails from './pages/RestaurantDetails';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-background font-sans text-foreground">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Client Routes */}
            <Route path="/" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
            <Route path="/search" element={
              <ProtectedRoute>
                <Search />
              </ProtectedRoute>
            } />
            <Route path="/scan" element={
              <ProtectedRoute>
                <Scanner />
              </ProtectedRoute>
            } />
            <Route path="/validation/:id" element={
              <ProtectedRoute>
                <Validation />
              </ProtectedRoute>
            } />
            <Route path="/orders" element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/restaurant/:id" element={
              <ProtectedRoute>
                <RestaurantDetails />
              </ProtectedRoute>
            } />

            {/* Restaurant Onboarding */}
            <Route path="/onboarding" element={
              <ProtectedRoute>
                <OnboardingWizard />
              </ProtectedRoute>
            } />

            {/* Restaurant Dashboard Routes */}
            <Route path="/restaurant" element={
              <ProtectedRoute>
                <RestaurantLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<RestaurantDashboard />} />
              <Route path="promotions" element={<Promotions />} />
              <Route path="promotions/new" element={<PromotionForm />} />
              <Route path="promotions/edit/:id" element={<PromotionForm />} />
              <Route path="profile" element={<RestaurantProfile />} />
              <Route path="qrcode" element={<QRCodePage />} />
              <Route path="finance" element={<FinancePage />} />
              <Route path="settings" element={<SettingsPage />} />
              {/* Placeholders for future routes */}
              <Route path="*" element={<div className="p-8 text-center text-gray-500">Página em construção 🚧</div>} />
            </Route>

            {/* Catch all - 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
