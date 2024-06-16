
import { Suspense, useEffect } from 'react';
import Navigation from './Navigation/Navigation';
import { lazy} from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoading, selectIsLoggedIn, selectIsRefreshing } from './redux/auth/selectors';
import { refreshUser } from './redux/auth/operations';
import RestrictedRoute from './RestrictedRoute';
import PrivateRoute from './PrivateRoute';
const HomePage = lazy(() => import('./page/HomePage/HomePage')) 
const RegistrationPage = lazy(() => import('./page/RegistrationPage/RegistrationPage')) 
const LoginPage = lazy(() => import('./page/LoginPage/LoginPage')) 
const ErrorPage = lazy(() => import('./page/ErrorPage/ErrorPage')) 
const ContactsPage = lazy(() => import('./page/ContactsPage/ContactsPage')) 



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
