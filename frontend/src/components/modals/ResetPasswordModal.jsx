import { useState } from "react";

import toast from "react-hot-toast";

import { resetPassword } from "../../services/userService";

const ResetPasswordModal = ({
  user,
  onClose,
}) => {

  const [password, setPassword] =
    useState("");

  const [confirmPassword,
    setConfirmPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit =
    async () => {

      if (!password.trim()) {

        toast.error(
          "Password is required"
        );

        return;

      }

      if (
        password !==
        confirmPassword
      ) {

        toast.error(
          "Passwords do not match"
        );

        return;

      }

      if (
        password.length < 6
      ) {

        toast.error(
          "Password must be at least 6 characters"
        );

        return;

      }

      try {

        setLoading(true);

        await resetPassword(
          user.user_id,
          password
        );

        toast.success(
          "Password reset successfully"
        );

        onClose();

      } catch (err) {

        console.error(err);

        toast.error(
          err.response?.data
            ?.message ||
            "Failed to reset password"
        );

      } finally {

        setLoading(false);

      }

    };

  return (

    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl">

        <h2 className="text-2xl font-bold mb-2">

          Reset Password

        </h2>

        <p className="text-gray-600 mb-6">

          Reset password for

          <span className="font-semibold">

            {" "}
            {user.username}

          </span>

        </p>

        <div className="space-y-4">

          <div>

            <label className="block text-sm mb-1">

              New Password

            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              className="w-full border rounded-lg p-3"
              placeholder="Enter new password"
            />

          </div>

          <div>

            <label className="block text-sm mb-1">

              Confirm Password

            </label>

            <input
              type="password"
              value={
                confirmPassword
              }
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
              className="w-full border rounded-lg p-3"
              placeholder="Confirm new password"
            />

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
            className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700"
          >

            {loading
              ? "Resetting..."
              : "Reset Password"}

          </button>

        </div>

      </div>

    </div>

  );
};

export default ResetPasswordModal;