import { useState, useEffect } from 'react';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { TransactionManager } from './components/TransactionManager';
import { BudgetPlanner } from './components/BudgetPlanner';
import { Analytics } from './components/Analytics';
import { UserProfile } from './components/UserProfile';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';
import { Moon, Sun, Home, ArrowLeftRight, Wallet, BarChart3, User } from 'lucide-react';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<'dashboard' | 'transactions' | 'budget' | 'analytics' | 'profile'>('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleLogin = () => {
    setIsAuthenticated(true);
    toast.success('Welcome back!');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView('dashboard');
    toast.success('Logged out successfully');
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  if (!isAuthenticated) {
    return (
      <>
        <Login onLogin={handleLogin} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <Toaster />
      </>
    );
  }

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'transactions', label: 'Transactions', icon: ArrowLeftRight },
    { id: 'budget', label: 'Budget', icon: Wallet },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">FinanceHub</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleDarkMode}
                className="p-2.5 rounded-xl hover:bg-accent transition-colors"
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-foreground" />
                ) : (
                  <Moon className="w-5 h-5 text-foreground" />
                )}
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2.5 text-muted-foreground hover:text-foreground hover:bg-accent rounded-xl transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <nav className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentView(item.id as any)}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-lg shadow-purple-500/30'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {currentView === 'dashboard' && <Dashboard />}
            {currentView === 'transactions' && <TransactionManager />}
            {currentView === 'budget' && <BudgetPlanner />}
            {currentView === 'analytics' && <Analytics />}
            {currentView === 'profile' && <UserProfile />}
          </main>
        </div>
      </div>
    </div>
  );
}
