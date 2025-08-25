import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Database, Zap } from "lucide-react";

export function AuthPrompt() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight">
            Expense Tracker
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Take control of your finances with our beautiful, secure expense tracking app. 
            Record income and expenses with ease.
          </p>
        </div>

        {/* Setup Card */}
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <Database className="h-5 w-5" />
              Connect Supabase to Get Started
            </CardTitle>
            <CardDescription>
              To enable Google authentication and secure data storage, connect your project to Supabase
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sm font-semibold text-primary">1</span>
                </div>
                <div>
                  <h3 className="font-medium">Click the Supabase Button</h3>
                  <p className="text-sm text-muted-foreground">
                    Look for the green Supabase button in the top right corner of your screen
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sm font-semibold text-primary">2</span>
                </div>
                <div>
                  <h3 className="font-medium">Connect to Supabase</h3>
                  <p className="text-sm text-muted-foreground">
                    Follow the setup process to enable authentication and database features  
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sm font-semibold text-primary">3</span>
                </div>
                <div>
                  <h3 className="font-medium">Start Tracking</h3>
                  <p className="text-sm text-muted-foreground">
                    Once connected, you'll have Google login and secure expense tracking
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-4 w-4 text-primary" />
                <span className="font-medium text-sm">What you'll get:</span>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Google OAuth authentication</li>
                <li>• Secure cloud database storage</li>
                <li>• Real-time data synchronization</li>
                <li>• Automatic backups</li>
              </ul>
            </div>

            <Button className="w-full" size="lg" disabled>
              <Shield className="mr-2 h-4 w-4" />
              Connect Supabase First
            </Button>
          </CardContent>
        </Card>

        {/* Preview Section */}
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-semibold">App Preview</h2>
          <p className="text-muted-foreground">
            Here's what your expense tracker will look like once authentication is set up:
          </p>
        </div>
      </div>
    </div>
  );
}