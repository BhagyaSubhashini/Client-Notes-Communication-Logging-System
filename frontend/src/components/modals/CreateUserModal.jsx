import { useState } from "react";

import toast from "react-hot-toast";

import { createUser } from "../../services/userService";

const CreateUserModal = ({
  onClose,
  onSuccess,
}) => {

  const [formData, setFormData] =
    useState({
      username: "",
      email: "",
      password: "",
      role: "normal_user",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {

    try {

      await createUser(formData);

      toast.success("User created");

      onSuccess();

      onClose();

    } catch (err) {

      toast.error(
        err.response?.data?.message ||
          "Error creating user"
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white w-full max-w-lg rounded-2xl p-6">

        <h2 className="text-xl font-bold mb-5">
          Create User
        </h2>

        <div className="space-y-4">

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
          >
            <option value="normal_user">
              Normal User
            </option>

            <option value="super_user">
              Super User
            </option>
          </select>

        </div>

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={onClose}
            className="border px-5 py-2 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="bg-indigo-600 text-white px-5 py-2 rounded-lg"
          >
            Create User
          </button>

        </div>

      </div>
    </div>
  );
};

export default CreateUserModal;