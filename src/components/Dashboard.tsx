'use client';

import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { TrendingUp, TrendingDown, DollarSign, PieChart } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const monthlyData = [
  { month: 'Jan', income: 5200, expenses: 3800 },
  { month: 'Feb', income: 5800, expenses: 4200 },
  { month: 'Mar', income: 6100, expenses: 4500 },
  { month: 'Apr', income: 5900, expenses: 4100 },
  { month: 'May', income: 6500, expenses: 4800 },
  { month: 'Jun', income: 7200, expenses: 5200 },
];

const recentTransactions = [
  { id: 1, description: 'Salary Deposit', amount: 7200, type: 'income', date: 'Nov 8' },
  { id: 2, description: 'Grocery Shopping', amount: -250, type: 'expense', date: 'Nov 7' },
  { id: 3, description: 'Electric Bill', amount: -120, type: 'expense', date: 'Nov 6' },
  { id: 4, description: 'Freelance Project', amount: 1500, type: 'income', date: 'Nov 5' },
];

export function Dashboard() {
  const totalIncome = 7200;
  const totalExpenses = 5200;
  const balance = totalIncome - totalExpenses;
  const savingsRate = ((balance / totalIncome) * 100).toFixed(1);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Your financial overview at a glance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-violet-500 to-purple-600 text-white">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-white/90">
              <DollarSign className="w-5 h-5" />
              Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-white mb-1">${balance.toLocaleString()}</div>
            <p className="text-white/70">+{savingsRate}% this month</p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-white/90">
              <TrendingUp className="w-5 h-5" />
              Income
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-white mb-1">${totalIncome.toLocaleString()}</div>
            <p className="text-white/70">This month</p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-rose-500 to-pink-600 text-white">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-white/90">
              <TrendingDown className="w-5 h-5" />
              Expenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-white mb-1">${totalExpenses.toLocaleString()}</div>
            <p className="text-white/70">This month</p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-fuchsia-500 to-purple-600 text-white">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-white/90">
              <PieChart className="w-5 h-5" />
              Savings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-white mb-1">{savingsRate}%</div>
            <p className="text-white/70">Savings rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Income & Expenses</CardTitle>
          <p className="text-muted-foreground">6-month trend analysis</p>
        </CardHeader>
        <CardContent className="pt-6">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
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

      {/* Recent Transactions */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <p className="text-muted-foreground">Latest transactions</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 rounded-2xl bg-accent/50 hover:bg-accent transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    transaction.type === 'income' 
                      ? 'bg-gradient-to-br from-emerald-500 to-teal-600' 
                      : 'bg-gradient-to-br from-rose-500 to-pink-600'
                  }`}>
                    {transaction.type === 'income' ? (
                      <TrendingUp className="w-6 h-6 text-white" />
                    ) : (
                      <TrendingDown className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <div>
                    <p className="text-foreground">{transaction.description}</p>
                    <p className="text-muted-foreground">{transaction.date}</p>
                  </div>
                </div>
                <div className={`${
                  transaction.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                }`}>
                  {transaction.amount > 0 ? '+' : ''}{transaction.amount < 0 ? transaction.amount : '+$' + transaction.amount.toLocaleString()}
                  {transaction.amount > 0 && '$' + transaction.amount.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
