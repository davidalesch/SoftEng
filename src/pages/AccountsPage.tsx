import React, { useState } from 'react';
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuTrigger 
} from "../components/ui/dropdown-menu";
import { Toaster } from "../components/ui/toaster";
import { useToast } from "../components/ui/hooks/use-toast";
import { useNavigate } from 'react-router-dom';
import { Fingerprint, Link, ChevronDown } from 'lucide-react';

const AccountTopUp = () => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [topUpAmount, setTopUpAmount] = useState<number>(0);
    const [showFingerprintModal, setShowFingerprintModal] = useState(false);
    const [fingerprintScanProgress, setFingerprintScanProgress] = useState(0);
    const [selectedBank, setSelectedBank] = useState<string | null>(null);
    const [selectedCard, setSelectedCard] = useState<string | null>(null);
    const [showBankConfirmationModal, setShowBankConfirmationModal] = useState(false);
    const [bankName, setBankName] = useState<string>('');
    const [accountNumber, setAccountNumber] = useState<string>('');
    const [routingNumber, setRoutingNumber] = useState<string>('');
    const { toast } = useToast();
    const navigate = useNavigate();

    // Mock balance - replace with actual balance from your state management system
    const currentBalance = 1000;

    // Mock bank and card lists
    const bankList = ['Chase Bank', 'Bank of America', 'Wells Fargo', 'Citibank'];
    const cardList = ['Visa Ending in 4532', 'Mastercard Ending in 7890', 'American Express'];

    const handleOptionSelection = (option: string) => {
        setSelectedOption(selectedOption === option ? null : option);
        setTopUpAmount(0); // Reset amount when changing options
    };

    const startFingerprintAuthentication = (onSuccess?: () => void) => {
        setShowFingerprintModal(true);
        
        const interval = setInterval(() => {
            setFingerprintScanProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        setShowFingerprintModal(false);
                        if (onSuccess) onSuccess();
                        navigate('/dashboard');
                    }, 500);
                    return 100;
                }
                return prev + 10;
            });
        }, 200);
    };

    const handleRequestTopUp = () => {
        startFingerprintAuthentication(() => {
            toast({
                title: "Top-Up Request Submitted",
                description: "Your top-up request is being processed.",
                variant: "default"
            });
        });
    };

    const handleConnectBank = () => {
            setShowBankConfirmationModal(true);
            toast({
              title: "Bank Connection Request Submitted",
              description: "Your bank connection request is being processed.",
              variant: "default"
          });
    };

    const renderOptionContent = (option: string) => {
        switch (option) {
            case 'bank':
                return (
                    <div className="space-y-4">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button 
                                    variant="outline" 
                                    className="w-full justify-between"
                                >
                                    {selectedBank || 'Select Bank Account'}
                                    <ChevronDown className="ml-2 h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-[calc(100%-2px)]">
                                {bankList.map((bank) => (
                                    <DropdownMenuItem 
                                        key={bank} 
                                        onSelect={() => setSelectedBank(bank)}
                                    >
                                        {bank}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Input
                            type="number"
                            placeholder="Enter top-up amount"
                            className="w-full"
                            value={topUpAmount || ''}
                            onChange={(e) => setTopUpAmount(Number(e.target.value))}
                            min="0"
                            max={5000}
                        />
                        <Button 
                            className="w-full"
                            onClick={handleRequestTopUp}
                            disabled={!selectedBank || topUpAmount <= 0}
                        >
                            Request Top-Up
                        </Button>
                    </div>
                );
            case 'card':
                return (
                    <div className="space-y-4">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button 
                                    variant="outline" 
                                    className="w-full justify-between"
                                >
                                    {selectedCard || 'Select Credit/Debit Card'}
                                    <ChevronDown className="ml-2 h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-[calc(100%-2px)]">
                                {cardList.map((card) => (
                                    <DropdownMenuItem 
                                        key={card} 
                                        onSelect={() => setSelectedCard(card)}
                                    >
                                        {card}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Input
                            type="number"
                            placeholder="Enter top-up amount"
                            className="w-full"
                            value={topUpAmount || ''}
                            onChange={(e) => setTopUpAmount(Number(e.target.value))}
                            min="0"
                            max={5000}
                        />
                        <Button 
                            className="w-full"
                            onClick={handleRequestTopUp}
                            disabled={!selectedCard || topUpAmount <= 0}
                        >
                            Request Top-Up
                        </Button>
                    </div>
                );
            case 'connectBank':
                return (
                    <div className="space-y-4">
                        <Input
                            type="text"
                            placeholder="Bank Name"
                            className="w-full"
                            value={bankName}
                            onChange={(e) => setBankName(e.target.value)}
                        />
                        <Input
                            type="text"
                            placeholder="Account Number"
                            className="w-full"
                            value={accountNumber}
                            onChange={(e) => setAccountNumber(e.target.value)}
                        />
                        <Input
                            type="text"
                            placeholder="Routing Number"
                            className="w-full"
                            value={routingNumber}
                            onChange={(e) => setRoutingNumber(e.target.value)}
                        />
                        <Button 
                            className="w-full"
                            onClick={handleConnectBank}
                            disabled={!bankName || !accountNumber || !routingNumber}
                        >
                            <Link className="mr-2 h-4 w-4" />
                            Connect Bank Account
                        </Button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="p-6 bg-gray-50 h-screen flex flex-col items-center">
            <h2 className="text-3xl font-bold mb-8 text-center">
                Top Up Account
            </h2>

            <Card className="w-full max-w-4xl mb-4">
                <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm text-gray-600">Current Balance</p>
                            <p className="text-2xl font-bold">${currentBalance.toFixed(2)}</p>
                        </div>
                        {topUpAmount > 0 && (
                            <div>
                                <p className="text-sm text-gray-600">Balance After Top-Up</p>
                                <p className="text-2xl font-bold text-gray-500">
                                    ${(currentBalance + topUpAmount).toFixed(2)}
                                </p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            <Card className="w-full max-w-4xl">
                <CardContent className="p-6">
                    <div className="flex space-x-4 w-full mb-6">
                        {['bank', 'card'].map((option) => (
                            <Button
                                key={option}
                                className={`flex-1 ${selectedOption === option ? 'bg-primary text-white' : 'bg-gray-100 text-black hover:text-white'}`}
                                onClick={() => handleOptionSelection(option)}
                            >
                                {option === 'bank' && 'Bank Transfer'}
                                {option === 'card' && 'Credit/Debit Card'}
                            </Button>
                        ))}
                    </div>

                    <AnimatePresence>
                        {selectedOption && selectedOption !== 'connectBank' && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                style={{ overflow: 'hidden' }}
                            >
                                <Card className="mt-4">
                                    <CardContent className="p-6">
                                        {renderOptionContent(selectedOption)}
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <Button
                        key="connectBank"
                        className={`w-full mt-4 ${selectedOption === 'connectBank' ? 'bg-primary text-white' : 'bg-gray-100 text-black hover:text-white'}`}
                        onClick={() => handleOptionSelection('connectBank')}
                    >
                        Connect New Bank
                    </Button>

                    <AnimatePresence>
                        {selectedOption === 'connectBank' && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                style={{ overflow: 'hidden' }}
                            >
                                <Card className="mt-4">
                                    <CardContent className="p-6">
                                        {renderOptionContent(selectedOption)}
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </CardContent>
            </Card>

            <Dialog open={showFingerprintModal} onOpenChange={setShowFingerprintModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-center">Fingerprint Authentication</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col items-center space-y-4 py-6">
                        <Fingerprint size={100} className="text-primary" />
                        <p className="text-center text-gray-600">
                            Please place your finger on the sensor
                        </p>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                                className="bg-primary h-2.5 rounded-full" 
                                style={{ width: `${fingerprintScanProgress}%` }}
                            ></div>
                        </div>
                        <p className="text-center text-sm text-gray-500">
                            {fingerprintScanProgress === 100 
                                ? 'Authentication Successful!' 
                                : 'Scanning fingerprint...'}
                        </p>
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog open={showBankConfirmationModal} onOpenChange={setShowBankConfirmationModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-center">Bank Connection Request</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col items-center space-y-4 py-6">
                        <p className="text-center text-gray-600">
                            Request sent. Waiting for bank confirmation.
                        </p>
                        <p className="text-center text-sm text-gray-500">
                            This may take a few business days.
                        </p>
                        <Button onClick={() => setShowBankConfirmationModal(false)}>
                            Close
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            <Toaster />
        </div>
    );
};

export default AccountTopUp;