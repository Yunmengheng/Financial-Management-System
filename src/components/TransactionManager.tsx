'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Badge } from './ui/badge';
import { Pencil, Trash2, Plus, Search, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { toast } from 'sonner';

interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  date: string;
  category: string;
}

const initialTransactions: Transaction[] = [
  { id: 1, description: 'Salary Deposit', amount: 7200, type: 'income', date: '2025-11-08', category: 'Salary' },
  { id: 2, description: 'Grocery Shopping', amount: 250, type: 'expense', date: '2025-11-07', category: 'Food' },
  { id: 3, description: 'Electric Bill', amount: 120, type: 'expense', date: '2025-11-06', category: 'Utilities' },
  { id: 4, description: 'Freelance Project', amount: 1500, type: 'income', date: '2025-11-05', category: 'Freelance' },
  { id: 5, description: 'Restaurant Dinner', amount: 85, type: 'expense', date: '2025-11-04', category: 'Food' },
];

export function TransactionManager() {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    type: 'expense' as 'income' | 'expense',
    date: new Date().toISOString().split('T')[0],
    category: 'Food',
  });

  const categories = ['Food', 'Utilities', 'Transportation', 'Entertainment', 'Healthcare', 'Shopping', 'Salary', 'Freelance', 'Investment', 'Other'];

  const handleAdd = () => {
    const newTransaction: Transaction = {
      id: Math.max(...transactions.map(t => t.id), 0) + 1,
      description: formData.description,
      amount: parseFloat(formData.amount),
      type: formData.type,
      date: formData.date,
      category: formData.category,
    };

    setTransactions([newTransaction, ...transactions]);
    setIsAddDialogOpen(false);
    setFormData({
      description: '',
      amount: '',
      type: 'expense',
      date: new Date().toISOString().split('T')[0],
      category: 'Food',
    });
    toast.success('Transaction added successfully');
  };

  const handleEdit = () => {
    if (!editingTransaction) return;

    setTransactions(transactions.map(t =>
      t.id === editingTransaction.id
        ? {
            ...t,
            description: formData.description,
            amount: parseFloat(formData.amount),
            type: formData.type,
            date: formData.date,
            category: formData.category,
          }
        : t
    ));
    setEditingTransaction(null);
    setFormData({
      description: '',
      amount: '',
      type: 'expense',
      date: new Date().toISOString().split('T')[0],
      category: 'Food',
    });
    toast.success('Transaction updated');
  };

  const handleDelete = (id: number) => {
    setTransactions(transactions.filter(t => t.id !== id));
    toast.success('Transaction deleted');
  };

  const startEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setFormData({
      description: transaction.description,
      amount: transaction.amount.toString(),
      type: transaction.type,
      date: transaction.date,
      category: transaction.category,
    });
  };

  const filteredTransactions = transactions.filter(t => 
    t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalIncome = filteredTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = filteredTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2">Transactions</h1>
          <p className="text-muted-foreground">Manage your income and expenses</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 text-white shadow-lg shadow-purple-500/30 rounded-xl">
              <Plus className="w-4 h-4 mr-2" />
              Add Transaction
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-3xl">
            <DialogHeader>
              <DialogTitle>Add Transaction</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Description</Label>
                <Input
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="e.g., Grocery shopping"
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label>Amount</Label>
                <Input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  placeholder="0.00"
                  className="rounded-xl"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Type</Label>
                  <Select value={formData.type} onValueChange={(value: 'income' | 'expense') => setFormData({ ...formData, type: value })}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="income">Income</SelectItem>
                      <SelectItem value="expense">Expense</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Date</Label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="rounded-xl"
                />
              </div>
              <Button onClick={handleAdd} className="w-full rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 text-white">
                Add Transaction
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card className="border-0 bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-white/90">Total Income</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-white">${totalIncome.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-white/90">Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-white">${totalExpenses.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-white/90">Net Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-white">${(totalIncome - totalExpenses).toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Search transactions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-12 h-14 rounded-2xl border-0 bg-card shadow-lg"
        />
      </div>

      {/* Transactions List */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>All Transactions ({filteredTransactions.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 rounded-2xl bg-accent/50 hover:bg-accent transition-all group"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    transaction.type === 'income' 
                      ? 'bg-gradient-to-br from-emerald-500 to-teal-600' 
                      : 'bg-gradient-to-br from-rose-500 to-pink-600'
                  }`}>
                    {transaction.type === 'income' ? (
                      <ArrowUpCircle className="w-6 h-6 text-white" />
                    ) : (
                      <ArrowDownCircle className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-foreground">{transaction.description}</p>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Badge variant="outline" className="rounded-lg">{transaction.category}</Badge>
                      <span>•</span>
                      <span>{new Date(transaction.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className={`${
                    transaction.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toLocaleString()}
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Dialog open={editingTransaction?.id === transaction.id} onOpenChange={(open) => !open && setEditingTransaction(null)}>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm" onClick={() => startEdit(transaction)} className="rounded-xl">
                        <Pencil className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="rounded-3xl">
                      <DialogHeader>
                        <DialogTitle>Edit Transaction</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Description</Label>
                          <Input
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="rounded-xl"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Amount</Label>
                          <Input
                            type="number"
                            value={formData.amount}
                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                            className="rounded-xl"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Type</Label>
                            <Select value={formData.type} onValueChange={(value: 'income' | 'expense') => setFormData({ ...formData, type: value })}>
                              <SelectTrigger className="rounded-xl">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="income">Income</SelectItem>
                                <SelectItem value="expense">Expense</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Category</Label>
                            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                              <SelectTrigger className="rounded-xl">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {categories.map(cat => (
                                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Date</Label>
                          <Input
                            type="date"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            className="rounded-xl"
                          />
                        </div>
                        <Button onClick={handleEdit} className="w-full rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 text-white">
                          Update Transaction
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(transaction.id)}
                    className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950 rounded-xl"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
