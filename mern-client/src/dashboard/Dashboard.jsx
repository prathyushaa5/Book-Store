import React from 'react';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  XAxis, // Import XAxis component from recharts
} from 'recharts';

const Dashboard = () => {
  // Sample data for the bar chart (sales data)
  const salesData = [
    { month: 'January', sales: 200 },
    { month: 'February', sales: 350 },
    { month: 'March', sales: 400 },
    { month: 'April', sales: 280 },
    { month: 'May', sales: 500 },
    { month: 'June', sales: 600 },
    { month: 'July', sales: 450 },
  ];

  // Sample data for the pie chart (book category distribution)
  const pieData = [
    { name: 'Fiction', value: 25 },
    { name: 'Science', value: 10 },
    { name: 'History', value: 8 },
    { name: 'Self-help', value: 5 },
    { name: 'Cooking', value: 2 },
    { name: 'Education', value: 40 },
    { name: 'Self help', value: 5 },
    { name: 'Non Fiction', value: 5 },
  ];

  // Sample data for positive and negative reviews pie chart
  const reviewData = [
    { name: 'Positive', value: 93 },
    { name: 'Negative', value: 7 },
  ];

  // Colors for the pie charts
  const COLORS = ['#82ca9d', '#8884d8', '#ffc658', '#ff7f0e', '#ff5722', '#4caf50', '#2196f3', '#9c27b0'];

  return (
    <div className="bg-gray-900 container text-white  ">
      <div className="p-8">
        <h1 className="text-3xl font-semibold mb-8">Dashboard</h1>

        {/* Bar chart */}
        <div className="bg-gray-800 rounded-lg shadow-lg  p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-center">Sales Overview</h2>
          <div className="w-full h-96 mx-auto">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={salesData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="month" /> {/* XAxis with dataKey "month" */}
                <Bar dataKey="sales" fill="#8884d8" />
                <Tooltip />
                <Legend />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Book Categories Distribution Pie chart */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-center">Book Categories Distribution</h2>
          <div className="w-full h-96 mx-auto">
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {
                    pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))
                  }
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Positive and Negative Reviews Pie chart */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-center">Positive vs. Negative Reviews</h2>
          <div className="w-full h-96 mx-auto">
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={reviewData}
                  cx="50%"
                  cy="50%"
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {
                    reviewData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))
                  }
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
