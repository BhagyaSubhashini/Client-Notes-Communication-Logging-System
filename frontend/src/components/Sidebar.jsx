import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-white shadow-md flex flex-col p-4">
      <h2 className="text-sm font-bold mb-6 text-gray-600">
        CLIENT NOTES & COMMUNICATION LOGGING SYSTEM
      </h2>

      <nav className="flex flex-col gap-3">
        <Link className="p-2 rounded bg-indigo-100 text-indigo-600">Dashboard</Link>
        <Link className="p-2 rounded hover:bg-gray-100">Clients</Link>
        <Link className="p-2 rounded hover:bg-gray-100">Notes</Link>
        <Link className="p-2 rounded hover:bg-gray-100">Profile</Link>
      </nav>

      <div className="mt-auto text-sm text-gray-400">
        <p>Help</p>
        <p>Settings</p>
      </div>
    </div>
  );
};

export default Sidebar;