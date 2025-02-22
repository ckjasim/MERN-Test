import { createBrowserRouter } from 'react-router-dom';
import AuthLayout from '../components/layouts/AuthLayout';
import { SignupPage } from '../pages/auth/signupPage';
import UserDataPage from '@/pages/auth/userDataPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: '', element: <SignupPage/> },
      { path: 'saved-form/:id', element: <UserDataPage/> },
    ],
  },
]);

export default router;
