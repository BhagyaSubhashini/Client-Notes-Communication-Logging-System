import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const RepliesPerUserChart = ({ data }) => {

  return (

    <div className="bg-white p-6 rounded-xl shadow h-[400px]">

      <h2 className="font-bold mb-4">

        Replies Per User

      </h2>

      <ResponsiveContainer>

        <BarChart data={data}>

          <XAxis dataKey="username" />

          <YAxis />

          <Tooltip />

          <Bar dataKey="count" fill="#14B8A6" />

        </BarChart>

      </ResponsiveContainer>

    </div>

  );

};

export default RepliesPerUserChart;