import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const DashboardLayout = ({ children }) => {

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  return (

    <div className="flex min-h-screen bg-gray-100 overflow-hidden">

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex-1 flex flex-col">

        <Topbar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <div className="p-4 md:p-6 overflow-y-auto flex-1">

          {children}

        </div>

      </div>

    </div>
  );
};

export default DashboardLayout;