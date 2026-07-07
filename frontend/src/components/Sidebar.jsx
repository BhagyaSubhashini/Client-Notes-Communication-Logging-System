import {
  Link,
  useLocation,
} from "react-router-dom";

const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
}) => {

  const location =
    useLocation();

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  const menu = [

  {
    name: "Dashboard",
    path:
      user.role === "super_user"
        ? "/super-dashboard"
        : "/user-dashboard",
  },

  {
    name: "Clients",
    path: "/clients",
  },

  {
    name: "Notes",
    path: "/notes",
  },

  ...(user.role === "super_user"
  ? [
      {
        name: "Users",
        path: "/users",
      },

      {
        name: "Analytics",
        path: "/analytics",
      },
    ]
  : []),

  {
    name: "Profile",
    path: "/profile",
  },

];


  return (
    <>

      {/* OVERLAY */}

      {sidebarOpen && (

        <div
          onClick={() =>
            setSidebarOpen(false)
          }
          className="fixed inset-0 bg-black/40 z-40"
        />

      )}

      {/* SIDEBAR */}

      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-md p-4 transition-transform duration-300 transform

        ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >

        <h2 className="text-sm font-bold mb-8 text-gray-600">

          CLIENT NOTES &
          COMMUNICATION
          LOGGING SYSTEM

        </h2>

        <nav className="flex flex-col gap-2">

          {menu.map((item) => (

            <Link
              key={item.path}

              to={item.path}

              onClick={() =>
                setSidebarOpen(false)
              }

              className={`p-3 rounded-lg transition

              ${
                location.pathname ===
                item.path
                  ? "bg-indigo-100 text-indigo-600"
                  : "hover:bg-gray-100"
              }`}
            >

              {item.name}

            </Link>

          ))}

        </nav>

      </aside>

    </>
  );
};

export default Sidebar;