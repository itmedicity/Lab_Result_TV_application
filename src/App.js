import { CssBaseline } from '@mui/material';
import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Loading from './Views/Components/Loading';
import ErrorPage from './Views/Components/ErrorPage';


const queryClient = new QueryClient()

// Pages
const LabDashboard = React.lazy(() => import('./Views/Dashboard/LabDashboard'));
const Pharmacy = React.lazy(() => import('./Views/Pages/Pharmacy'));

function App() {


  return (
    <BrowserRouter basename="/" future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<LabDashboard />} errorElement={<ErrorPage />} />
            <Route path="/pharmacy" element={<Pharmacy />} errorElement={<ErrorPage />} />
          </Routes>
        </Suspense>
      </QueryClientProvider>
    </BrowserRouter>
  )
}
export default App
