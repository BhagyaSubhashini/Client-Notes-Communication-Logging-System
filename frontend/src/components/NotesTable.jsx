const NotesTable = () => {
  return (
    <div className="bg-white p-5 rounded-xl shadow flex-1">
      <h3 className="text-lg font-semibold mb-4">Communication Log</h3>

      <table className="w-full text-sm">
        <thead className="text-gray-500 border-b">
          <tr>
            <th className="text-left py-2">Note ID</th>
            <th>Date & Time</th>
            <th>Note</th>
            <th>Logger</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          <tr className="border-b">
            <td>#1042</td>
            <td>Oct 24, 2023</td>
            <td className="text-red-500">SITE DOWN</td>
            <td>s_miller</td>
            <td>
              <button className="bg-indigo-500 text-white px-3 py-1 rounded">
                Reply
              </button>
            </td>
          </tr>

          <tr className="border-b">
            <td>#1038</td>
            <td>Oct 22, 2023</td>
            <td className="text-blue-500">GENERAL</td>
            <td>j_doe</td>
            <td>
              <button className="bg-indigo-500 text-white px-3 py-1 rounded">
                Reply
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default NotesTable;