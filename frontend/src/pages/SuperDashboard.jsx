import { useEffect, useState } from "react";

import DashboardLayout from "../layout/DashboardLayout";

import ClientCard from "../components/ClientCard";
import NotesTable from "../components/NotesTable";

import AddNoteModal from "../components/modals/AddNoteModel";

import {
  searchClients,
  getDashboardStats,
} from "../services/clientService";

import {
  getNotesByClient,
  getLatestNotes,
} from "../services/noteService";

import {
  exportAllNotesPDF,
  exportAllNotesExcel,
} from "../services/exportService";

const SuperDashboard = () => {

  const [page, setPage] =
  useState(1);

  const [total, setTotal] =
  useState(0);

  const [stats, setStats] =
    useState(null);

  const [search, setSearch] =
    useState("");

  const [client, setClient] =
    useState(null);

  const [notes, setNotes] =
    useState([]);

  const [showAddNoteModal, setShowAddNoteModal] =
    useState(false);

  const [selectedClient, setSelectedClient] =
    useState(null);

  const user = JSON.parse(
  localStorage.getItem("user")
);

  useEffect(() => {

    fetchStats();

    loadLatestNotes();

  }, [page]);

  const fetchStats = async () => {

    try {

      const data =
        await getDashboardStats();

      setStats(data);

    } catch (err) {

      console.error(err);

    }
  };

  const loadLatestNotes =
    async () => {

      try {

        const data =
  await getLatestNotes(page);

setNotes(data.notes);

setTotal(data.total);

      } catch (err) {

        console.error(err);

      }
    };

  const handleSearch =
    async () => {

      if (!search.trim()) {

        setClient(null);

        loadLatestNotes();

        return;
      }

      try {

        const results =
          await searchClients(search);

        if (
          results &&
          results.length > 0
        ) {

          const selected =
            results[0];

          setClient(selected);

          const clientNotes =
            await getNotesByClient(
              selected.client_id
            );

          setNotes(clientNotes);

        } else {

          setClient(null);

          setNotes([]);
        }

      } catch (err) {

        console.error(err);

      }
    };

  const handleAddNote = (client) => {

    setSelectedClient(client);

    setShowAddNoteModal(true);

  };

  return (
    <DashboardLayout>

      <h1 className="text-2xl font-bold mb-6">
        Search & Records
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

        <div className="bg-white p-6 rounded-xl shadow border-l-4 border-amber-500">
          <h4 className="text-gray-500 text-sm">
            Total Clients
          </h4>

          <p className="text-3xl font-bold text-amber-600">
            {stats?.clients || 0}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow border-l-4 border-purple-500">
          <h4 className="text-gray-500 text-sm">
            Total Users
          </h4>

          <p className="text-3xl font-bold text-purple-600">
            {stats?.users || 0}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow border-l-4 border-indigo-500">
          <h4 className="text-gray-500 text-sm">
            Total Notes
          </h4>

          <p className="text-3xl font-bold text-indigo-600">
            {stats?.notes || 0}
          </p>
        </div>

      </div>

      <div className="bg-white p-4 rounded-xl shadow mb-6">

        <div className="flex flex-col lg:flex-row gap-3">

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search by Phone, Email, Domain or Note ID"
            className="flex-1 border rounded-lg px-4 py-2"
          />

          <button
            onClick={handleSearch}
            className="bg-indigo-600 text-white px-6 rounded-lg"
          >
            Search
          </button>

          {user?.role === "super_user" && (

            <>

              <button
                onClick={exportAllNotesPDF}
                className="bg-red-600 hover:bg-red-700 text-white px-5 rounded-lg"
              >
                Export PDF
              </button>

              <button
                onClick={exportAllNotesExcel}
                className="bg-green-600 hover:bg-green-700 text-white px-5 rounded-lg"
              >
                Export Excel
              </button>

            </>

          )}

        </div>

      </div>

      <div className="flex flex-col xl:flex-row gap-6">

        <ClientCard
          client={client}
          onAddNote={handleAddNote}
        />

        <NotesTable
  notes={notes}
  title={
    client
      ? `${client.full_name}'s Notes`
      : "Latest Notes"
  }
  page={page}
  total={total}
  onPrev={() =>
    setPage((prev) =>
      Math.max(prev - 1, 1)
    )
  }
  onNext={() =>
    setPage((prev) =>
      prev + 1
    )
  }
/>

      </div>

      {showAddNoteModal &&
        selectedClient && (

        <AddNoteModal
          client={selectedClient}
          onClose={() =>
            setShowAddNoteModal(false)
          }
          onSuccess={async () => {

            const clientNotes =
              await getNotesByClient(
                selectedClient.client_id
              );

            setNotes(clientNotes);

            fetchStats();

          }}
        />

      )}

    </DashboardLayout>
  );
};

export default SuperDashboard;