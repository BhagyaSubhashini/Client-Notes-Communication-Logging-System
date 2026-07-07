import {
  useState,
  useRef,
  useEffect,
} from "react";

import {
  Bell,
  Menu,
  User,
  ChevronDown,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

import NotificationPanel from "./NotificationPanel";

const Topbar = ({
  sidebarOpen,
  setSidebarOpen,
}) => {

  const {
    logout,
    user,
    unreadNotifications,
  } = useAuth();

  const [
    showNotifications,
    setShowNotifications,
  ] = useState(false);

  const [
    showProfileMenu,
    setShowProfileMenu,
  ] = useState(false);

  const notificationRef =
    useRef(null);

  const profileRef =
    useRef(null);

  useEffect(() => {

    const handleClickOutside =
      (event) => {

        if (
          notificationRef.current &&
          !notificationRef.current.contains(
            event.target
          )
        ) {

          setShowNotifications(
            false
          );

        }

        if (
          profileRef.current &&
          !profileRef.current.contains(
            event.target
          )
        ) {

          setShowProfileMenu(
            false
          );

        }

      };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

    };

  }, []);

  return (

    <div className="flex justify-between items-center p-4 bg-white shadow relative">

      {/* LEFT */}

      <button
        onClick={() =>
          setSidebarOpen(
            !sidebarOpen
          )
        }
        className="p-2 rounded-lg hover:bg-gray-100"
      >

        <Menu size={24} />

      </button>

      {/* RIGHT */}

      <div className="flex items-center gap-5">

        {/* NOTIFICATIONS */}

        <div
          ref={notificationRef}
          className="relative"
        >

          <button
            onClick={() =>
              setShowNotifications(
                !showNotifications
              )
            }
            className="relative p-2 rounded-lg hover:bg-gray-100"
          >

            <Bell size={22} />

            {unreadNotifications >
              0 && (

              <span
                className="
                absolute
                -top-1
                -right-1
                min-w-[18px]
                h-[18px]
                px-1
                bg-red-500
                text-white
                text-[10px]
                rounded-full
                flex
                items-center
                justify-center
                font-semibold
              "
              >

                {unreadNotifications >
                99
                  ? "99+"
                  : unreadNotifications}

              </span>

            )}

          </button>

          {showNotifications && (

            <div className="absolute right-0 mt-3 z-50">

              <NotificationPanel />

            </div>

          )}

        </div>

        {/* PROFILE */}

        <div
          ref={profileRef}
          className="relative"
        >

          <button
            onClick={() =>
              setShowProfileMenu(
                !showProfileMenu
              )
            }
            className="flex items-center gap-2 hover:bg-gray-100 rounded-full px-2 py-1 transition"
          >

            <div className="w-10 h-10 rounded-full overflow-hidden bg-indigo-600">

              {user?.profile_image ? (

                <img
                  src={`http://localhost:5000/${user.profile_image}`}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />

              ) : (

                <div className="w-full h-full flex items-center justify-center text-white">

                  <User size={18} />

                </div>

              )}

            </div>

            <ChevronDown
              size={16}
            />

          </button>

          {showProfileMenu && (

            <div className="absolute right-0 mt-3 w-72 bg-white rounded-xl shadow-lg border p-4 z-50">

              <div className="flex items-center gap-3 mb-4">

                <div className="w-14 h-14 rounded-full overflow-hidden bg-indigo-600">

                  {user?.profile_image ? (

                    <img
                      src={`http://localhost:5000/${user.profile_image}`}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />

                  ) : (

                    <div className="w-full h-full flex items-center justify-center text-white">

                      <User size={24} />

                    </div>

                  )}

                </div>

                <div className="flex-1">

                  <h3 className="font-semibold text-gray-800">

                    {user?.username}

                  </h3>

                  <p className="text-sm text-gray-500">

                    {user?.email}

                  </p>

                  <span
                    className={`inline-block mt-2 px-3 py-1 text-xs rounded-full ${
                      user?.role ===
                      "super_user"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >

                    {user?.role ===
                    "super_user"
                      ? "Super User"
                      : "Normal User"}

                  </span>

                </div>

              </div>

              <div className="border-t pt-3 space-y-2">

                <a
                  href="/profile"
                  className="block px-4 py-2 rounded-lg hover:bg-gray-100 transition"
                >

                  My Profile

                </a>

                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 rounded-lg hover:bg-red-50 text-red-500 font-medium transition"
                >

                  Logout

                </button>

              </div>

            </div>

          )}

        </div>

      </div>

    </div>

  );

};

export default Topbar;