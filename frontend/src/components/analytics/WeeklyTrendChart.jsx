import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LabelList,
} from "recharts";

const WeeklyTrendChart = ({
  data = [],
}) => {

  return (

    <div className="bg-white p-6 rounded-xl shadow h-[450px]">

      <h2 className="font-bold text-lg mb-4">
        Notes Logged This Week
      </h2>

      <ResponsiveContainer
        width="100%"
        height="90%"
      >

        <BarChart data={data}>

          <CartesianGrid
            strokeDasharray="3 3"
          />

          <XAxis
            dataKey="day_name"
          />

          <YAxis />

          <Tooltip
            formatter={(value) => [
              value,
              "Notes",
            ]}
          />

          <Bar
            dataKey="count"
            fill="#8B5CF6"
            radius={[6, 6, 0, 0]}
          >

            <LabelList
              dataKey="count"
              position="top"
            />

          </Bar>

        </BarChart>

      </ResponsiveContainer>

    </div>

  );

};

export default WeeklyTrendChart;