import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getNotifications,
  markNotificationRead,
} from "../services/notificationService";

import { useAuth } from "../context/AuthContext";

const NotificationPanel = () => {

  const navigate = useNavigate();

  const {
    fetchUnreadCount,
  } = useAuth();

  const [
    notifications,
    setNotifications,
  ] = useState([]);

  useEffect(() => {

    fetchNotifications();

    const interval =
      setInterval(
        fetchNotifications,
        10000
      );

    return () =>
      clearInterval(interval);

  }, []);

  const fetchNotifications =
    async () => {

      try {

        const data =
          await getNotifications();

        setNotifications(data);

        await fetchUnreadCount();

      } catch (err) {

        console.error(err);

      }

    };

  const handleClick =
    async (notification) => {

      try {

        if (!notification.is_read) {

          await markNotificationRead(
            notification.notification_id
          );

        }

        await fetchUnreadCount();

        if (
          notification.link
        ) {

          navigate(
            notification.link
          );

        }

      } catch (err) {

        console.error(err);

      }

    };

  return (

    <div className="absolute right-0 mt-3 w-96 bg-white rounded-xl shadow-xl border z-50">

      <div className="p-4 border-b">

        <h2 className="font-semibold">
          Notifications
        </h2>

      </div>

      <div className="max-h-96 overflow-y-auto">

        {notifications.length === 0 ? (

          <div className="p-6 text-center text-gray-500">

            No notifications

          </div>

        ) : (

          notifications.map(
            (notification) => (

              <div
                key={
                  notification.notification_id
                }
                onClick={() =>
                  handleClick(
                    notification
                  )
                }
                className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition ${
                  !notification.is_read
                    ? "bg-indigo-50"
                    : ""
                }`}
              >

                <div className="flex items-start justify-between">

                  <p className="text-sm text-gray-800 pr-3">

                    {
                      notification.message
                    }

                  </p>

                  {!notification.is_read && (

                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />

                  )}

                </div>

                <p className="text-xs text-gray-500 mt-2">

                  {new Date(
                    notification.created_at
                  ).toLocaleString()}

                </p>

              </div>

            )
          )

        )}

      </div>

    </div>

  );

};

export default NotificationPanel;