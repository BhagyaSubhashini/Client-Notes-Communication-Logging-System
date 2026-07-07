const StatCards = ({ analytics }) => {

  return (

    <div className="grid md:grid-cols-4 gap-4">

      <div className="bg-white p-6 rounded-xl shadow border-l-4 border-indigo-500">
        <h4 className="text-gray-500 text-sm">
          Total Notes
        </h4>

        <p className="text-3xl font-bold text-indigo-600">
          {analytics?.stats?.notes || 0}
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow border-l-4 border-emerald-500">
        <h4 className="text-gray-500 text-sm">
          Total Replies
        </h4>

        <p className="text-3xl font-bold text-emerald-600">
          {analytics?.stats?.replies || 0}
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow border-l-4 border-amber-500">
        <h4 className="text-gray-500 text-sm">
          Total Clients
        </h4>

        <p className="text-3xl font-bold text-amber-600">
          {analytics?.stats?.clients || 0}
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow border-l-4 border-purple-500">
        <h4 className="text-gray-500 text-sm">
          Total Users
        </h4>

        <p className="text-3xl font-bold text-purple-600">
          {analytics?.stats?.users || 0}
        </p>
      </div>

    </div>

  );

};

export default StatCards;