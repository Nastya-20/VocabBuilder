import React, { Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { register, logIn } from './redux/auth/operations';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Layout from './components/Layout/Layout';
import './App.css';

const RegisterPage = React.lazy(() => import('../src/pages/RegisterPage/RegisterPage'));
const LoginPage = React.lazy(() => import('../src/pages/LoginPage/LoginPage'));
const TrainingPage = React.lazy(() => import('../src/pages/TrainingPage/TrainingPage'));
const NotFoundPage = React.lazy(() => import('../src/pages/NotFoundPage/NotFoundPage'));
const DictionaryPage = React.lazy(() => import('../src/pages/DictionaryPage/DictionaryPage'));
const RecommendPage = React.lazy(() => import('../src/pages/RecommendPage/RecommendPage'));

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async (data) => {
    try {
      await dispatch(register(data)).unwrap();
      navigate('/dictionary');
    } catch (error) {
      console.error("❌ Registration failed:", error);
      throw error;
    }
  };

  const handleLogin = async (data) => {
    try {
      await dispatch(logIn(data)).unwrap();
      navigate('/dictionary');
    } catch (error) {
      console.error("❌ Login failed:", error);
      throw error;
    }
  };

    return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/' element={<RegisterPage onSubmit={handleRegister} />} />
          <Route path='/login' element={<LoginPage onSubmit={handleLogin} />} />
          <Route
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          >
            <Route path="/dictionary" element={<DictionaryPage />} />
            <Route path="/recommend" element={<RecommendPage />} />
            <Route path="/training" element={<TrainingPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <ToastContainer autoClose={3000} />
    </>
  );
}

export default App;
