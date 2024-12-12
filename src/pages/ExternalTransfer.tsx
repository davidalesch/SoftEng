import React, { useState } from 'react';
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from '../components/ui/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const ExternalTransfer = () => {
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [transferAmount, setTransferAmount] = useState<number>(0);
    const [bankDetails, setBankDetails] = useState({ accountNumber: '', routingNumber: '' });
    const [cryptoDetails, setCryptoDetails] = useState({ walletAddress: '' });
    const [selectedCurrency, setSelectedCurrency] = useState<string>('');
    const [exchangeRate, setExchangeRate] = useState<number | null>(null);

    const currentBalance = 1000; // Mock balance, replace with actual balance from your state management

    const handleOptionSelection = (option: string) => {
        setSelectedOption(selectedOption === option ? null : option);
        setTransferAmount(0); // Reset amount when changing options
    };

    const handleCurrencyChange = (currency: string) => {
        setSelectedCurrency(currency);
        const mockExchangeRates: { [key: string]: number } = {
            USD: 1.0,
            EUR: 0.85,
            GBP: 0.75,
            ETH: 2000,
            XRP: 1.2,
        };
        setExchangeRate(mockExchangeRates[currency] || null);
    };

    const handleBankTransfer = () => {
        if (!bankDetails.accountNumber || !bankDetails.routingNumber || transferAmount <= 0) {
            toast({
                title: "Error",
                description: "Please fill in all fields and enter a valid transfer amount.",
                variant: "destructive"
            });
            return;
        }

        if (transferAmount > currentBalance) {
            toast({
                title: "Insufficient Balance",
                description: "You do not have enough balance for this transfer.",
                variant: "destructive"
            });
            return;
        }

        toast({
            title: "Transfer Initiated",
            description: "Your transfer to the bank account has been initiated successfully.",
            variant: "default"
        });

        navigate('/dashboard');
    };

    const handleTransfer = () => {
        toast({
            title: "Transfer Initiated",
            description: "Your transfer has been initiated successfully, you will receive a confirmation shortly.",
            variant: "default"
        });
        navigate('/dashboard');
    };

    const renderOptionContent = (option: string) => {
        switch (option) {
            case 'bank':
                return (
                    <div className="space-y-4">
                        <select
                            className="w-full p-3 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                            value={selectedCurrency}
                            onChange={(e) => handleCurrencyChange(e.target.value)}
                        >
                            <option value="" disabled>Select Currency</option>
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="GBP">GBP</option>
                        </select>
                        {exchangeRate !== null && (
                            <p className="text-sm text-gray-600">Exchange Rate: {exchangeRate}</p>
                        )}
                        <Input
                            type="text"
                            placeholder="Account Number"
                            className="w-full"
                            value={bankDetails.accountNumber}
                            onChange={(e) => setBankDetails({ ...bankDetails, accountNumber: e.target.value })}
                        />
                        <Input
                            type="text"
                            placeholder="Routing Number"
                            className="w-full"
                            value={bankDetails.routingNumber}
                            onChange={(e) => setBankDetails({ ...bankDetails, routingNumber: e.target.value })}
                        />
                        <Input
                            type="number"
                            placeholder="Enter amount"
                            className="w-full"
                            value={transferAmount || ''}
                            onChange={(e) => setTransferAmount(Number(e.target.value))}
                            min="0"
                            max={currentBalance}
                        />
                        <Button className="w-full h-12 rounded-lg" onClick={handleBankTransfer}>Transfer</Button>
                    </div>
                );
            case 'crypto':
                return (
                    <div className="space-y-4">
                        <select
                            className="w-full p-3 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                            value={selectedCurrency}
                            onChange={(e) => handleCurrencyChange(e.target.value)}
                        >
                            <option value="" disabled>Select Currency</option>
                            <option value="ETH">ETH</option>
                            <option value="XRP">XRP</option>
                        </select>
                        {exchangeRate !== null && (
                            <p className="text-sm text-gray-600">Exchange Rate: {exchangeRate}</p>
                        )}
                        <Input
                            type="text"
                            placeholder="Wallet Address"
                            className="w-full"
                            value={cryptoDetails.walletAddress}
                            onChange={(e) => setCryptoDetails({ ...cryptoDetails, walletAddress: e.target.value })}
                        />
                        <Input
                            type="number"
                            placeholder="Enter amount"
                            className="w-full"
                            value={transferAmount || ''}
                            onChange={(e) => setTransferAmount(Number(e.target.value))}
                            min="0"
                            max={currentBalance}
                        />
                        <Button className="w-full h-12 rounded-lg" onClick={handleTransfer}>Transfer</Button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="p-4 bg-gray-50 min-h-screen flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4 text-center sm:text-3xl">
                Choose transfer options
            </h2>

            {/* Balance Card */}
            <Card className="w-full max-w-lg mb-4 sm:max-w-4xl">
                <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                        <div>
                            <p className="text-sm text-gray-600">Current Balance</p>
                            <p className="text-xl sm:text-2xl font-bold">${currentBalance.toFixed(2)}</p>
                        </div>
                        {transferAmount > 0 && (
                            <div>
                                <p className="text-sm text-gray-600">Balance After Transfer</p>
                                <p className="text-xl sm:text-2xl font-bold text-gray-500">
                                    ${(currentBalance - transferAmount).toFixed(2)}
                                </p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Transfer Options */}
            <Card className="w-full max-w-lg sm:max-w-4xl">
                <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-row space-x-2 w-full">
                        {['bank', 'crypto'].map((option) => (
                            <Button
                                key={option}
                                className={`flex-1 h-12 rounded-lg ${selectedOption === option ? 'bg-primary text-white' : 'bg-gray-100 text-black hover:text-white'}`}
                                onClick={() => handleOptionSelection(option)}
                            >
                                {option === 'bank' && 'To Bank Account'}
                                {option === 'crypto' && 'To Crypto Wallet'}
                            </Button>
                        ))}
                    </div>

                    <AnimatePresence>
                        {selectedOption && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                style={{ overflow: 'hidden' }}
                            >
                                <Card className="mt-4">
                                    <CardContent className="p-4 sm:p-6">
                                        {renderOptionContent(selectedOption)}
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </CardContent>
            </Card>
        </div>
    );
};

export default ExternalTransfer;
