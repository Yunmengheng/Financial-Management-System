'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Progress } from './ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Plus, Pencil, Trash2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface Budget {
  id: number;
  category: string;
  limit: number;
  spent: number;
}

const initialBudgets: Budget[] = [
  { id: 1, category: 'Food', limit: 800, spent: 335 },
  { id: 2, category: 'Transportation', limit: 300, spent: 60 },
  { id: 3, category: 'Utilities', limit: 250, spent: 195 },
  { id: 4, category: 'Entertainment', limit: 200, spent: 150 },
  { id: 5, category: 'Shopping', limit: 400, spent: 280 },
];

export function BudgetPlanner() {
  const [budgets, setBudgets] = useState<Budget[]>(initialBudgets);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null);
  const [formData, setFormData] = useState({
    category: '',
    limit: '',
  });

  const handleAdd = () => {
    const newBudget: Budget = {
      id: Math.max(...budgets.map(b => b.id), 0) + 1,
      category: formData.category,
      limit: parseFloat(formData.limit),
      spent: 0,
    };

    setBudgets([...budgets, newBudget]);
    setIsAddDialogOpen(false);
    setFormData({ category: '', limit: '' });
    toast.success('Budget created');
  };

  const handleEdit = () => {
    if (!editingBudget) return;

    setBudgets(budgets.map(b =>
      b.id === editingBudget.id
        ? { ...b, category: formData.category, limit: parseFloat(formData.limit) }
        : b
    ));
    setEditingBudget(null);
    setFormData({ category: '', limit: '' });
    toast.success('Budget updated');
  };

  const handleDelete = (id: number) => {
    setBudgets(budgets.filter(b => b.id !== id));
    toast.success('Budget deleted');
  };

  const startEdit = (budget: Budget) => {
    setEditingBudget(budget);
    setFormData({
      category: budget.category,
      limit: budget.limit.toString(),
    });
  };

  const totalLimit = budgets.reduce((sum, b) => sum + b.limit, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
  const totalRemaining = totalLimit - totalSpent;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2">Budget Planner</h1>
          <p className="text-muted-foreground">Plan and track your spending limits</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 text-white shadow-lg shadow-purple-500/30 rounded-xl">
              <Plus className="w-4 h-4 mr-2" />
              Add Budget
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-3xl">
            <DialogHeader>
              <DialogTitle>Create Budget</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <Input
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="e.g., Entertainment"
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label>Monthly Limit</Label>
                <Input
                  type="number"
                  value={formData.limit}
                  onChange={(e) => setFormData({ ...formData, limit: e.target.value })}
                  placeholder="0.00"
                  className="rounded-xl"
                />
              </div>
              <Button onClick={handleAdd} className="w-full rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 text-white">
                Create Budget
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card className="border-0 bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-white/90">Total Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-white">${totalLimit.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-white/90">Total Spent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-white">${totalSpent.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-white/90">Remaining</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-white">${totalRemaining.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      {/* Budget Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {budgets.map((budget) => {
          const percentage = (budget.spent / budget.limit) * 100;
          const isOverBudget = percentage > 100;
          const isWarning = percentage > 80 && percentage <= 100;

          return (
            <Card key={budget.id} className={`border-0 shadow-lg ${isOverBudget ? 'bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950 dark:to-pink-950' : isWarning ? 'bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950' : ''}`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{budget.category}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Dialog open={editingBudget?.id === budget.id} onOpenChange={(open) => !open && setEditingBudget(null)}>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" onClick={() => startEdit(budget)} className="rounded-xl">
                          <Pencil className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="rounded-3xl">
                        <DialogHeader>
                          <DialogTitle>Edit Budget</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label>Category</Label>
                            <Input
                              value={formData.category}
                              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                              className="rounded-xl"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Monthly Limit</Label>
                            <Input
                              type="number"
                              value={formData.limit}
                              onChange={(e) => setFormData({ ...formData, limit: e.target.value })}
                              className="rounded-xl"
                            />
                          </div>
                          <Button onClick={handleEdit} className="w-full rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 text-white">
                            Update Budget
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(budget.id)}
                      className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950 rounded-xl"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {isOverBudget && (
                  <div className="flex items-center gap-2 p-3 bg-rose-100 dark:bg-rose-900/30 border border-rose-200 dark:border-rose-800 rounded-xl">
                    <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                    <span className="text-rose-700 dark:text-rose-300">Over budget!</span>
                  </div>
                )}
                {isWarning && !isOverBudget && (
                  <div className="flex items-center gap-2 p-3 bg-amber-100 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 rounded-xl">
                    <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <span className="text-amber-700 dark:text-amber-300">Approaching limit</span>
                  </div>
                )}
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Progress</span>
                    <span className={`${isOverBudget ? 'text-rose-600 dark:text-rose-400' : 'text-foreground'}`}>
                      ${budget.spent.toLocaleString()} / ${budget.limit.toLocaleString()}
                    </span>
                  </div>
                  <Progress 
                    value={Math.min(percentage, 100)} 
                    className="h-3"
                  />
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span>{percentage.toFixed(0)}% used</span>
                    <span>${(budget.limit - budget.spent).toLocaleString()} left</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
