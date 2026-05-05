import DashboardLayout from "../layout/DashboardLayout";
import ClientCard from "../components/ClientCard";
import NotesTable from "../components/NotesTable";

const UserDashboard = () => {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Search & Records</h1>

      <div className="flex gap-6">
        <ClientCard />
        <NotesTable />
      </div>
    </DashboardLayout>
  );
};

export default UserDashboard;