import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, DollarSign, FileText, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export function ExpenseForm() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState<Date>(new Date());
  const [type, setType] = useState<string>("");
  const [particulars, setParticulars] = useState("");
  const [amount, setAmount] = useState("");
  const [comments, setComments] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication Error",
        description: "You must be logged in to save entries.",
        variant: "destructive",
      });
      return;
    }
    
    if (!date || !type || !particulars || !amount) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('expenses')
        .insert([
          {
            user_id: user.id,
            date: format(date, 'yyyy-MM-dd'),
            type,
            particulars,
            amount: parseFloat(amount),
            comments: comments.trim() || null
          }
        ]);
      
      if (error) throw error;
      
      // Reset form
      setType("");
      setParticulars("");
      setAmount("");
      setComments("");
      setDate(new Date());
      
      toast({
        title: "Success!",
        description: `${type === 'income' ? 'Income' : 'Expense'} entry saved successfully.`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save entry.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <DollarSign className="h-6 w-6 text-primary" />
          Add New Entry
        </CardTitle>
        <CardDescription>
          Record your income or expense details
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Date Field */}
            <div className="space-y-2">
              <Label htmlFor="date" className="text-sm font-medium">
                Date *
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Type Field */}
            <div className="space-y-2">
              <Label htmlFor="type" className="text-sm font-medium">
                Type *
              </Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="income" className="text-income">
                    💰 Income
                  </SelectItem>
                  <SelectItem value="expense" className="text-expense">
                    💸 Expense
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Particulars Field */}
          <div className="space-y-2">
            <Label htmlFor="particulars" className="text-sm font-medium">
              Particulars *
            </Label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="particulars"
                placeholder="e.g., Salary, Groceries, Rent..."
                value={particulars}
                onChange={(e) => setParticulars(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Amount Field */}
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-sm font-medium">
              Amount *
            </Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-10"
                step="0.01"
                min="0"
              />
            </div>
          </div>

          {/* Comments Field */}
          <div className="space-y-2">
            <Label htmlFor="comments" className="text-sm font-medium">
              Comments <span className="text-muted-foreground">(optional)</span>
            </Label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Textarea
                id="comments"
                placeholder="Additional notes..."
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                className="pl-10 min-h-[80px]"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary/90"
            size="lg"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent mr-2" />
            ) : (
              <DollarSign className="mr-2 h-4 w-4" />
            )}
            {isLoading ? 'Saving...' : 'Save Entry'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}