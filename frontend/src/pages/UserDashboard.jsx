import { useEffect, useState } from "react";

import DashboardLayout from "../layout/DashboardLayout";

import ClientCard from "../components/ClientCard";
import NotesTable from "../components/NotesTable";

import AddNoteModal from "../components/modals/AddNoteModel";

import {
  searchClients,
} from "../services/clientService";

import {
  getNotesByClient,
  getLatestNotes,
} from "../services/noteService";

const UserDashboard = () => {

  const [page, setPage] =
  useState(1);

  const [total, setTotal] =
  useState(0);

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

  useEffect(() => {

    loadLatestNotes();

  }, [page]);

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

      <div className="bg-white p-4 rounded-xl shadow mb-6 flex gap-3">

        <input
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
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

          }}
        />

      )}

    </DashboardLayout>
  );
};

export default UserDashboard;