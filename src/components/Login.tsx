'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Moon, Sun } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export function Login({ onLogin, isDarkMode, toggleDarkMode }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 dark:from-gray-950 dark:via-purple-950 dark:to-fuchsia-950 flex items-center justify-center p-6">
      <button
        onClick={toggleDarkMode}
        className="absolute top-6 right-6 p-3 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm hover:bg-white/70 dark:hover:bg-gray-800/70 transition-colors"
      >
        {isDarkMode ? (
          <Sun className="w-5 h-5 text-gray-900 dark:text-gray-100" />
        ) : (
          <Moon className="w-5 h-5 text-gray-900 dark:text-gray-100" />
        )}
      </button>

      <div className="w-full max-w-md">
        <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl rounded-3xl shadow-2xl shadow-purple-500/20 dark:shadow-purple-500/10 p-10 border border-purple-200/50 dark:border-purple-800/50">
          <div className="flex flex-col items-center mb-10">
            <div className="w-20 h-20 bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-purple-500/40 mb-6">
              <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>

            <h1 className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent mb-3">Welcome Back</h1>
            <p className="text-muted-foreground text-center">Sign in to manage your finances</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 rounded-xl"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 rounded-xl"
                required
              />
            </div>

            <Button type="submit" className="w-full h-12 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 text-white shadow-lg shadow-purple-500/30">
              Sign In
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-muted-foreground text-center">
              Demo: Use any email/password
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
