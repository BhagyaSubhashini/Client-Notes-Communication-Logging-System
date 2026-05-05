import DashboardLayout from "../layout/DashboardLayout";
import ClientCard from "../components/ClientCard";
import NotesTable from "../components/NotesTable";

const SuperDashboard = () => {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Search & Records</h1>

      {/* TOP CARDS */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <h4 className="text-gray-500">Active Client Logs</h4>
          <p className="text-2xl font-bold">1,284</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h4 className="text-gray-500">Total Users</h4>
          <p className="text-2xl font-bold">42</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h4 className="text-gray-500">Pending Tasks</h4>
          <p className="text-2xl font-bold text-red-500">08</p>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex gap-6">
        <ClientCard />
        <NotesTable />
      </div>
    </DashboardLayout>
  );
};

export default SuperDashboard;