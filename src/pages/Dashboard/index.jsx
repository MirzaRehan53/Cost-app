import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { PieChart, Pie, Cell } from "recharts";
import { Download } from "lucide-react";
import EditAllCostsModal from "../../components/EditAllCostsModal";

// All data definitions in one place
const costDistributionData = [
  { name: "Total Fixed Cost", value: 25, color: "#E2E8F0" },
  { name: "Breakeven Sales", value: 25, color: "#1E293B" },
  { name: "Cost Per Unit", value: 25, color: "#475569" },
  { name: "Total Cost Product", value: 25, color: "#94A3B8" },
];

const costBreakdownData = [
  { name: "Cost per\nunit", value: 45 },
  { name: "Direct\nCost", value: 35 },
  { name: "Variable\nCost", value: 25 },
  { name: "Indirect\nCost", value: 30 },
  { name: "Breakeven\nSales", value: 55 },
];

const costTrendData = [
  { month: "Jan", value: 10 },
  { month: "Feb", value: 30 },
  { month: "March", value: 20 },
  { month: "April", value: 38 },
  { month: "May", value: 55 },
  { month: "June", value: 42 },
];

const breakEvenData = [
  { units: 0, revenue: 8000, costs: 10000 },
  { units: 1000, revenue: 12000, costs: 12000 },
  { units: 2000, revenue: 16000, costs: 14000 },
  { units: 3000, revenue: 20000, costs: 16000 },
  { units: 4000, revenue: 24000, costs: 18000 },
];

const productData = [
  {
    productName: "Product A",
    sellingPrice: "$70.00",
    unitFixedCost: "$20.00",
    unitVariableCost: "$30.00",
    unitTotalCost: "$10.00",
    unitContributionMargin: "$40.00",
  },
  {
    productName: "Product B",
    sellingPrice: "$70.00",
    unitFixedCost: "$20.00",
    unitVariableCost: "$30.00",
    unitTotalCost: "$10.00",
    unitContributionMargin: "$40.00",
  },
  {
    productName: "Product C",
    sellingPrice: "$70.00",
    unitFixedCost: "$20.00",
    unitVariableCost: "$30.00",
    unitTotalCost: "$10.00",
    unitContributionMargin: "$40.00",
  },
];

// Basic card components
const Card = ({ children, className = "" }) => (
  <div
    className={`bg-white rounded-[20px] border border-skyBlue shadow ${className}`}
  >
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={`p-6 flex items-center ${className}`}>{children}</div>
);

const CardTitle = ({ children, className }) => (
  <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

const CostDashboard = () => {
  const [showModal, setShowModal] = useState(false);

  const handleDownload = () => {
    alert(
      "In a production environment, this would trigger a server-side PDF generation and download."
    );
  };

  return (
    <div id="cost-dashboard" className="min-h-screen  p-8 mt-20">
      <div className="max-w-7xl mx-auto">
        {/* Dashboard Title */}
        <Card className="mb-6 py-6   ">
          <CardHeader className="">
            <CardTitle className="text-[32px] ">
              Cost Accounting Dashboard
            </CardTitle>
          </CardHeader>
        </Card>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Cost metrics cards */}
          <Card>
            <CardHeader>
              <CardTitle>Total Cost</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">$15,000</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cost Per Unit</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">$15,000</div>
              <div className="text-sm text-gray-600">
                <div>Variable: $30.00</div>
                <div>Fixed: $30.00</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contribution Margin</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">$40.00</div>
              <div className="text-sm text-gray-600">Per unit</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Profit Margin</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">20%</div>
            </CardContent>
          </Card>

          {/* Cost Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Cost Distribution</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <div className="flex items-center justify-center h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={costDistributionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      startAngle={90}
                      endAngle={450}
                    >
                      {costDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <text
                      x="50%"
                      y="50%"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="text-xl font-bold"
                    >
                      100%
                    </text>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {costDistributionData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div
                      className="w-4 h-4"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm whitespace-nowrap">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Cost Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Cost Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={costBreakdownData} barSize={20}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="name"
                    angle={0}
                    interval={0}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#475569" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Cost Trend Over Time */}
          <Card>
            <CardHeader>
              <CardTitle>Cost Trend Over Time</CardTitle>
            </CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={costTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#475569"
                    dot={{ fill: "#475569" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Break-Even Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Break-Even Analysis</CardTitle>
            </CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={breakEvenData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="units" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#475569"
                    dot={{ fill: "#475569" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="costs"
                    stroke="#94A3B8"
                    dot={{ fill: "#94A3B8" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Product Cost Analysis */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Product Cost Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4">Product Name</th>
                    <th className="text-left p-4">Selling Price</th>
                    <th className="text-left p-4">Unit Fixed Cost</th>
                    <th className="text-left p-4">Unit Variable Cost</th>
                    <th className="text-left p-4">Unit Total Cost</th>
                    <th className="text-left p-4">Unit Contribution Margin</th>
                  </tr>
                </thead>
                <tbody>
                  {productData.map((product, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-4">{product.productName}</td>
                      <td className="p-4">{product.sellingPrice}</td>
                      <td className="p-4">{product.unitFixedCost}</td>
                      <td className="p-4">{product.unitVariableCost}</td>
                      <td className="p-4">{product.unitTotalCost}</td>
                      <td className="p-4">{product.unitContributionMargin}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Insights and Recommendations */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Insights and Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Consider reducing indirect costs by 10% to improve profit
                margin.
              </li>
              <li>Direct labor costs are higher than industry benchmarks.</li>
            </ul>
          </CardContent>
        </Card>

        {/* Footer Buttons */}
        <div className="mt-6 flex justify-between">
          <button className="px-4 py-0.5 hover:bg-skyBlue hover:text-white border border-skyBlue rounded text-gray-600">
            Previous
          </button>
          <div className="flex space-x-4">
            <button
              className="px-4 py-0.5 hover:bg-skyBlue hover:text-white border border-skyBlue rounded text-gray-600"
              onClick={() => setShowModal(true)}
            >
              Edit Result
            </button>
            <button
              onClick={handleDownload}
              className="px-4 py-2 hover:bg-gray-500 bg-gray-600 text-white rounded flex items-center gap-2"
            >
              <Download size={16} />
              Download report
            </button>
          </div>
        </div>
      </div>
      <div className="fixed z-50">
        {showModal && <EditAllCostsModal setShowModal={setShowModal} />}
      </div>
    </div>
  );
};

export default CostDashboard;
