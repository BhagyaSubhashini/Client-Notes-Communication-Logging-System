import { useEffect, useState } from "react";

import DashboardLayout from "../../layout/DashboardLayout";

import CreateUserModal from "../../components/modals/CreateUserModal";
import EditUserModal from "../../components/modals/EditUserModal";
import ResetPasswordModal from "../../components/modals/ResetPasswordModal";

import toast from "react-hot-toast";

import {
  getUsers,
  deleteUser,
} from "../../services/userService";

const UsersPage = () => {

  const [users, setUsers] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [showCreateModal,
    setShowCreateModal] =
    useState(false);

  const [showEditModal,
    setShowEditModal] =
    useState(false);

  const [showResetModal,
    setShowResetModal] =
    useState(false);

  const [selectedUser,
    setSelectedUser] =
    useState(null);

  useEffect(() => {

    fetchUsers();

  }, []);

  const fetchUsers =
    async () => {

      try {

        setLoading(true);

        const data =
          await getUsers();

        setUsers(data);

      } catch (err) {

        console.error(err);

        toast.error(
          "Failed to fetch users"
        );

      } finally {

        setLoading(false);

      }

    };

  const handleDelete =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Are you sure you want to delete this user?"
        );

      if (!confirmDelete)
        return;

      try {

        await deleteUser(id);

        toast.success(
          "User deleted successfully"
        );

        fetchUsers();

      } catch (err) {

        console.error(err);

        toast.error(
          "Delete failed"
        );

      }

    };

  const openEditModal =
    (user) => {

      setSelectedUser(
        user
      );

      setShowEditModal(
        true
      );

    };

  const openResetModal =
    (user) => {

      setSelectedUser(
        user
      );

      setShowResetModal(
        true
      );

    };

  if (loading) {

    return (

      <DashboardLayout>

        <div className="space-y-4">

          <div className="h-12 bg-gray-200 rounded animate-pulse" />

          <div className="h-[500px] bg-gray-200 rounded animate-pulse" />

        </div>

      </DashboardLayout>

    );

  }

  return (

    <DashboardLayout>

      {/* HEADER */}

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-2xl font-bold">

          User Management

        </h1>

        <button
          onClick={() =>
            setShowCreateModal(
              true
            )
          }
          className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700"
        >

          + Create User

        </button>

      </div>

      {/* TABLE */}

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[1200px]">

            <thead className="bg-gray-50">

              <tr>

                <th className="p-4 text-left">
                  Profile
                </th>

                <th className="p-4 text-left">
                  Username
                </th>

                <th className="p-4 text-left">
                  Email
                </th>

                <th className="p-4 text-left">
                  Phone
                </th>

                <th className="p-4 text-left">
                  Role
                </th>

                <th className="p-4 text-left">
                  Status
                </th>

                <th className="p-4 text-left">
                  Created
                </th>

                <th className="p-4 text-left">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {users.length === 0 ? (

                <tr>

                  <td
                    colSpan="8"
                    className="text-center py-10 text-gray-500"
                  >

                    No users found

                  </td>

                </tr>

              ) : (

                users.map(
                  (
                    user
                  ) => (

                    <tr
                      key={
                        user.user_id
                      }
                      className="border-t hover:bg-gray-50"
                    >

                      {/* IMAGE */}

                      <td className="p-4">

                        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">

                          {user.profile_image ? (

                            <img
                              src={`http://localhost:5000/${user.profile_image}`}
                              alt="profile"
                              className="w-full h-full object-cover"
                            />

                          ) : (

                            <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">

                              N/A

                            </div>

                          )}

                        </div>

                      </td>

                      {/* USERNAME */}

                      <td className="p-4 font-medium">

                        {
                          user.username
                        }

                      </td>

                      {/* EMAIL */}

                      <td className="p-4">

                        {
                          user.email
                        }

                      </td>

                      {/* PHONE */}

                      <td className="p-4">

                        {user.phone_number ||
                          "-"}

                      </td>

                      {/* ROLE */}

                      <td className="p-4">

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            user.role ===
                            "super_user"
                              ? "bg-purple-100 text-purple-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >

                          {user.role.replace(
                            "_",
                            " "
                          )}

                        </span>

                      </td>

                      {/* STATUS */}

                      <td className="p-4">

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            user.is_active
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >

                          {user.is_active
                            ? "Active"
                            : "Inactive"}

                        </span>

                      </td>

                      {/* CREATED */}

                      <td className="p-4">

                        {new Date(
                          user.created_at
                        ).toLocaleDateString()}

                      </td>

                      {/* ACTIONS */}

                      <td className="p-4">

                        <div className="flex gap-2 flex-wrap">

                          <button
                            onClick={() =>
                              openEditModal(
                                user
                              )
                            }
                            className="bg-blue-600 text-white px-3 py-1 rounded"
                          >

                            Edit

                          </button>

                          <button
                            onClick={() =>
                              openResetModal(
                                user
                              )
                            }
                            className="bg-yellow-500 text-white px-3 py-1 rounded"
                          >

                            Reset Password

                          </button>

                          <button
                            onClick={() =>
                              handleDelete(
                                user.user_id
                              )
                            }
                            className="bg-red-600 text-white px-3 py-1 rounded"
                          >

                            Delete

                          </button>

                        </div>

                      </td>

                    </tr>

                  )
                )

              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* CREATE USER */}

      {showCreateModal && (

        <CreateUserModal
          onClose={() =>
            setShowCreateModal(
              false
            )
          }
          onSuccess={
            fetchUsers
          }
        />

      )}

      {/* EDIT USER */}

      {showEditModal &&
        selectedUser && (

          <EditUserModal
            user={
              selectedUser
            }
            onClose={() =>
              setShowEditModal(
                false
              )
            }
            onSuccess={
              fetchUsers
            }
          />

        )}

      {/* RESET PASSWORD */}

      {showResetModal &&
        selectedUser && (

          <ResetPasswordModal
            user={
              selectedUser
            }
            onClose={() =>
              setShowResetModal(
                false
              )
            }
          />

        )}

    </DashboardLayout>

  );

};

export default UsersPage;