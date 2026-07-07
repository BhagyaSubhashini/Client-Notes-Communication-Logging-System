import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const TYPE_COLORS = {
  general: "#6366F1",     // Indigo
  "site down": "#EF4444", // Red
  complaint: "#F59E0B",   // Amber
};

const NoteTypeChart = ({
  data = [],
}) => {

  const formattedData =
    data.map((item) => ({
      ...item,
      note_type:
        item.note_type?.toLowerCase(),
    }));

  return (

    <div className="bg-white p-5 rounded-xl shadow">

      <h2 className="text-lg font-semibold mb-4">
        Note Type Distribution
      </h2>

      <ResponsiveContainer
        width="100%"
        height={350}
      >
        <PieChart>

          <Pie
            data={formattedData}
            dataKey="count"
            nameKey="note_type"
            outerRadius={120}
            label={({
              note_type,
              percent,
            }) =>
              `${note_type} ${(
                percent * 100
              ).toFixed(0)}%`
            }
          >

            {formattedData.map(
              (entry, index) => (

                <Cell
                  key={index}
                  fill={
                    TYPE_COLORS[
                      entry.note_type
                    ] || "#94A3B8"
                  }
                />

              )
            )}

          </Pie>

          <Tooltip />

        </PieChart>
      </ResponsiveContainer>

      <div className="flex justify-center gap-6 mt-4 flex-wrap">

        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-indigo-500"></div>
          <span>General</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-red-500"></div>
          <span>Site Down</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-amber-500"></div>
          <span>Complaint</span>
        </div>

      </div>

    </div>

  );
};

export default NoteTypeChart;