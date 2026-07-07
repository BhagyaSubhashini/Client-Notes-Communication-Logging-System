import { useState } from "react";

import toast from "react-hot-toast";

import { createClient } from "../../services/clientService";

const AddClientModal = ({
  onClose,
  onSuccess,
}) => {

  const [formData, setFormData] =
    useState({
      full_name: "",
      phone_number: "",
      email: "",
      domain_name: "",
      whmcs_username: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {

    try {

      await createClient(formData);

      toast.success("Client created");

      onSuccess();

      onClose();

    } catch (err) {

      toast.error("Error creating client");

    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white w-full max-w-2xl rounded-2xl p-6">

        <h2 className="text-xl font-bold mb-5">
          Add Client
        </h2>

        <div className="grid grid-cols-2 gap-4">

          <input
            type="text"
            name="full_name"
            placeholder="Full Name"
            value={formData.full_name}
            onChange={handleChange}
            className="border rounded-xl p-3"
          />

          <input
            type="text"
            name="phone_number"
            placeholder="Phone Number"
            value={formData.phone_number}
            onChange={handleChange}
            className="border rounded-xl p-3"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border rounded-xl p-3"
          />

          <input
            type="text"
            name="domain_name"
            placeholder="Domain Name"
            value={formData.domain_name}
            onChange={handleChange}
            className="border rounded-xl p-3"
          />

          <input
            type="text"
            name="whmcs_username"
            placeholder="WHMCS Username"
            value={formData.whmcs_username}
            onChange={handleChange}
            className="border rounded-xl p-3 col-span-2"
          />

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
            Save Client
          </button>

        </div>

      </div>
    </div>
  );
};

export default AddClientModal;