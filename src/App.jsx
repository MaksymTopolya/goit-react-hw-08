
import { Suspense, useEffect } from 'react';
import Navigation from './Navigation/Navigation';
import { lazy} from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsRefreshing } from './redux/auth/selectors';
import { refreshUser } from './redux/auth/operations';
import RestrictedRoute from './RestrictedRoute';
import PrivateRoute from './PrivateRoute';
const HomePage = lazy(() => import('./pages/HomePage/HomePage')) 
const RegistrationPage = lazy(() => import('./pages/RegistrationPage/RegistrationPage')) 
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage')) 
const ErrorPage = lazy(() => import('./pages/ErrorPage/ErrorPage')) 
const ContactsPage = lazy(() => import('./pages/ContactsPage/ContactsPage')) 



function App() {
  const isRefreshing = useSelector(selectIsRefreshing)
  const dispatch = useDispatch()

    useEffect(() => {
      dispatch(refreshUser());
    }, [dispatch]);

  
  return isRefreshing ? (
    <div>REFRESHING USER...</div>
  ) : (
    <div>
      <Navigation />
      <Suspense fallback={<div>Loading....</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/registration" element={<RestrictedRoute component={<RegistrationPage/>} redirectTo="/contacts"/>} />
          <Route path="/login" element={<RestrictedRoute component={<LoginPage/>} redirectTo="/contacts"/>} />
          <Route path="/contacts" element={<PrivateRoute component={<ContactsPage />} redirectTo="/login"/>} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
