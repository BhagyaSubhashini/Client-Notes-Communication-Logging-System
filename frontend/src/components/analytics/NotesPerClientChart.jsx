import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const NotesPerClientChart = ({ data }) => {

  return (

    <div className="bg-white p-6 rounded-xl shadow h-[450px]">

      <h2 className="font-bold mb-4">

        Top Clients By Notes

      </h2>

      <ResponsiveContainer>

        <BarChart data={data}>

          <XAxis dataKey="full_name" />

          <YAxis />

          <Tooltip />

          <Bar dataKey="count" fill="#8B5CF6" />

        </BarChart>

      </ResponsiveContainer>

    </div>

  );

};

export default NotesPerClientChart;