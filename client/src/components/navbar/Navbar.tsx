import { CircleHelp } from 'lucide-react';

const Navbar = () => {
  return (
    <div>
      <div className="flex justify-between items-center p-5 px-16 border border-b-2 border-gray-100">
        <img className="w-32" src="/logo.png" alt="crax" />
        <CircleHelp />
      </div>
    </div>
  );
};

export default Navbar;
