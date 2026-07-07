import { useState } from "react";

import toast from "react-hot-toast";

import { updateUserByAdmin } from "../../services/userService";

const EditUserModal = ({
  user,
  onClose,
  onSuccess,
}) => {

  const [formData, setFormData] =
    useState({
      username:
        user.username || "",
      email:
        user.email || "",
      phone_number:
        user.phone_number || "",
      role:
        user.role || "normal_user",
      is_active:
        user.is_active,
    });

  const [loading, setLoading] =
    useState(false);

  const handleChange = (
    e
  ) => {

    const {
      name,
      value,
    } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

  };

  const handleStatusChange =
    (e) => {

      setFormData({
        ...formData,
        is_active:
          e.target.value ===
          "true",
      });

    };

  const handleSubmit =
    async () => {

      try {

        setLoading(true);

        await updateUserByAdmin(
          user.user_id,
          formData
        );

        toast.success(
          "User updated successfully"
        );

        onSuccess();

        onClose();

      } catch (err) {

        console.error(err);

        toast.error(
          err.response?.data
            ?.message ||
            "Failed to update user"
        );

      } finally {

        setLoading(false);

      }

    };

  return (

    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white w-full max-w-xl rounded-2xl p-6 shadow-xl">

        <h2 className="text-2xl font-bold mb-6">

          Edit User

        </h2>

        <div className="space-y-4">

          <div>

            <label className="block text-sm mb-1">

              Username

            </label>

            <input
              type="text"
              name="username"
              value={
                formData.username
              }
              onChange={
                handleChange
              }
              className="w-full border rounded-lg p-3"
            />

          </div>

          <div>

            <label className="block text-sm mb-1">

              Email

            </label>

            <input
              type="email"
              name="email"
              value={
                formData.email
              }
              onChange={
                handleChange
              }
              className="w-full border rounded-lg p-3"
            />

          </div>

          <div>

            <label className="block text-sm mb-1">

              Phone Number

            </label>

            <input
              type="text"
              name="phone_number"
              value={
                formData.phone_number
              }
              onChange={
                handleChange
              }
              className="w-full border rounded-lg p-3"
            />

          </div>

          <div>

            <label className="block text-sm mb-1">

              Role

            </label>

            <select
              name="role"
              value={
                formData.role
              }
              onChange={
                handleChange
              }
              className="w-full border rounded-lg p-3"
            >

              <option value="normal_user">
                Normal User
              </option>

              <option value="super_user">
                Super User
              </option>

            </select>

          </div>

          <div>

            <label className="block text-sm mb-1">

              Status

            </label>

            <select
              value={
                String(
                  formData.is_active
                )
              }
              onChange={
                handleStatusChange
              }
              className="w-full border rounded-lg p-3"
            >

              <option value="true">
                Active
              </option>

              <option value="false">
                Inactive
              </option>

            </select>

          </div>

        </div>

        <div className="flex justify-end gap-3 mt-8">

          <button
            onClick={onClose}
            className="px-5 py-2 border rounded-lg"
          >

            Cancel

          </button>

          <button
            onClick={
              handleSubmit
            }
            disabled={
              loading
            }
            className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700"
          >

            {loading
              ? "Saving..."
              : "Save Changes"}

          </button>

        </div>

      </div>

    </div>

  );
};

export default EditUserModal;