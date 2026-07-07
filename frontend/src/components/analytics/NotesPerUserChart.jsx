import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const NotesPerUserChart = ({ data }) => {

  return (

    <div className="bg-white p-6 rounded-xl shadow h-[400px]">

      <h2 className="font-bold mb-4">

        Notes Logged Per User

      </h2>

      <ResponsiveContainer>

        <BarChart data={data}>

          <XAxis dataKey="username" />

          <YAxis />

          <Tooltip />

          <Bar dataKey="count" fill="#6366F1" />

        </BarChart>

      </ResponsiveContainer>

    </div>

  );

};

export default NotesPerUserChart;