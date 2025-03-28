import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

// Define colors for each category
const categoryColors: Record<string, string> = {
  Housing: '#0088FE',
  Food: '#00C49F',
  Transport: '#FFBB28',
  Utilities: '#FF8042',
  Entertainment: '#A569BD',
  Other: '#BDC3C7',
};

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.75;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text 
      x={x} 
      y={y} 
      fill="white" 
      textAnchor="middle" 
      dominantBaseline="middle" 
      fontSize="12px" 
      fontWeight="bold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const ExpensesPieChart = ({ transactions }) => {
  // Calculate total income (sum of all "credit" transactions)
  const totalIncome = transactions
    .filter(txn => txn.type === "credit")
    .reduce((sum, txn) => sum + txn.amount, 0);

  // Group transactions by category and sum expenses
  const expenseTotals = transactions
    .filter(txn => txn.type === "debit")
    .reduce((acc, txn) => {
      const category = txn.category || "Other";
      acc[category] = (acc[category] || 0) + txn.amount;
      return acc;
    }, {} as Record<string, number>);

  // Convert expense data to pie chart format
  const chartData = Object.keys(expenseTotals).map(category => ({
    name: category,
    value: expenseTotals[category],
    color: categoryColors[category] || categoryColors["Other"], // Use predefined colors
  }));

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader>
        <CardTitle>Expenses Breakdown</CardTitle>
        <CardDescription>Total Income: ${totalIncome}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`$${value}`, 'Amount']}
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: 'var(--radius)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpensesPieChart;
