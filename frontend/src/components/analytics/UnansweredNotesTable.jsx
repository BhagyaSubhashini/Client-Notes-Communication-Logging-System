import { useNavigate } from "react-router-dom";

const UnansweredNotesTable = ({
  data = [],
}) => {

  const navigate =
    useNavigate();

  return (

    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="font-bold text-xl mb-4">
        Notes Without Replies
      </h2>

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

            {data.length === 0 ? (

              <tr>

                <td
                  colSpan="6"
                  className="text-center py-8 text-gray-500"
                >
                  No unanswered notes found
                </td>

              </tr>

            ) : (

              data.map((note) => (

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
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded"
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

    </div>

  );

};

export default UnansweredNotesTable;