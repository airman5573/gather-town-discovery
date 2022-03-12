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
import { Provider } from 'react-redux';
import { store } from './pages/posts/redux';
import Post from './pages/posts/post/Post';
import DecryptionImage from './pages/posts/post-images/decryption.png';
import MathImage from './pages/posts/post-images/math.jpeg';
import SpacingImage from './pages/posts/post-images/spacing.jpeg';
import EnglishImage from './pages/posts/post-images/english.jpg';

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
      <Provider store={store}>
        <Routes>
          <Route
            path="/posts/decryption"
            element={<Post missionImage={DecryptionImage} post={1} />}
          ></Route>
          <Route
            path="/posts/math"
            element={<Post missionImage={MathImage} post={2} />}
          ></Route>
          <Route
            path="/posts/spacing"
            element={<Post missionImage={SpacingImage} post={3} />}
          ></Route>
          <Route
            path="/posts/english"
            element={<Post missionImage={EnglishImage} post={4} />}
          ></Route>
        </Routes>
      </Provider>
      <AuthProvider>
        <Router></Router>
      </AuthProvider>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
