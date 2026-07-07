import { useEffect, useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import { getAnalytics } from "../../services/analyticsService";

import StatCards from "../../components/analytics/StatCards";
import NotesPerUserChart from "../../components/analytics/NotesPerUserChart";
import NotesPerClientChart from "../../components/analytics/NotesPerClientChart";
import NoteTypeChart from "../../components/analytics/NoteTypeChart";
import WeeklyTrendChart from "../../components/analytics/WeeklyTrendChart";
import RepliesPerUserChart from "../../components/analytics/RepliesPerUserChart";
import ResponseTimeChart from "../../components/analytics/ResponseTimeChart";
import UnansweredNotesTable from "../../components/analytics/UnansweredNotesTable";

const AnalyticsPage = () => {

  const [analytics, setAnalytics] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {

    try {

      const data =
        await getAnalytics();

      setAnalytics(data);

    } catch (err) {

      console.error(
        "Analytics load error:",
        err
      );

    } finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (
      <DashboardLayout>
        <div className="text-center py-20">
          Loading Analytics...
        </div>
      </DashboardLayout>
    );

  }

  return (

    <DashboardLayout>

      <h1 className="text-3xl font-bold mb-6">
        Analytics Dashboard
      </h1>

      <StatCards analytics={analytics} />

      <div className="grid lg:grid-cols-2 gap-6 mt-6">

        <NotesPerUserChart
          data={analytics.notesPerUser}
        />

        <RepliesPerUserChart
          data={analytics.repliesPerUser}
        />

      </div>

      <div className="grid lg:grid-cols-2 gap-6 mt-6">

        <NotesPerClientChart
          data={analytics.notesPerClient}
        />

        <NoteTypeChart
          data={analytics.noteTypes}
        />

      </div>

      <div className="grid lg:grid-cols-2 gap-6 mt-6">

        <WeeklyTrendChart
          data={analytics.weeklyTrend}
        />

        <ResponseTimeChart
          data={analytics.responseTimes}
        />

      </div>

      <div className="mt-6">

        <UnansweredNotesTable
          data={analytics.unansweredNotes}
        />

      </div>

    </DashboardLayout>

  );

};

export default AnalyticsPage;