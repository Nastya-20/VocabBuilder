import React, { Suspense } from 'react';
import './App.css'
import { Routes, Route } from 'react-router-dom';

const RegisterPage = React.lazy(() => import('../src/pages/RegisterPage/RegisterPage'));
const LoginPage = React.lazy(() => import('../src/pages/LoginPage/LoginPage'));
const TrainingPage = React.lazy(() => import('../src/pages/TrainingPage/TrainingPage'));
const NotFoundPage = React.lazy(() => import('../src/pages/NotFoundPage/NotFoundPage'));



function App() {
   return (
    <>
       <Suspense fallback={<div>Loading...</div>}>
         <Routes>
           <Route path='/' element={<RegisterPage />} />
           <Route path='/nannies' element={<LoginPage />} />
           <Route path='/favorites' element={<TrainingPage />} />

           <Route path="*" element={<NotFoundPage />} />
         </Routes>
      </Suspense>
    </>
  )
}

export default App
