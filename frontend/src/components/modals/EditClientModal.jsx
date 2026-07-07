import { useState } from "react";

import toast from "react-hot-toast";

import {
  updateClient,
} from "../../services/clientService";

const EditClientModal = ({
  client,
  onClose,
  onSuccess,
}) => {

  const [formData,
    setFormData] = useState({

    full_name:
      client.full_name || "",

    phone_number:
      client.phone_number || "",

    email:
      client.email || "",

    domain_name:
      client.domain_name || "",

    whmcs_username:
      client.whmcs_username || "",

  });

  const [loading,
    setLoading] =
    useState(false);

  const handleChange =
    (e) => {

      setFormData({
        ...formData,
        [e.target.name]:
          e.target.value,
      });

    };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        await updateClient(
          client.client_id,
          formData
        );

        toast.success(
          "Client updated successfully"
        );

        onSuccess();

        onClose();

      } catch (err) {

        console.error(err);

        toast.error(
          "Update failed"
        );

      } finally {

        setLoading(false);

      }

    };

  return (

    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-xl p-6 w-full max-w-xl">

        <h2 className="text-xl font-bold mb-5">
          Edit Client
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="text"
            name="domain_name"
            value={formData.domain_name}
            onChange={handleChange}
            placeholder="Domain Name"
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="text"
            name="whmcs_username"
            value={formData.whmcs_username}
            onChange={handleChange}
            placeholder="WHMCS Username"
            className="w-full border p-3 rounded-lg"
          />

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 text-white px-5 py-2 rounded-lg"
            >
              {loading
                ? "Updating..."
                : "Save Changes"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default EditClientModal;