import { useEffect, useState } from "react";

import DashboardLayout from "../../layout/DashboardLayout";

import { useAuth } from "../../context/AuthContext";

import toast from "react-hot-toast";

import {
  getMyProfile,
  updateMyProfile,
  changePassword,
  uploadProfileImage,
} from "../../services/userService";

const ProfilePage = () => {

  const {
    user,
    updateUser,
  } = useAuth();

  const [profile, setProfile] =
    useState({
      username: "",
      email: "",
      phone_number: "",
      role: "",
      profile_image: "",
    });

  const [selectedImage, setSelectedImage] =
    useState(null);

  const [passwordData, setPasswordData] =
    useState({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {

    fetchProfile();

  }, []);

  const fetchProfile =
    async () => {

      try {

        const data =
          await getMyProfile();

        setProfile(data);

      } catch (err) {

        console.error(err);

        toast.error(
          "Failed to load profile"
        );

      }

    };

  const handleProfileChange =
    (e) => {

      setProfile({
        ...profile,
        [e.target.name]:
          e.target.value,
      });

    };

  const handleSaveProfile =
    async () => {

      try {

        setLoading(true);

        const updated =
          await updateMyProfile({
            username:
              profile.username,
            email:
              profile.email,
            phone_number:
              profile.phone_number,
          });

        setProfile(updated);

        updateUser(updated);

        toast.success(
          "Profile updated successfully"
        );

      } catch (err) {

        console.error(err);

        toast.error(
          err.response?.data
            ?.message ||
            "Profile update failed"
        );

      } finally {

        setLoading(false);

      }

    };

  const handleImageUpload =
    async () => {

      if (!selectedImage) {

        toast.error(
          "Select an image first"
        );

        return;

      }

      try {

        const response =
          await uploadProfileImage(
            selectedImage
          );

        setProfile(
          response.user
        );

        updateUser(
          response.user
        );

        toast.success(
          "Profile image updated"
        );

      } catch (err) {

        console.error(err);

        toast.error(
          "Image upload failed"
        );

      }

    };

  const handlePasswordChange =
    async () => {

      if (
        passwordData.newPassword !==
        passwordData.confirmPassword
      ) {

        toast.error(
          "Passwords do not match"
        );

        return;

      }

      try {

        await changePassword({
          currentPassword:
            passwordData.currentPassword,
          newPassword:
            passwordData.newPassword,
        });

        toast.success(
          "Password updated"
        );

        setPasswordData({
          currentPassword:
            "",
          newPassword: "",
          confirmPassword:
            "",
        });

      } catch (err) {

        console.error(err);

        toast.error(
          err.response?.data
            ?.message ||
            "Password update failed"
        );

      }

    };

  return (

    <DashboardLayout>

      <div className="space-y-6">

        {/* PROFILE CARD */}

        <div className="bg-white rounded-2xl shadow p-6">

          <h2 className="text-2xl font-bold mb-6">

            My Profile

          </h2>

          <div className="flex flex-col md:flex-row gap-8">

            {/* IMAGE SECTION */}

            <div className="flex flex-col items-center gap-4">

              <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200">

                {profile.profile_image ? (

                  <img
                    src={`http://localhost:5000/${profile.profile_image}`}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />

                ) : (

                  <div className="w-full h-full flex items-center justify-center text-gray-500">

                    No Image

                  </div>

                )}

              </div>

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setSelectedImage(
                    e.target.files[0]
                  )
                }
              />

              <button
                onClick={
                  handleImageUpload
                }
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
              >

                Upload Image

              </button>

            </div>

            {/* DETAILS */}

            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">

              <div>

                <label className="block text-sm mb-1">

                  Username

                </label>

                <input
                  type="text"
                  name="username"
                  value={
                    profile.username
                  }
                  onChange={
                    handleProfileChange
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
                    profile.email
                  }
                  onChange={
                    handleProfileChange
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
                    profile.phone_number ||
                    ""
                  }
                  onChange={
                    handleProfileChange
                  }
                  className="w-full border rounded-lg p-3"
                />

              </div>

              <div>

                <label className="block text-sm mb-1">

                  Role

                </label>

                <input
                  value={
                    profile.role
                  }
                  disabled
                  className="w-full border rounded-lg p-3 bg-gray-100"
                />

              </div>

            </div>

          </div>

          <button
            onClick={
              handleSaveProfile
            }
            disabled={loading}
            className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg"
          >

            Save Changes

          </button>

        </div>

        {/* PASSWORD CARD */}

        <div className="bg-white rounded-2xl shadow p-6">

          <h2 className="text-xl font-bold mb-5">

            Change Password

          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <input
              type="password"
              placeholder="Current Password"
              value={
                passwordData.currentPassword
              }
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  currentPassword:
                    e.target.value,
                })
              }
              className="border rounded-lg p-3"
            />

            <input
              type="password"
              placeholder="New Password"
              value={
                passwordData.newPassword
              }
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  newPassword:
                    e.target.value,
                })
              }
              className="border rounded-lg p-3"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={
                passwordData.confirmPassword
              }
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  confirmPassword:
                    e.target.value,
                })
              }
              className="border rounded-lg p-3"
            />

          </div>

          <button
            onClick={
              handlePasswordChange
            }
            className="mt-5 bg-indigo-600 text-white px-6 py-3 rounded-lg"
          >

            Change Password

          </button>

        </div>

      </div>

    </DashboardLayout>

  );
};

export default ProfilePage;