import React, { useState } from 'react';
import { Character } from '../../types/game';
import { 
  modifyBankBalance, 
  formatCurrency, 
  getFinancialSummary, 
  canAfford, 
  validatePurchase,
  createInvestment,
  createLoan,
  getRecurringExpenses,
  initializeFinancialRecord
} from '../../systems/moneySystem';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Alert, AlertDescription } from '../ui/alert';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  CreditCard, 
  PiggyBank, 
  Home, 
  Car,
  AlertTriangle,
  Calculator,
  Banknote,
  Target
} from 'lucide-react';

interface MoneyTabProps {
  character: Character;
  onCharacterUpdate: (character: Character) => void;
  onEvent: (message: string) => void;
}

export const MoneyTab: React.FC<MoneyTabProps> = ({ 
  character, 
  onCharacterUpdate, 
  onEvent 
}) => {
  const [selectedInvestmentType, setSelectedInvestmentType] = useState<'Stocks' | 'Bonds' | 'Real Estate' | 'Crypto' | 'Savings Account' | 'CD'>('Stocks');
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [loanType, setLoanType] = useState<'Personal' | 'Mortgage' | 'Car' | 'Student' | 'Business'>('Personal');

  // Initialize financial record if needed
  const financialRecord = character.financialRecord || initializeFinancialRecord();

  const financialSummary = getFinancialSummary(character);
  const recurringExpenses = getRecurringExpenses(character);
  const balance = financialRecord.bankBalance;

  const handleInvestment = () => {
    const amount = parseFloat(investmentAmount);
    if (isNaN(amount) || amount <= 0) {
      onEvent('Please enter a valid investment amount');
      return;
    }

    const validation = validatePurchase(character, amount, `${selectedInvestmentType} investment`);
    if (!validation.canPurchase) {
      onEvent(validation.message);
      return;
    }

    const updatedCharacter = createInvestment(
      character,
      selectedInvestmentType,
      amount,
      `Investment in ${selectedInvestmentType}`
    );

    onCharacterUpdate(updatedCharacter);
    onEvent(`Successfully invested ${formatCurrency(amount)} in ${selectedInvestmentType}`);
    setInvestmentAmount('');
  };

  const handleLoanApplication = () => {
    const amount = parseFloat(loanAmount);
    if (isNaN(amount) || amount <= 0) {
      onEvent('Please enter a valid loan amount');
      return;
    }

    // Simple loan approval logic
    const maxLoanAmount = (character.salary || 0) * 1000 * 3; // 3x annual salary
    if (amount > maxLoanAmount) {
      onEvent(`Loan denied. Maximum eligible amount: ${formatCurrency(maxLoanAmount)}`);
      return;
    }

    const interestRate = 0.05 + Math.random() * 0.10; // 5-15%
    const termMonths = loanType === 'Mortgage' ? 360 : loanType === 'Car' ? 60 : 36;

    const updatedCharacter = createLoan(
      character,
      amount,
      loanType,
      'Bank of LifeJourney',
      interestRate,
      termMonths
    );

    onCharacterUpdate(updatedCharacter);
    onEvent(`Loan approved! ${formatCurrency(amount)} at ${(interestRate * 100).toFixed(1)}% interest`);
    setLoanAmount('');
  };

  const handleQuickTransaction = (amount: number, description: string, category: any) => {
    const validation = validatePurchase(character, Math.abs(amount), description);
    if (amount < 0 && !validation.canPurchase) {
      onEvent(validation.message);
      return;
    }

    const updatedCharacter = modifyBankBalance(character, amount, description, category);
    onCharacterUpdate(updatedCharacter);
    onEvent(amount > 0 ? `Received ${formatCurrency(amount)}` : `Spent ${formatCurrency(Math.abs(amount))}`);
  };

  return (
    <div className="space-y-6 p-4">
      {/* Financial Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Financial Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(balance)}
              </div>
              <div className="text-sm text-muted-foreground">Bank Balance</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                {formatCurrency(financialSummary.netWorth)}
              </div>
              <div className="text-sm text-muted-foreground">Net Worth</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(financialSummary.monthlyIncome)}
              </div>
              <div className="text-sm text-muted-foreground">Monthly Income</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {formatCurrency(financialSummary.monthlyExpenses)}
              </div>
              <div className="text-sm text-muted-foreground">Monthly Expenses</div>
            </div>
          </div>

          {financialSummary.debtToIncomeRatio > 0.4 && (
            <Alert className="mt-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                High debt-to-income ratio: {(financialSummary.debtToIncomeRatio * 100).toFixed(1)}%. 
                Consider paying down debt.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <Tabs defaultValue="transactions" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="investments">Investments</TabsTrigger>
          <TabsTrigger value="loans">Loans</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quick Transactions</CardTitle>
              <CardDescription>Common financial actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                <Button 
                  onClick={() => handleQuickTransaction(500, 'Part-time job earnings', 'Other')}
                  className="flex items-center gap-2"
                >
                  <Banknote className="h-4 w-4" />
                  Work ($500)
                </Button>
                <Button 
                  onClick={() => handleQuickTransaction(-100, 'Grocery shopping', 'Food')}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <TrendingDown className="h-4 w-4" />
                  Groceries (-$100)
                </Button>
                <Button 
                  onClick={() => handleQuickTransaction(-50, 'Entertainment', 'Other')}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <TrendingDown className="h-4 w-4" />
                  Entertainment (-$50)
                </Button>
                <Button 
                  onClick={() => handleQuickTransaction(1000, 'Gift from family', 'Gift')}
                  className="flex items-center gap-2"
                >
                  <TrendingUp className="h-4 w-4" />
                  Family Gift ($1k)
                </Button>
                <Button 
                  onClick={() => handleQuickTransaction(-200, 'Medical expenses', 'Medical')}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <TrendingDown className="h-4 w-4" />
                  Medical (-$200)
                </Button>
                <Button 
                  onClick={() => handleQuickTransaction(-300, 'Car maintenance', 'Car Maintenance')}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Car className="h-4 w-4" />
                  Car Repair (-$300)
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {financialRecord.transactionHistory
                  .slice(-10)
                  .reverse()
                  .map((transaction) => (
                    <div key={transaction.id} className="flex justify-between items-center p-2 border rounded">
                      <div>
                        <div className="font-medium">{transaction.description}</div>
                        <div className="text-sm text-muted-foreground">
                          Age {transaction.year} • {transaction.category}
                        </div>
                      </div>
                      <div className={`font-bold ${transaction.type === 'Income' ? 'text-green-600' : 'text-red-600'}`}>
                        {transaction.type === 'Income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                      </div>
                    </div>
                  ))}
                {financialRecord.transactionHistory.length === 0 && (
                  <div className="text-center text-muted-foreground py-8">
                    No transactions yet
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="investments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Make Investment</CardTitle>
              <CardDescription>Grow your wealth through investments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Investment Type</label>
                  <Select value={selectedInvestmentType} onValueChange={setSelectedInvestmentType as any}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Stocks">Stocks (8-20% return)</SelectItem>
                      <SelectItem value="Bonds">Bonds (3-7% return)</SelectItem>
                      <SelectItem value="Real Estate">Real Estate (5-13% return)</SelectItem>
                      <SelectItem value="Crypto">Cryptocurrency (15-40% return)</SelectItem>
                      <SelectItem value="Savings Account">Savings Account (1-3% return)</SelectItem>
                      <SelectItem value="CD">Certificate of Deposit (2-5% return)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Amount</label>
                  <Input 
                    type="number" 
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(e.target.value)}
                    placeholder="Enter amount"
                  />
                </div>
              </div>
              <Button onClick={handleInvestment} className="w-full">
                <PiggyBank className="h-4 w-4 mr-2" />
                Invest {investmentAmount && formatCurrency(parseFloat(investmentAmount) || 0)}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Current Investments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {financialRecord.investments.map((investment) => (
                  <div key={investment.id} className="flex justify-between items-center p-2 border rounded">
                    <div>
                      <div className="font-medium">{investment.type}</div>
                      <div className="text-sm text-muted-foreground">
                        Purchased at age {investment.yearPurchased}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{formatCurrency(investment.currentValue)}</div>
                      <div className="text-sm text-green-600">
                        {(investment.annualReturn * 100).toFixed(1)}% return
                      </div>
                    </div>
                  </div>
                ))}
                {financialRecord.investments.length === 0 && (
                  <div className="text-center text-muted-foreground py-8">
                    No investments yet
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="loans" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Apply for Loan</CardTitle>
              <CardDescription>Get funds for major purchases</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Loan Type</label>
                  <Select value={loanType} onValueChange={setLoanType as any}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Personal">Personal Loan</SelectItem>
                      <SelectItem value="Mortgage">Mortgage</SelectItem>
                      <SelectItem value="Car">Car Loan</SelectItem>
                      <SelectItem value="Student">Student Loan</SelectItem>
                      <SelectItem value="Business">Business Loan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Amount</label>
                  <Input 
                    type="number" 
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                    placeholder="Enter amount"
                  />
                </div>
              </div>
              <Button onClick={handleLoanApplication} className="w-full">
                <CreditCard className="h-4 w-4 mr-2" />
                Apply for {loanAmount && formatCurrency(parseFloat(loanAmount) || 0)} Loan
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Current Loans</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {financialRecord.currentLoans.map((loan) => (
                  <div key={loan.id} className="p-2 border rounded">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">{loan.type} Loan</div>
                        <div className="text-sm text-muted-foreground">
                          {loan.lender} • {(loan.interestRate * 100).toFixed(1)}% APR
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{formatCurrency(loan.amount)}</div>
                        <div className="text-sm text-muted-foreground">
                          {formatCurrency(loan.monthlyPayment)}/month
                        </div>
                      </div>
                    </div>
                    <Progress 
                      value={((loan.originalAmount - loan.amount) / loan.originalAmount) * 100} 
                      className="mt-2"
                    />
                    <div className="text-xs text-muted-foreground mt-1">
                      {loan.remainingMonths} months remaining
                    </div>
                  </div>
                ))}
                {financialRecord.currentLoans.length === 0 && (
                  <div className="text-center text-muted-foreground py-8">
                    No active loans
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expenses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Expenses</CardTitle>
              <CardDescription>Your recurring expenses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {recurringExpenses.map((expense) => (
                  <div key={expense.id} className="flex justify-between items-center p-2 border rounded">
                    <div>
                      <div className="font-medium">{expense.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {expense.category} • {expense.frequency}
                      </div>
                    </div>
                    <div className="font-bold text-red-600">
                      -{formatCurrency(expense.amount)}
                    </div>
                  </div>
                ))}
                {recurringExpenses.length === 0 && (
                  <div className="text-center text-muted-foreground py-8">
                    No recurring expenses
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
