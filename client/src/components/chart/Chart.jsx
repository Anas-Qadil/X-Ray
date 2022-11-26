import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


const Chart = ({ aspect, title, color = "#00A7E1", graph }) => {

  const data = [
    { name: "January", Dose: graph?.hasOwnProperty("1") ? Number(graph['1']?.dose).toFixed(2) || 0 : 0 },
    { name: "February", Dose: graph?.hasOwnProperty("2") ? Number(graph['2']?.dose).toFixed(2) || 0 : 0 },
    { name: "March", Dose: graph?.hasOwnProperty("3") ? Number(graph['3']?.dose).toFixed(2) || 0 : 0 },
    { name: "April", Dose: graph?.hasOwnProperty("4") ? Number(graph['4']?.dose).toFixed(2) || 0 : 0 },
    { name: "May", Dose: graph?.hasOwnProperty("5") ? Number(graph['5']?.dose).toFixed(2) || 0 : 0 },
    { name: "June", Dose: graph?.hasOwnProperty("6") ? Number(graph['6']?.dose).toFixed(2) || 0 : 0 },
    { name: "July", Dose: graph?.hasOwnProperty("7") ? Number(graph['7']?.dose).toFixed(2) || 0 : 0 },
    { name: "August", Dose: graph?.hasOwnProperty("8") ? Number(graph['8']?.dose).toFixed(2) || 0 : 0 },
    { name: "September", Dose: graph?.hasOwnProperty("9") ? Number(graph['9']?.dose).toFixed(2) || 0 : 0 },
    { name: "October", Dose: graph?.hasOwnProperty("10") ? Number(graph['10']?.dose).toFixed(2) || 0 : 0 },
    { name: "November", Dose: graph?.hasOwnProperty("11") ? Number(graph['11']?.dose).toFixed(2) || 0 : 0 },
    { name: "December", Dose: graph?.hasOwnProperty("12") ? Number(graph['12']?.dose).toFixed(2) || 0 : 0 },
  ];

  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer height="50%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.8} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Dose"
            stroke={color}
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
