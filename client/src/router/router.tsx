import { createBrowserRouter } from 'react-router-dom';
import RegisterPage from '../pages/auth/registerPage';
import SignupForm from '../pages/auth/SignupForm';
import AuthLayout from '../components/layouts/AuthLayout';
import { AuthPage } from '../pages/auth/authPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: '', element: <AuthPage/> },
      // { path: 'signup', element: <RegisterPage/> },
    ],
  },
]);

export default router;
