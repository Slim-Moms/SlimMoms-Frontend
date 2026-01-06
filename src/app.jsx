import React, { Suspense, lazy, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsLoading } from './redux/loader/loaderSelectors';
import { selectIsLoggedIn, selectIsRefreshing, selectToken } from './redux/auth/selectors';
import { refreshUser } from './redux/auth/operations';
import './App.css';


import Header from './components/Header/Header';
import Loader from './components/Loader/Loader';
import { PrivateRoute } from './components/Routes/PrivateRoute';
import { RestrictedRoute } from './components/Routes/RestrictedRoute';

const CalculatorPage = lazy(() => import('./pages/CalculatorPage/CalculatorPage'));
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
const RegistrationPage = lazy(() => import('./pages/RegistrationPage/RegistrationPage'));
const MainPage = lazy(() => import('./pages/MainPage/MainPage'));
const DiaryPage = lazy(() => import('./pages/DiaryPage/DiaryPage'));

const AppContent = () => {
  const isLoading = useSelector(selectIsLoading);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const hasCheckedAuth = useRef(false);
  const location = useLocation();

  useEffect(() => {
    // Only check once on mount if we have a token but are not logged in
    if (!hasCheckedAuth.current && token && !isLoggedIn && !isRefreshing) {
      hasCheckedAuth.current = true;
      dispatch(refreshUser());
    }
  }, [dispatch, token, isLoggedIn, isRefreshing]);

  const getAppClass = () => {
    const path = location.pathname;
    if (path === '/login' || path === '/registration') {
      return 'App auth-page';
    } else if (path === '/') {
      return 'App main-page-bg';
    }
    return 'App';
  };

  return (
    <div className={getAppClass()}>
      <Header />
      
      {isLoading && <Loader />}
      
      <main className="app-main">
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route 
              path="/diary" 
                element={<PrivateRoute redirectTo="/login" component={<DiaryPage />} />} 
            />
            <Route 
              path="/calculator" 
              element={<PrivateRoute redirectTo="/login" component={<CalculatorPage />} />} 
            />
            <Route 
              path="/login" 
              element={<RestrictedRoute redirectTo="/diary" component={<LoginPage />} />} 
            />
            <Route 
              path="/registration" 
              element={<RestrictedRoute redirectTo="/diary" component={<RegistrationPage />} />} 
            />        
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>

    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;