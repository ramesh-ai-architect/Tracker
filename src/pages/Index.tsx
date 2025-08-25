import { useAuth } from "@/hooks/useAuth";
import { ExpenseForm } from "@/components/ExpenseForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, User, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const { user, session, loading, signOut } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!session || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl mx-auto space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <DollarSign className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight">
              Budget Tracker
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Take control of your finances with our beautiful, secure expense tracking app. 
              Record income and expenses with ease.
            </p>
          </div>

          {/* Auth Card */}
          <Card className="max-w-md mx-auto">
            <CardHeader className="text-center">
              <CardTitle>Get Started</CardTitle>
              <CardDescription>
                Sign in to start tracking your expenses and income
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/auth">
                <Button className="w-full" size="lg">
                  <User className="mr-2 h-4 w-4" />
                  Sign In / Sign Up
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="max-w-6xl mx-auto p-8">
        {/* Header with user info and logout */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Budget Tracker</h1>
              <p className="text-sm text-muted-foreground">Welcome back, {user.email}</p>
            </div>
          </div>
          <Button variant="outline" onClick={signOut} className="gap-2">
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>

        {/* Main content */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Track Your Finances</h2>
          <p className="text-muted-foreground">Record your income and expenses to stay on budget</p>
        </div>
        
        <ExpenseForm />
      </div>
    </div>
  );
};

export default Index;
