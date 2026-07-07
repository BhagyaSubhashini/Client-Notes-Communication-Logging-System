import {
  useEffect,
  useState,
} from "react";

import {
  useLocation,
  useParams,
} from "react-router-dom";

import DashboardLayout from "../../layout/DashboardLayout";

import {
  getReplies,
  addReply,
} from "../../services/replyService";

import {
  getNoteById,
} from "../../services/noteService";

import API from "../../api/axios";

const NoteDetailsPage = () => {

  const location =
    useLocation();

  const { id } =
    useParams();

  const [note, setNote] =
    useState(
      location.state?.note || null
    );

  const [client, setClient] =
    useState(
      location.state?.client || null
    );

  const [replies, setReplies] =
    useState([]);

  const [reply, setReply] =
    useState("");

  const [
    attachments,
    setAttachments,
  ] = useState([]);

  useEffect(() => {

    const loadData =
      async () => {

        try {

          let currentNote =
            note;

          if (!currentNote) {

            const data =
              await getNoteById(id);

            currentNote =
              data;

            setNote(data);

            setClient({
              full_name:
                data.full_name,
              email:
                data.email,
            });

          }

          const repliesData =
            await getReplies(
              currentNote.note_id
            );

          setReplies(
            repliesData
          );

          const attachmentResponse =
            await API.get(
              `/attachments/${currentNote.note_id}`
            );

          setAttachments(
            attachmentResponse.data
          );

        } catch (err) {

          console.error(err);

        }

      };

    loadData();

  }, []);

  const handleReply =
    async () => {

      if (
        !reply.trim()
      )
        return;

      try {

        await addReply({
          note_id:
            note.note_id,
          reply_content:
            reply,
        });

        setReply("");

        const data =
          await getReplies(
            note.note_id
          );

        setReplies(
          data
        );

      } catch (err) {

        console.error(err);

      }

    };

  if (
    !note ||
    !client
  ) {

    return (
      <DashboardLayout>
        <div className="p-6">
          Loading...
        </div>
      </DashboardLayout>
    );

  }

  return (
    <DashboardLayout>

      <div className="bg-white rounded-xl shadow p-6">

        {/* CLIENT */}
        <div className="mb-6">

          <h1 className="text-2xl font-bold">
            {client.full_name}
          </h1>

          <p className="text-gray-500">
            {client.email}
          </p>

        </div>

        {/* NOTE */}
        <div className="border rounded-xl p-4 mb-6">

          <div className="flex justify-between mb-3">

            <span className="font-semibold">
              Note NID#{note.note_id}
            </span>

            <span className="text-sm text-gray-500">
              {new Date(
                note.created_at
              ).toLocaleString()}
            </span>

          </div>

          <div className="mb-3">

            <span className="bg-indigo-100 text-indigo-600 px-2 py-1 rounded text-xs">
              {note.note_type}
            </span>

          </div>

          <p>
            {note.note_content}
          </p>

        </div>

        {/* ATTACHMENTS */}
        <div className="mb-6">

          <h2 className="font-semibold mb-3">
            Attachments
          </h2>

          <div className="space-y-2">

            {attachments.map(
              (file) => (
                <a
                  key={
                    file.attachment_id
                  }
                  href={`http://localhost:5000${file.file_path}`}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-indigo-600 hover:underline"
                >
                  {file.file_name}
                </a>
              )
            )}

          </div>

        </div>

        {/* REPLIES */}
        <div className="mb-6">

          <h2 className="font-semibold mb-4">
            Replies
          </h2>

          <div className="space-y-4">

            {replies.map(
              (reply) => (
                <div
                  key={
                    reply.reply_id
                  }
                  className="border rounded-lg p-4"
                >
                  <div className="flex justify-between mb-2">

                    <span className="font-medium">
                      {reply.username}
                    </span>

                    <span className="text-sm text-gray-500">
                      {new Date(
                        reply.created_at
                      ).toLocaleString()}
                    </span>

                  </div>

                  <p>
                    {reply.reply_content}
                  </p>

                </div>
              )
            )}

          </div>

        </div>

        {/* ADD REPLY */}
        <div>

          <textarea
            rows="4"
            value={reply}
            onChange={(e) =>
              setReply(
                e.target.value
              )
            }
            placeholder="Write a reply..."
            className="w-full border rounded-xl p-3"
          />

          <button
            onClick={
              handleReply
            }
            className="mt-3 bg-indigo-600 text-white px-5 py-2 rounded-lg"
          >
            Add Reply
          </button>

        </div>

      </div>

    </DashboardLayout>
  );
};

export default NoteDetailsPage;