const ClientCard = ({
  client,
  onAddNote,
}) => {

  if (!client) {
    return (
      <div className="bg-white p-5 rounded-xl shadow w-full xl:w-80">

        <h3 className="font-semibold text-lg mb-4">
          Client Details
        </h3>

        <div className="text-center py-10 text-gray-500">
          Search a client to view details
        </div>

      </div>
    );
  }

  return (
    <div className="bg-white p-5 rounded-xl shadow w-full xl:w-80">

      <h3 className="text-lg font-semibold mb-2">
        {client.full_name}
      </h3>

      <p className="text-sm text-gray-500 mb-4">
        WHMCS ID: {client.whmcs_username}
      </p>

      <div className="text-sm space-y-2">

        <p>
          📞 {client.phone_number}
        </p>

        <p>
          📧 {client.email}
        </p>

        <p>
          🌐 {client.domain_name}
        </p>

      </div>

      <button
        onClick={() =>
          onAddNote(client)
        }
        className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
      >
        + Add Note
      </button>

    </div>
  );
};

export default ClientCard;