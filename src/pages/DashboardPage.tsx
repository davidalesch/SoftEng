import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const navigate = useNavigate();

  // Mock account and transaction data
  const [accountBalance, setAccountBalance] = useState({
    total: 18187.78
  });

  const [transactions, setTransactions] = useState([
    { 
      id: 1, 
      date: '2024-03-15', 
      description: 'Salary Deposit', 
      amount: 4500.00, 
      type: 'credit',
    },
    { 
      id: 2, 
      date: '2024-03-14', 
      description: 'Amazon Purchase', 
      amount: -129.99, 
      type: 'debit',
    },
    { 
      id: 3, 
      date: '2024-03-12', 
      description: 'Funds deposited', 
      amount: 1000.00, 
      type: 'transfer',
    },
    { 
      id: 4, 
      date: '2024-03-10', 
      description: 'Utility Bill Payment', 
      amount: -250.50, 
      type: 'debit',
    },
    { 
      id: 5, 
      date: '2024-03-08', 
      description: 'Interest Credit', 
      amount: 45.22, 
      type: 'credit',
    }
  ]);

  const renderTransactionAmount = (amount, type) => {
    const amountClass = type === 'credit' 
      ? 'text-green-600' 
      : type === 'debit' 
      ? 'text-red-600' 
      : 'text-blue-600';
    
    return (
      <span className={`font-semibold ${amountClass}`}>
        {amount >= 0 ? '+' : '-'} ${Math.abs(amount).toFixed(2)}
      </span>
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Account Overview</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-3 gap-4">
            <div className="col-span-3 bg-white border rounded-lg p-4 flex justify-between items-center">
              <div>
              <h3 className="text-gray-600 mb-2">Total Balance</h3>
              <p className="text-2xl font-bold text-blue-600">
                ${accountBalance.total.toLocaleString()}
              </p>
              </div>
                <div className="flex flex-col space-y-2 text-right">
                  <h3 className="text-gray-400">12 mo passive interest rate gain:</h3>
                  <span className="text-green-600 text-lg">+$1,234.56 (6.8%)</span>
                </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex space-x-4">
          <Button 
            className="w-full" 
            onClick={() => navigate('/transfer-funds')}
          >
            Transfer Funds
          </Button>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => navigate('/account-top-up')}
          >
            Input funds
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl">Recent Transactions</CardTitle>
                <Button variant="outline" onClick={() => navigate('/transaction-history')}>View All</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="divide-y">
              {transactions.map((transaction) => (
                <div 
                  key={transaction.id} 
                  className="flex justify-between items-center py-4"
                >
                  <div>
                    <p className="font-medium text-gray-900">
                      {transaction.description}
                    </p>
                    <p className="text-sm text-gray-600">
                      {transaction.date}
                    </p>
                  </div>
                  <div>
                    {renderTransactionAmount(transaction.amount, transaction.type)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;