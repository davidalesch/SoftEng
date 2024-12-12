import React, { useState } from 'react';
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/ui/dropdown-menu";
import { useNavigate } from 'react-router-dom';
import { useToast } from "../components/ui/hooks/use-toast";
import { MoreHorizontal, Download } from 'lucide-react';

// Sample transaction data
const generateSampleTransactions = () => {
    const transactions = [
        { id: 1, date: '2024-03-15', description: 'Grocery Shopping at Whole Foods', amount: -87.45, type: 'Expense' },
        { id: 2, date: '2024-03-14', description: 'Salary Deposit', amount: 5200.00, type: 'Income' },
        { id: 3, date: '2024-03-13', description: 'Monthly Rent Payment', amount: -2000.00, type: 'Expense' },
        { id: 4, date: '2024-03-12', description: 'Online Course Payment', amount: -99.99, type: 'Expense' },
        { id: 5, date: '2024-03-11', description: 'Freelance Work Payment', amount: 1500.00, type: 'Income' },
        { id: 6, date: '2024-03-10', description: 'Dinner at Restaurant', amount: -65.30, type: 'Expense' },
        { id: 7, date: '2024-03-09', description: 'Utility Bill Payment', amount: -150.75, type: 'Expense' },
        { id: 8, date: '2024-03-08', description: 'Investment Dividend', amount: 275.50, type: 'Income' },
        { id: 9, date: '2024-03-07', description: 'Amazon Purchase', amount: -45.67, type: 'Expense' },
        { id: 10, date: '2024-03-06', description: 'Consulting Service', amount: 750.00, type: 'Income' },
        { id: 11, date: '2024-03-05', description: 'Gym Membership', amount: -59.99, type: 'Expense' },
        { id: 12, date: '2024-03-04', description: 'Streaming Service', amount: -14.99, type: 'Expense' },
        { id: 13, date: '2024-03-03', description: 'Bonus Payment', amount: 1000.00, type: 'Income' },
        { id: 14, date: '2024-03-02', description: 'Grocery Delivery', amount: -62.35, type: 'Expense' },
        { id: 15, date: '2024-03-01', description: 'Refund from Returns', amount: 89.99, type: 'Income' }
    ];
    return transactions;
};

const TransactionsPage = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [transactions] = useState(generateSampleTransactions());

    const handleExportTransaction = (transaction) => {
        toast({
            title: "Transaction Exported",
            description: `Exported transaction: ${transaction.description}`,
        });
    };

    const handleAboutUs = () => {
        navigate('/about');
    };

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Transactions Content */}
            <div className="container mx-auto px-4 py-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">Your Transactions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="divide-y divide-gray-200">
                            {transactions.map((transaction) => (
                                <div 
                                    key={transaction.id} 
                                    className="flex items-center justify-between py-4 hover:bg-gray-100 transition-colors"
                                >
                                    <div className="flex-1">
                                        <div className="flex items-center">
                                            <div className="mr-4">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
                                                            <MoreHorizontal className="h-5 w-5" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem 
                                                            onClick={() => handleExportTransaction(transaction)}
                                                            className="cursor-pointer"
                                                        >
                                                            <Download className="mr-2 h-4 w-4" />
                                                            Export
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">{transaction.description}</p>
                                                <p className="text-sm text-gray-500">{transaction.date}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`font-semibold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        ${Math.abs(transaction.amount).toFixed(2)}
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

export default TransactionsPage;