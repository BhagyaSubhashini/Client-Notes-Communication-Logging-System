import { useNavigate } from "react-router-dom";

const NotesTable = ({
  notes,
  title = "Communication Log",
  page,
  total,
  onPrev,
  onNext,
}) => {
  const navigate = useNavigate();

  const start =
    notes.length > 0
      ? (page - 1) * 10 + 1
      : 0;

  const end =
    Math.min(page * 10, total);

  return (
    <div className="bg-white p-5 rounded-xl shadow flex-1">

      <h3 className="text-lg font-semibold mb-4">
        {title}
      </h3>

      <div className="overflow-x-auto">

        <table className="w-full text-sm">

          <thead className="border-b text-gray-500">

            <tr>

              <th className="text-left py-3">
                Note ID
              </th>

              <th className="text-left py-3">
                Date & Time
              </th>

              <th className="text-left py-3">
                Type
              </th>

              <th className="text-left py-3">
                Note
              </th>

              <th className="text-left py-3">
                Logger
              </th>

              <th className="text-left py-3">
                Reply
              </th>

            </tr>

          </thead>

          <tbody>

            {notes.length === 0 ? (

              <tr>

                <td
                  colSpan="6"
                  className="text-center py-8 text-gray-500"
                >
                  No notes found
                </td>

              </tr>

            ) : (

              notes.map((note) => (

                <tr
                  key={note.note_id}
                  onClick={() =>
                    navigate(
                      `/notes/${note.note_id}`,
                      {
                        state: {
                          note,
                          client: {
                            client_id:
                              note.client_id,
                            full_name:
                              note.full_name,
                            email:
                              note.email,
                          },
                        },
                      }
                    )
                  }
                  className="border-b hover:bg-gray-50 cursor-pointer"
                >

                  <td className="py-3">
                    NID#{note.note_id}
                  </td>

                  <td>
                    {new Date(
                      note.created_at
                    ).toLocaleString()}
                  </td>

                  <td>
                    {note.note_type}
                  </td>

                  <td className="max-w-xs truncate">
                    {note.note_content}
                  </td>

                  <td>
                    {note.username}
                  </td>

                  <td>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();

                        navigate(
                          `/notes/${note.note_id}`,
                          {
                            state: {
                              note,
                              client: {
                                client_id:
                                  note.client_id,
                                full_name:
                                  note.full_name,
                                email:
                                  note.email,
                              },
                            },
                          }
                        );
                      }}
                      className="bg-indigo-600 text-white px-3 py-1 rounded"
                    >
                      Reply
                    </button>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

      <div className="flex justify-between items-center mt-5">

        <p className="text-sm text-gray-500">

          Showing {start}-{end} of {total} notes

        </p>

        <div className="flex gap-2">

          <button
            onClick={onPrev}
            disabled={page === 1}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Previous
          </button>

          <button
            onClick={onNext}
            disabled={end >= total}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Next
          </button>

        </div>

      </div>

    </div>
  );
};

export default NotesTable;