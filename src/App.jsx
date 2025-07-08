import React, { Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
import { Routes, Route } from 'react-router-dom';

const RegisterPage = React.lazy(() => import('../src/pages/RegisterPage/RegisterPage'));
const LoginPage = React.lazy(() => import('../src/pages/LoginPage/LoginPage'));
const TrainingPage = React.lazy(() => import('../src/pages/TrainingPage/TrainingPage'));
const NotFoundPage = React.lazy(() => import('../src/pages/NotFoundPage/NotFoundPage'));
const DictionaryPage = React.lazy(() => import('../src/pages/DictionaryPage/DictionaryPage'));
const RecommendPage = React.lazy(() => import('../src/pages/RecommendPage/RecommendPage'));



function App() {
   return (
    <>
       <Suspense fallback={<div>Loading...</div>}>
         <Routes>
           <Route path='/' element={<RegisterPage />} />
           <Route path='/login' element={<LoginPage />} />
           <Route path='/favorites' element={<TrainingPage />} />
           <Route path='/dictionary' element={<DictionaryPage />} />
           <Route path='/recommend' element={<RecommendPage />} />

           <Route path="*" element={<NotFoundPage />} />
         </Routes>
       </Suspense>
       <ToastContainer autoClose={3000} />
    </>
  )
}

export default App
