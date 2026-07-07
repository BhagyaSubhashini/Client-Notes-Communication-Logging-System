import { useEffect, useState } from "react";

import DashboardLayout from "../../layout/DashboardLayout";

import AddClientModal from "../../components/modals/AddClientModal";
import EditClientModal from "../../components/modals/EditClientModal";

import toast from "react-hot-toast";

import {
  getClients,
  searchClients,
  deleteClient,
} from "../../services/clientService";

const ClientsPage = () => {

  const [clients, setClients] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [showModal, setShowModal] =
    useState(false);

  const [showEditModal,
    setShowEditModal] =
    useState(false);

  const [selectedClient,
    setSelectedClient] =
    useState(null);

  useEffect(() => {

    fetchClients();

  }, []);

  const fetchClients = async () => {

    try {

      setLoading(true);

      const data =
        await getClients();

      setClients(data);

    } catch (err) {

      console.error(err);

      toast.error(
        "Failed to fetch clients"
      );

    } finally {

      setLoading(false);

    }

  };

  const handleSearch = async (e) => {

    const value =
      e.target.value;

    setSearch(value);

    try {

      if (
        value.trim() === ""
      ) {

        fetchClients();

      } else {

        const data =
          await searchClients(
            value
          );

        setClients(data);

      }

    } catch (err) {

      console.error(err);

      toast.error(
        "Search failed"
      );

    }

  };

  const handleDelete =
    async (clientId) => {

      const confirmDelete =
        window.confirm(
          "Are you sure you want to delete this client?"
        );

      if (!confirmDelete)
        return;

      try {

        await deleteClient(
          clientId
        );

        toast.success(
          "Client deleted successfully"
        );

        fetchClients();

      } catch (err) {

        console.error(err);

        toast.error(

          err.response?.data
            ?.message ||

          "Delete failed"

        );

      }

    };

  if (loading) {

    return (

      <DashboardLayout>

        <div className="space-y-5">

          <div className="h-12 bg-gray-200 rounded-lg animate-pulse" />

          <div className="h-96 bg-gray-200 rounded-lg animate-pulse" />

        </div>

      </DashboardLayout>

    );

  }

  return (

    <DashboardLayout>

      {/* HEADER */}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">

        <h1 className="text-2xl font-bold">

          Clients

        </h1>

        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">

          <input
            type="text"
            placeholder="Search client..."
            value={search}
            onChange={handleSearch}
            className="border px-4 py-2 rounded-lg md:w-80"
          />

          <button
            onClick={() =>
              setShowModal(true)
            }
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg transition"
          >

            + Add Client

          </button>

        </div>

      </div>

      {/* TABLE */}

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[1100px]">

            <thead className="bg-gray-50">

              <tr>

                <th className="p-4 text-left">
                  Name
                </th>

                <th className="p-4 text-left">
                  Phone
                </th>

                <th className="p-4 text-left">
                  Email
                </th>

                <th className="p-4 text-left">
                  Domain
                </th>

                <th className="p-4 text-left">
                  WHMCS Username
                </th>

                <th className="p-4 text-left">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {clients.length === 0 ? (

                <tr>

                  <td
                    colSpan="6"
                    className="text-center py-10 text-gray-500"
                  >

                    No clients found

                  </td>

                </tr>

              ) : (

                clients.map(
                  (client) => (

                    <tr
                      key={
                        client.client_id
                      }
                      className="border-t hover:bg-gray-50"
                    >

                      <td className="p-4">

                        {
                          client.full_name
                        }

                      </td>

                      <td className="p-4">

                        {
                          client.phone_number
                        }

                      </td>

                      <td className="p-4">

                        {
                          client.email
                        }

                      </td>

                      <td className="p-4">

                        {
                          client.domain_name
                        }

                      </td>

                      <td className="p-4">

                        {
                          client.whmcs_username
                        }

                      </td>

                      <td className="p-4">

                        <div className="flex gap-2">

                          <button
                            onClick={() => {

                              setSelectedClient(
                                client
                              );

                              setShowEditModal(
                                true
                              );

                            }}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                          >

                            Edit

                          </button>

                          <button
                            onClick={() =>
                              handleDelete(
                                client.client_id
                              )
                            }
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
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

      {/* ADD CLIENT */}

      {showModal && (

        <AddClientModal
          onClose={() =>
            setShowModal(false)
          }
          onSuccess={fetchClients}
        />

      )}

      {/* EDIT CLIENT */}

      {showEditModal &&
        selectedClient && (

          <EditClientModal
            client={selectedClient}
            onClose={() =>
              setShowEditModal(false)
            }
            onSuccess={fetchClients}
          />

        )}

    </DashboardLayout>

  );

};

export default ClientsPage;