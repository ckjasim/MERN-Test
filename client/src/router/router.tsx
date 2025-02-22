import { createBrowserRouter } from 'react-router-dom';
import AuthLayout from '../components/layouts/AuthLayout';
import { SignupPage } from '../pages/auth/signupPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: '', element: <SignupPage/> },
      // { path: 'signup', element: <RegisterPage/> },
    ],
  },
]);

export default router;
