import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { jwtDecode } from "jwt-decode";
import { getNotifications } from "../services/notificationService";

const AuthContext = createContext();

export const AuthProvider = ({
  children,
}) => {

  const [user, setUser] =
    useState(
      JSON.parse(
        localStorage.getItem("user")
      ) || null
    );

  const [token, setToken] =
    useState(
      localStorage.getItem("token")
      || null
    );

  const [
    unreadNotifications,
    setUnreadNotifications,
  ] = useState(0);

  const login = (
    userData,
    tokenData
  ) => {

    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    localStorage.setItem(
      "token",
      tokenData
    );

    setUser(userData);
    setToken(tokenData);

  };

  const updateUser = (
    updatedUser
  ) => {

    const mergedUser = {
      ...user,
      ...updatedUser,
    };

    localStorage.setItem(
      "user",
      JSON.stringify(
        mergedUser
      )
    );

    setUser(
      mergedUser
    );

  };

  const fetchUnreadCount =
    async () => {

      try {

        if (!token) return;

        const notifications =
          await getNotifications();

        const unread =
          notifications.filter(
            (n) =>
              !n.is_read
          ).length;

        setUnreadNotifications(
          unread
        );

      } catch (err) {

        console.error(
          "Notification count error:",
          err
        );

      }

    };

  const logout = () => {

    localStorage.clear();

    setUser(null);
    setToken(null);

    window.location.href =
      "/";

  };

  useEffect(() => {

    if (!token) return;

    const decoded =
      jwtDecode(token);

    const currentTime =
      Date.now() / 1000;

    if (
      decoded.exp <
      currentTime
    ) {

      logout();

    }

  }, [token]);

  useEffect(() => {

    if (!token) return;

    fetchUnreadCount();

    const interval =
      setInterval(
        fetchUnreadCount,
        10000
      );

    return () =>
      clearInterval(
        interval
      );

  }, [token]);

  return (

    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        updateUser,
        unreadNotifications,
        fetchUnreadCount,
      }}
    >

      {children}

    </AuthContext.Provider>

  );
};

export const useAuth =
  () => useContext(
    AuthContext
  );