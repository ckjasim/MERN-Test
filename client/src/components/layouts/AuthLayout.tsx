import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";


const AuthLayout = () => {
  return (
    <div>
      <Navbar />
      <main className="max-w-4xl mx-auto p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;