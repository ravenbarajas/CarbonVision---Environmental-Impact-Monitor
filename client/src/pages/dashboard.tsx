import { useState } from "react";
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend,
  BarChart,
  Bar,
  CartesianGrid
} from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import MetricCard from "@/components/metric-card";
import ChartCard from "@/components/chart-card";
import { useCarbonContext } from "@/context/carbon-context";
import { formatCO2 } from "@/lib/utils";

const Dashboard = () => {
  const [timePeriod, setTimePeriod] = useState("month");
  const [trendTimeView, setTrendTimeView] = useState("weekly");
  const { metrics, emissionsData, emissionsTrend, comparisonData } = useCarbonContext();

  const renderPieChartLegend = () => {
    return (
      <div className="mt-4 grid grid-cols-2 gap-2">
        {emissionsData.map((entry, index) => (
          <div key={index} className="flex items-center">
            <span 
              className="h-3 w-3 rounded-full mr-2" 
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
              {entry.name} ({entry.percentage}%)
            </span>
          </div>
        ))}
      </div>
    );
  };

  const renderComparisonBarChart = () => {
    return (
      <div className="mt-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-neutral-700 dark:text-neutral-300">Your footprint</span>
          <span className="text-sm font-medium text-neutral-800 dark:text-neutral-100">
            {formatCO2(metrics.totalEmissions * 1000)}
          </span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-neutral-700 dark:text-neutral-300">National average</span>
          <span className="text-sm font-medium text-neutral-800 dark:text-neutral-100">
            {formatCO2(5200)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-neutral-700 dark:text-neutral-300">Global average</span>
          <span className="text-sm font-medium text-neutral-800 dark:text-neutral-100">
            {formatCO2(4700)}
          </span>
        </div>
      </div>
    );
  };

  // Colors for charts
  const COLORS = ['var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)', 'var(--chart-4)'];

  const timeButtons = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'yearly', label: 'Yearly' },
  ];

  return (
    <section className="mb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">Your Carbon Footprint</h2>
          <p className="text-neutral-600 dark:text-neutral-400">Overview of your environmental impact</p>
        </div>
        
        <div className="mt-4 md:mt-0 flex items-center space-x-2">
          <span className="text-sm text-neutral-600 dark:text-neutral-400">Time Period:</span>
          <Select 
            value={timePeriod} 
            onValueChange={setTimePeriod}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Last 30 Days</SelectItem>
              <SelectItem value="quarter">Last 3 Months</SelectItem>
              <SelectItem value="halfyear">Last 6 Months</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Emissions Card */}
        <MetricCard
          title="Total Emissions"
          value={formatCO2(metrics.totalEmissions * 1000)}
          icon={
            <svg 
              className="w-6 h-6 text-primary"
              viewBox="0 0 24 24" 
              fill="none"
              stroke="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M16 16c0-1.105-3.134-2-7-2s-7 0.895-7 2 3.134 2 7 2 7-0.895 7-2zM2 16v4c0 1.105 3.134 2 7 2s7-0.895 7-2v-4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path 
                d="M22 10c0-1.105-3.134-2-7-2s-7 0.895-7 2 3.134 2 7 2 7-0.895 7-2zM8 10v6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path 
                d="M18 4c0-1.105-3.134-2-7-2s-7 0.895-7 2 3.134 2 7 2 7-0.895 7-2zM2 4v6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path 
                d="M18 4v16"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
          changeValue={metrics.totalEmissionsChange + '%'}
          changeDirection={metrics.totalEmissionsChange > 0 ? "up" : "down"}
        />
        
        {/* Transportation Card */}
        <MetricCard
          title="Transportation"
          value={formatCO2(metrics.transportEmissions * 1000)}
          icon={
            <svg 
              className="w-6 h-6 text-secondary"
              viewBox="0 0 24 24" 
              fill="none"
              stroke="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M16 3h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path 
                d="M14 2H10a2 2 0 0 0-2 2v1h8V4a2 2 0 0 0-2-2z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="12" cy="16" r="2" strokeWidth="2" />
            </svg>
          }
          changeValue={metrics.transportEmissionsChange + '%'}
          changeDirection={metrics.transportEmissionsChange > 0 ? "up" : "down"}
        />
        
        {/* Energy Usage Card */}
        <MetricCard
          title="Energy Usage"
          value={formatCO2(metrics.energyEmissions * 1000)}
          icon={
            <svg 
              className="w-6 h-6 text-yellow-500"
              viewBox="0 0 24 24" 
              fill="none"
              stroke="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
          changeValue={metrics.energyEmissionsChange + '%'}
          changeDirection={metrics.energyEmissionsChange > 0 ? "up" : "down"}
        />
        
        {/* Diet Card */}
        <MetricCard
          title="Diet"
          value={formatCO2(metrics.dietEmissions * 1000)}
          icon={
            <svg 
              className="w-6 h-6 text-accent"
              viewBox="0 0 24 24" 
              fill="none"
              stroke="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M7 16.2V22m10-5.8V22M3 12h18M5 12V5c0-1.1.9-2 2-2h0a2 2 0 0 1 2 2v7m8 0v-3c0-1.1-.9-2-2-2h0a2 2 0 0 0-2 2v3m0 0h-4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
          changeValue={metrics.dietEmissionsChange + '%'}
          changeDirection={metrics.dietEmissionsChange > 0 ? "up" : "down"}
        />
      </div>
      
      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Emissions Breakdown Chart */}
        <ChartCard
          title="Emissions Breakdown"
          chart={
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={emissionsData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {emissionsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [`${formatCO2(value * 1000)}`, 'Emissions']}
                />
              </PieChart>
            </ResponsiveContainer>
          }
          footer={renderPieChartLegend()}
        />
        
        {/* Emissions Trend Chart */}
        <ChartCard
          title="Emissions Trend"
          chart={
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={emissionsTrend}
                margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
              >
                <XAxis dataKey="name" />
                <YAxis 
                  tickFormatter={(value) => `${value}kg`} 
                />
                <Tooltip 
                  formatter={(value: number) => [`${formatCO2(value)}`, 'Emissions']}
                />
                <Legend />
                <CartesianGrid strokeDasharray="3 3" />
                <Line 
                  type="monotone" 
                  dataKey="emissions" 
                  stroke="var(--primary)" 
                  activeDot={{ r: 8 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          }
          footer={
            <div className="mt-4 flex flex-wrap gap-2">
              {timeButtons.map(button => (
                <Button
                  key={button.value}
                  variant={trendTimeView === button.value ? "default" : "outline"}
                  size="sm"
                  className="rounded-full"
                  onClick={() => setTrendTimeView(button.value)}
                >
                  {button.label}
                </Button>
              ))}
            </div>
          }
        />
        
        {/* Comparison with Average Chart */}
        <ChartCard
          title="Comparison with Average"
          chart={
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={comparisonData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis unit="kg" />
                <Tooltip 
                  formatter={(value: number) => [`${formatCO2(value)}`, 'Emissions']}
                />
                <Legend />
                <Bar dataKey="emissions" fill="var(--primary)" />
              </BarChart>
            </ResponsiveContainer>
          }
          footer={renderComparisonBarChart()}
        />
      </div>
    </section>
  );
};

export default Dashboard;
