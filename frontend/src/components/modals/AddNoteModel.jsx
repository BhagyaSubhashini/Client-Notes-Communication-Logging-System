import { useState } from "react";

import { createNote } from "../../services/noteService";

import API from "../../api/axios";

const AddNoteModal = ({
  client,
  onClose,
  onSuccess,
}) => {

  const [noteContent, setNoteContent] =
    useState("");

  const [noteType, setNoteType] =
    useState("General Note");

  const [file, setFile] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async () => {

    try {

      if (!noteContent.trim()) {

        alert(
          "Please enter note content"
        );

        return;
      }

      setLoading(true);

      // CREATE NOTE

      const note =
        await createNote({

          client_id:
            client.client_id,

          note_content:
            noteContent,

          note_type:
            noteType,

        });

      // FILE UPLOAD

      if (file) {

        const formData =
          new FormData();

        formData.append(
          "file",
          file
        );

        formData.append(
          "note_id",
          note.note_id
        );

        await API.post(
          "/attachments",
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );
      }

      if (onSuccess) {
        await onSuccess();
      }

      onClose();

    } catch (err) {

      console.error(
        "Create note error:",
        err
      );

      alert(
        "Failed to save note"
      );

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

      <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-xl">

        <div className="flex justify-between items-center mb-5">

          <h2 className="text-xl font-bold">
            Add Note
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black"
          >
            ✕
          </button>

        </div>

        {/* CLIENT INFO */}

        <div className="bg-gray-50 p-3 rounded-lg mb-4">

          <p className="font-medium">
            {client?.full_name}
          </p>

          <p className="text-sm text-gray-500">
            {client?.email}
          </p>

        </div>

        {/* NOTE CONTENT */}

        <textarea
          rows="5"
          placeholder="Enter note..."
          value={noteContent}
          onChange={(e) =>
            setNoteContent(
              e.target.value
            )
          }
          className="w-full border rounded-xl p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {/* NOTE TYPE */}

        <select
          value={noteType}
          onChange={(e) =>
            setNoteType(
              e.target.value
            )
          }
          className="w-full border rounded-xl p-3 mb-4"
        >

          <option>
            Complaint
          </option>

          <option>
            Site Down
          </option>

          <option>
            General
          </option>

        </select>

        {/* FILE */}

        <input
          type="file"
          onChange={(e) =>
            setFile(
              e.target.files[0]
            )
          }
          className="mb-5 w-full"
        />

        {/* BUTTONS */}

        <div className="flex justify-end gap-3">

          <button
            onClick={onClose}
            disabled={loading}
            className="border px-5 py-2 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg"
          >
            {loading
              ? "Saving..."
              : "Save Note"}
          </button>

        </div>

      </div>

    </div>
  );
};

export default AddNoteModal;