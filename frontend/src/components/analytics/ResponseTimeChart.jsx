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

const ResponseTimeChart = ({
  data = [],
}) => {

  const formatMinutes = (
    minutes
  ) => {

    if (!minutes) return "0m";

    if (minutes < 60) {
      return `${minutes}m`;
    }

    const hours =
      (minutes / 60).toFixed(1);

    return `${hours}h`;
  };

  return (

    <div className="bg-white p-6 rounded-xl shadow h-[500px]">

      <h2 className="font-bold text-lg mb-4">
        Average User Response Time (Minutes)
      </h2>

      <ResponsiveContainer
        width="100%"
        height="90%"
      >

        <BarChart
          layout="vertical"
          data={data}
          margin={{
            top: 20,
            right: 60,
            left: 50,
            bottom: 20,
          }}
        >

          <CartesianGrid
            strokeDasharray="3 3"
          />

          <XAxis
            type="number"
            tickCount={8}
            domain={[0, "auto"]}
            allowDecimals={false}
            label={{
              value: "Minutes",
              position: "insideBottom",
              offset: -5,
            }}
          />

          <YAxis
            type="category"
            dataKey="username"
            width={120}
          />

          <Tooltip
            formatter={(value) => [
              formatMinutes(
                value
              ),
              "Average Response Time",
            ]}
          />

          <Bar
            dataKey="avg_minutes"
            fill="#14B8A6"
            radius={[0, 6, 6, 0]}
          >

            <LabelList
              dataKey="avg_minutes"
              position="right"
              formatter={
                formatMinutes
              }
            />

          </Bar>

        </BarChart>

      </ResponsiveContainer>

    </div>

  );

};

export default ResponseTimeChart;