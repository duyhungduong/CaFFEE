import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const data = [
  { name: "January", Total: 1200 },
  { name: "February", Total: 2100 },
  { name: "March", Total: 800 },
  { name: "April", Total: 1600 },
  { name: "May", Total: 900 },
  { name: "June", Total: 1700 },
  { name: "July", Total: 1200 },
  { name: "August", Total: 2100 },
  { name: "September", Total: 800 },
  { name: "October", Total: 1600 },
];

function ResponsiveContainerChart() {
  return (
    <div className="flex-3 p-6 rounded-lg shadow-lg">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Last 10 Months (Revenue)</h3>
      </div>
      <div className="w-full h-auto">
        <AreaChart
          width={1200} // Tăng chiều rộng
          height={320} // Tăng chiều cao
          data={data}
          margin={{ top: 20, right: 40, left: 20, bottom: 10 }} // Điều chỉnh margin
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6a85b6" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#bac8e0" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" className="text-gray-700 text-sm font-medium" />
          <YAxis className="text-gray-700 text-sm font-medium" />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(255,255,255,0.9)",
              borderRadius: "10px",
              boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
            }}
          />

          <Area
            type="monotone"
            dataKey="Total"
            stroke="#4a77b6"
            strokeWidth={2} // Tăng độ dày
            fillOpacity={1}
            fill="url(#total)"
            activeDot={{ r: 8 }} // Kích thước lớn hơn khi hover
          />
        </AreaChart>
      </div>
    </div>
  );
}

export default ResponsiveContainerChart;
