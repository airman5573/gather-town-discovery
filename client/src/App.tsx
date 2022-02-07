import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from 'react-router-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './auth/auth.context';
import AdminPage from './pages/admin/AdminPage';
import LoginPage from './pages/login/LoginPage';
import UserPage from './pages/user/UserPage';
import { ToastContainer } from 'react-toastify';
import './common/scss/style.scss';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/login" />} />
      <Route path="admin" element={<AdminPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="user" element={<UserPage />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Router></Router>
      </AuthProvider>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
