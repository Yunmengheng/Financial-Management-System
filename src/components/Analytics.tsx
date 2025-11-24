'use client';

import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { TrendingUp, PieChart as PieChartIcon, BarChart3 } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const monthlyTrend = [
  { month: 'Jun', income: 7200, expenses: 5200 },
  { month: 'Jul', income: 7500, expenses: 5800 },
  { month: 'Aug', income: 7800, expenses: 5500 },
  { month: 'Sep', income: 7600, expenses: 6100 },
  { month: 'Oct', income: 8200, expenses: 5900 },
  { month: 'Nov', income: 8500, expenses: 6200 },
];

const categoryBreakdown = [
  { category: 'Food', amount: 1250, color: '#8b5cf6' },
  { category: 'Transport', amount: 450, color: '#06b6d4' },
  { category: 'Utilities', amount: 680, color: '#f59e0b' },
  { category: 'Entertainment', amount: 380, color: '#ec4899' },
  { category: 'Shopping', amount: 920, color: '#10b981' },
];

const weeklySpending = [
  { week: 'Week 1', amount: 520 },
  { week: 'Week 2', amount: 680 },
  { week: 'Week 3', amount: 450 },
  { week: 'Week 4', amount: 890 },
];

export function Analytics() {
  const totalIncome = monthlyTrend.reduce((sum, m) => sum + m.income, 0);
  const totalExpenses = monthlyTrend.reduce((sum, m) => sum + m.expenses, 0);
  const totalSavings = totalIncome - totalExpenses;
  const savingsRate = ((totalSavings / totalIncome) * 100).toFixed(1);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-2">Analytics</h1>
        <p className="text-muted-foreground">Financial insights and trends</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-white/90">
              <TrendingUp className="w-5 h-5" />
              Total Savings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-white">${totalSavings.toLocaleString()}</div>
            <p className="text-white/70">Last 6 months</p>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-fuchsia-500 to-pink-600 text-white shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-white/90">
              <PieChartIcon className="w-5 h-5" />
              Savings Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-white">{savingsRate}%</div>
            <p className="text-white/70">Of income</p>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-white/90">
              <BarChart3 className="w-5 h-5" />
              Avg. Income
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-white">${(totalIncome / monthlyTrend.length).toLocaleString()}</div>
            <p className="text-white/70">Per month</p>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-white/90">
              <BarChart3 className="w-5 h-5" />
              Avg. Expenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-white">${(totalExpenses / monthlyTrend.length).toLocaleString()}</div>
            <p className="text-white/70">Per month</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>6-Month Trend</CardTitle>
            <p className="text-muted-foreground">Income vs Expenses</p>
          </CardHeader>
          <CardContent className="pt-6">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-border" />
                <XAxis dataKey="month" stroke="currentColor" className="text-muted-foreground" />
                <YAxis stroke="currentColor" className="text-muted-foreground" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '12px',
                    color: 'hsl(var(--foreground))'
                  }}
                />
                <Line type="monotone" dataKey="income" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', r: 4 }} />
                <Line type="monotone" dataKey="expenses" stroke="#f43f5e" strokeWidth={3} dot={{ fill: '#f43f5e', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Category Breakdown</CardTitle>
            <p className="text-muted-foreground">Expense distribution</p>
          </CardHeader>
          <CardContent className="pt-6">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ category, percent }) => `${category} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="amount"
                >
                  {categoryBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '12px',
                    color: 'hsl(var(--foreground))'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg lg:col-span-2">
          <CardHeader>
            <CardTitle>Weekly Spending</CardTitle>
            <p className="text-muted-foreground">This month's breakdown</p>
          </CardHeader>
          <CardContent className="pt-6">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklySpending}>
                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-border" />
                <XAxis dataKey="week" stroke="currentColor" className="text-muted-foreground" />
                <YAxis stroke="currentColor" className="text-muted-foreground" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '12px',
                    color: 'hsl(var(--foreground))'
                  }}
                />
                <Bar dataKey="amount" fill="url(#colorGradient)" radius={[12, 12, 0, 0]} />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#d946ef" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Insights */}
      <Card className="border-0 bg-gradient-to-br from-violet-50 to-fuchsia-50 dark:from-violet-950 dark:to-fuchsia-950 shadow-lg">
        <CardHeader>
          <CardTitle>Financial Insights</CardTitle>
          <p className="text-muted-foreground">AI-powered recommendations</p>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-4 bg-white dark:bg-gray-900 rounded-2xl border border-violet-200 dark:border-violet-800">
            <div className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mt-0.5" />
              <div>
                <p className="text-foreground">Income Growth</p>
                <p className="text-muted-foreground">Your income increased by 18% over the last 6 months.</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white dark:bg-gray-900 rounded-2xl border border-violet-200 dark:border-violet-800">
            <div className="flex items-start gap-3">
              <PieChartIcon className="w-5 h-5 text-violet-600 dark:text-violet-400 mt-0.5" />
              <div>
                <p className="text-foreground">Savings Opportunity</p>
                <p className="text-muted-foreground">You could save an additional $300/month by optimizing subscriptions.</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white dark:bg-gray-900 rounded-2xl border border-violet-200 dark:border-violet-800">
            <div className="flex items-start gap-3">
              <BarChart3 className="w-5 h-5 text-fuchsia-600 dark:text-fuchsia-400 mt-0.5" />
              <div>
                <p className="text-foreground">Budget Performance</p>
                <p className="text-muted-foreground">You're on track to meet your savings goals this month.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
