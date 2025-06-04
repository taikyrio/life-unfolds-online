
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
  AlertTriangle,
  Plus
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
  const [showInvestmentDialog, setShowInvestmentDialog] = useState(false);
  const [showLoanDialog, setShowLoanDialog] = useState(false);

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
    setShowInvestmentDialog(false);
  };

  const handleLoanApplication = () => {
    const amount = parseFloat(loanAmount);
    if (isNaN(amount) || amount <= 0) {
      onEvent('Please enter a valid loan amount');
      return;
    }

    const maxLoanAmount = (character.salary || 0) * 1000 * 3;
    if (amount > maxLoanAmount) {
      onEvent(`Loan denied. Maximum eligible amount: ${formatCurrency(maxLoanAmount)}`);
      return;
    }

    const interestRate = 0.05 + Math.random() * 0.10;
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
    setShowLoanDialog(false);
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

  const quickActions = [
    { label: 'Work', amount: 500, desc: 'Part-time job earnings', cat: 'Other', icon: DollarSign, color: 'bg-green-500' },
    { label: 'Food', amount: -100, desc: 'Grocery shopping', cat: 'Food', icon: TrendingDown, color: 'bg-red-500' },
    { label: 'Fun', amount: -50, desc: 'Entertainment', cat: 'Other', icon: TrendingDown, color: 'bg-orange-500' },
    { label: 'Gift', amount: 1000, desc: 'Gift from family', cat: 'Gift', icon: TrendingUp, color: 'bg-blue-500' }
  ];

  return (
    <div className="space-y-3 p-3 pb-20 max-h-screen overflow-y-auto">
      {/* Mobile-Optimized Financial Overview */}
      <Card className="bg-white/60 dark:bg-slate-900/60 backdrop-blur border-white/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Financial Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg text-center">
              <div className="text-lg font-bold text-green-600">
                {formatCurrency(balance)}
              </div>
              <div className="text-xs text-muted-foreground">Bank Balance</div>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-center">
              <div className="text-lg font-bold text-blue-600">
                {formatCurrency(financialSummary.netWorth)}
              </div>
              <div className="text-xs text-muted-foreground">Net Worth</div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-lg text-center">
              <div className="text-sm font-bold text-emerald-600">
                {formatCurrency(financialSummary.monthlyIncome)}
              </div>
              <div className="text-xs text-muted-foreground">Monthly Income</div>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg text-center">
              <div className="text-sm font-bold text-red-600">
                {formatCurrency(financialSummary.monthlyExpenses)}
              </div>
              <div className="text-xs text-muted-foreground">Monthly Expenses</div>
            </div>
          </div>

          {financialSummary.debtToIncomeRatio > 0.4 && (
            <Alert className="bg-yellow-50 border-yellow-200">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-800 text-sm">
                High debt ratio: {(financialSummary.debtToIncomeRatio * 100).toFixed(1)}%
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions Grid */}
      <Card className="bg-white/60 dark:bg-slate-900/60 backdrop-blur border-white/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Button
                  key={index}
                  onClick={() => handleQuickTransaction(action.amount, action.desc, action.cat)}
                  className={`${action.color} hover:opacity-90 text-white flex items-center gap-2 h-12 text-sm`}
                >
                  <Icon className="h-4 w-4" />
                  <div className="flex flex-col items-start leading-tight">
                    <span className="font-medium">{action.label}</span>
                    <span className="text-xs opacity-90">
                      {action.amount > 0 ? '+' : ''}{formatCurrency(Math.abs(action.amount))}
                    </span>
                  </div>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Investment & Loan Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Dialog open={showInvestmentDialog} onOpenChange={setShowInvestmentDialog}>
          <DialogTrigger asChild>
            <Card className="cursor-pointer hover:bg-white/80 transition-colors bg-white/60 dark:bg-slate-900/60 backdrop-blur border-white/20">
              <CardContent className="p-4 text-center">
                <PiggyBank className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <div className="font-medium text-sm">Invest</div>
                <div className="text-xs text-muted-foreground">Grow money</div>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent className="w-[90vw] max-w-md">
            <DialogHeader>
              <DialogTitle>Make Investment</DialogTitle>
              <DialogDescription>Choose investment type and amount</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Select value={selectedInvestmentType} onValueChange={setSelectedInvestmentType as any}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Stocks">Stocks (8-20%)</SelectItem>
                  <SelectItem value="Bonds">Bonds (3-7%)</SelectItem>
                  <SelectItem value="Real Estate">Real Estate (5-13%)</SelectItem>
                  <SelectItem value="Crypto">Crypto (15-40%)</SelectItem>
                  <SelectItem value="Savings Account">Savings (1-3%)</SelectItem>
                  <SelectItem value="CD">CD (2-5%)</SelectItem>
                </SelectContent>
              </Select>
              <Input 
                type="number" 
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(e.target.value)}
                placeholder="Amount to invest"
              />
              <Button onClick={handleInvestment} className="w-full">
                Invest {investmentAmount && formatCurrency(parseFloat(investmentAmount) || 0)}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showLoanDialog} onOpenChange={setShowLoanDialog}>
          <DialogTrigger asChild>
            <Card className="cursor-pointer hover:bg-white/80 transition-colors bg-white/60 dark:bg-slate-900/60 backdrop-blur border-white/20">
              <CardContent className="p-4 text-center">
                <CreditCard className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <div className="font-medium text-sm">Get Loan</div>
                <div className="text-xs text-muted-foreground">Borrow money</div>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent className="w-[90vw] max-w-md">
            <DialogHeader>
              <DialogTitle>Apply for Loan</DialogTitle>
              <DialogDescription>Choose loan type and amount</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
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
              <Input 
                type="number" 
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                placeholder="Loan amount"
              />
              <Button onClick={handleLoanApplication} className="w-full">
                Apply for {loanAmount && formatCurrency(parseFloat(loanAmount) || 0)}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Current Investments & Loans */}
      <Tabs defaultValue="investments" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="investments" className="text-xs">Investments</TabsTrigger>
          <TabsTrigger value="loans" className="text-xs">Loans</TabsTrigger>
          <TabsTrigger value="history" className="text-xs">History</TabsTrigger>
        </TabsList>

        <TabsContent value="investments" className="space-y-3 mt-3">
          <Card className="bg-white/60 dark:bg-slate-900/60 backdrop-blur border-white/20">
            <CardContent className="p-3">
              <div className="space-y-2">
                {financialRecord.investments.map((investment) => (
                  <div key={investment.id} className="flex justify-between items-center p-2 bg-white/40 dark:bg-slate-800/40 rounded-lg">
                    <div>
                      <div className="font-medium text-sm capitalize">{investment.type}</div>
                      <div className="text-xs text-muted-foreground">
                        Age {investment.yearPurchased}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-sm">{formatCurrency(investment.currentValue)}</div>
                      <div className="text-xs text-green-600">
                        {(investment.annualReturn * 100).toFixed(1)}% APY
                      </div>
                    </div>
                  </div>
                ))}
                {financialRecord.investments.length === 0 && (
                  <div className="text-center text-muted-foreground py-6 text-sm">
                    No investments yet
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="loans" className="space-y-3 mt-3">
          <Card className="bg-white/60 dark:bg-slate-900/60 backdrop-blur border-white/20">
            <CardContent className="p-3">
              <div className="space-y-2">
                {financialRecord.currentLoans.map((loan) => (
                  <div key={loan.id} className="p-2 bg-white/40 dark:bg-slate-800/40 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <div className="font-medium text-sm capitalize">{loan.type} Loan</div>
                        <div className="text-xs text-muted-foreground">
                          {(loan.interestRate * 100).toFixed(1)}% APR
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-sm">{formatCurrency(loan.amount)}</div>
                        <div className="text-xs text-muted-foreground">
                          {formatCurrency(loan.monthlyPayment)}/mo
                        </div>
                      </div>
                    </div>
                    <Progress 
                      value={((loan.originalAmount - loan.amount) / loan.originalAmount) * 100} 
                      className="h-2"
                    />
                    <div className="text-xs text-muted-foreground mt-1">
                      {loan.remainingMonths} months left
                    </div>
                  </div>
                ))}
                {financialRecord.currentLoans.length === 0 && (
                  <div className="text-center text-muted-foreground py-6 text-sm">
                    No active loans
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-3 mt-3">
          <Card className="bg-white/60 dark:bg-slate-900/60 backdrop-blur border-white/20">
            <CardContent className="p-3">
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {financialRecord.transactionHistory
                  .slice(-10)
                  .reverse()
                  .map((transaction) => (
                    <div key={transaction.id} className="flex justify-between items-center p-2 bg-white/40 dark:bg-slate-800/40 rounded-lg">
                      <div>
                        <div className="font-medium text-sm">{transaction.description}</div>
                        <div className="text-xs text-muted-foreground">
                          Age {transaction.year}
                        </div>
                      </div>
                      <div className={`font-bold text-sm ${transaction.type === 'Income' ? 'text-green-600' : 'text-red-600'}`}>
                        {transaction.type === 'Income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                      </div>
                    </div>
                  ))}
                {financialRecord.transactionHistory.length === 0 && (
                  <div className="text-center text-muted-foreground py-6 text-sm">
                    No transactions yet
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
