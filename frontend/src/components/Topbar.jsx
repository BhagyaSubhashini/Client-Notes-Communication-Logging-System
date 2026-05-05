import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="flex justify-end p-4 bg-white shadow">
      <button
        onClick={handleLogout}
        className="text-red-500 font-medium"
      >
        Logout
      </button>
    </div>
  );
};

export default Topbar;