import { useEffect, useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import { getClients } from "../../services/clientService";
import { getNotesByClient } from "../../services/noteService";
import { useNavigate } from "react-router-dom";
import AddNoteModal from "../../components/modals/AddNoteModel";
import {
  exportClientPDF,
  exportClientExcel,
} from "../../services/exportService";

const NotesPage = () => {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [notes, setNotes] = useState([]);

  const [showAddModal, setShowAddModal] =
  useState(false);

  const user = JSON.parse(
  localStorage.getItem("user")
  );

  const navigate = useNavigate();

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const data = await getClients();
      setClients(data);
    } catch (err) {
      console.error(err);
    }
  };

  const loadNotes = async (clientId) => {
  try {

    const notesData =
      await getNotesByClient(clientId);

    setNotes(notesData);

  } catch (err) {

    console.error(err);

  }
};

const handleClientSelect = async (
  client
) => {

  setSelectedClient(client);

  await loadNotes(
    client.client_id
  );

};

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Notes</h1>

      <div className="grid grid-cols-12 gap-6">

        {/* CLIENTS */}
        <div className="col-span-4 bg-white rounded-xl shadow p-4">
          <h2 className="font-semibold mb-4">Clients</h2>

          <div className="space-y-2">
            {clients.map((client) => (
              <div
                key={client.client_id}
                onClick={() => handleClientSelect(client)}
                className={`p-3 rounded-lg cursor-pointer border transition ${
                  selectedClient?.client_id === client.client_id
                    ? "bg-indigo-50 border-indigo-500"
                    : "hover:bg-gray-50"
                }`}
              >
                <h3 className="font-medium">{client.full_name}</h3>
                <p className="text-sm text-gray-500">
                  {client.domain_name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* NOTES */}
        <div className="col-span-8 bg-white rounded-xl shadow p-4">

          {!selectedClient ? (
            <p className="text-gray-500">
              Select a client to view notes
            </p>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">

  <div>

    <h2 className="text-xl font-semibold">
      {selectedClient.full_name}
    </h2>

    <p className="text-gray-500">
      {selectedClient.email}
    </p>

  </div>

  <div className="flex gap-2">

  <button
    onClick={() =>
      setShowAddModal(true)
    }
    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
  >
    + Add Note
  </button>

  {user?.role === "super_user" && (

    <>

      <button
        onClick={() =>
          exportClientPDF(
            selectedClient.client_id
          )
        }
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
      >
        Export PDF
      </button>

      <button
        onClick={() =>
          exportClientExcel(
            selectedClient.client_id
          )
        }
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
      >
        Export Excel
      </button>

    </>

  )}

</div>

</div>

              <table className="w-full">
                <thead className="border-b text-gray-500 text-sm">
                  <tr>
                    <th className="text-left py-3">Note ID</th>
                    <th className="text-left">Type</th>
                    <th className="text-left">User</th>
                    <th className="text-left">Date</th>
                  </tr>
                </thead>

                <tbody>
                  {notes.map((note) => (
                    <tr
                      key={note.note_id}
                      onClick={() =>
                        navigate(`/notes/${note.note_id}`, {
                          state: {
                            note,
                            client: selectedClient,
                          },
                        })
                      }
                      className="border-b cursor-pointer hover:bg-gray-50"
                    >
                      <td className="py-4">NID#{note.note_id}</td>

                      <td>
                        <span className="bg-indigo-100 text-indigo-600 px-2 py-1 rounded text-xs">
                          {note.note_type}
                        </span>
                      </td>

                      <td>{note.username}</td>

                      <td>
                        {new Date(note.created_at).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
    {showAddModal &&
  selectedClient && (

    <AddNoteModal
      client={selectedClient}
      onClose={() =>
        setShowAddModal(false)
      }
      onSuccess={() =>
        loadNotes(
          selectedClient.client_id
        )
      }
    />

)}  
    </DashboardLayout>
  );
};

export default NotesPage;