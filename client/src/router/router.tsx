import { createBrowserRouter } from 'react-router-dom';
import AuthLayout from '../pages/auth/authLayout';
import LoginPage from '../pages/auth/loginPage';
import RegisterPage from '../pages/auth/registerPage';



const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: '', element: <LoginPage/> },
      { path: 'signup', element: <RegisterPage/> },



    ],
  },

 
  
]);

export default router;
