
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ExampleChart = () => {
  const data = [
    { name: 'A', value: 10 },
    { name: 'B', value: 30 },
    { name: 'C', value: 20 },
    { name: 'D', value: 40 },
    { name: 'E', value: 25 },
  ];

  return (
    <div className="h-64 w-full">
        <h3 className="text-xl font-bold text-gray-800">Example Chart</h3>
        <ResponsiveContainer width={'99%'} height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
        </ResponsiveContainer>
    
    </div>
  );
};

export default ExampleChart;