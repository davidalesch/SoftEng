import React, { useState } from 'react';
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { useNavigate } from 'react-router-dom';
import { Fingerprint } from 'lucide-react';

const LocalTransfer = () => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [transferAmount, setTransferAmount] = useState<number>(0);
    const [showFingerprintModal, setShowFingerprintModal] = useState(false);
    const [fingerprintScanProgress, setFingerprintScanProgress] = useState(0);
    const navigate = useNavigate();

    // Mock balance - replace with actual balance from your state management system
    const currentBalance = 1000;

    const handleOptionSelection = (option: string) => {
        setSelectedOption(selectedOption === option ? null : option);
        setTransferAmount(0); // Reset amount when changing options
    };

    const startFingerprintAuthentication = () => {
        setShowFingerprintModal(true);
        
        // Simulate fingerprint scanning progress
        const interval = setInterval(() => {
            setFingerprintScanProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    // Redirect to dashboard after successful authentication
                    setTimeout(() => {
                        setShowFingerprintModal(false);
                        navigate('/dashboard');
                    }, 500);
                    return 100;
                }
                return prev + 10;
            });
        }, 200);
    };

    const renderOptionContent = (option: string) => {
        switch (option) {
            case 'bluetooth':
                return (
                    <div className="space-y-4">
                        <p className="text-sm text-gray-600">
                            Searching for nearby devices...
                        </p>
                        <div className="animate-pulse">
                            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        </div>
                    </div>
                );
            case 'email':
                return (
                    <div className="space-y-4">
                        <Input
                            type="text"
                            placeholder="Enter email"
                            className="w-full"
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
                        <Button 
                            className="w-full"
                            onClick={startFingerprintAuthentication}
                        >
                            Send Money
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
                Choose a transfer option
            </h2>

            {/* Balance Card */}
            <Card className="w-full max-w-4xl mb-4">
                <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm text-gray-600">Current Balance</p>
                            <p className="text-2xl font-bold">${currentBalance.toFixed(2)}</p>
                        </div>
                        {transferAmount > 0 && (
                            <div>
                                <p className="text-sm text-gray-600">Balance After Transfer</p>
                                <p className="text-2xl font-bold text-gray-500">
                                    ${(currentBalance - transferAmount).toFixed(2)}
                                </p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
            <Card className="w-full max-w-4xl">
                <CardContent className="p-6">
                    <div className="flex space-x-4 w-full mb-6">
                        {['bluetooth', 'email'].map((option) => (
                            <Button
                                key={option}
                                className={`flex-1 ${selectedOption === option ? 'bg-primary text-white' : 'bg-gray-100 text-black hover:text-white'}`}
                                onClick={() => handleOptionSelection(option)}
                            >
                                {option === 'bluetooth' && 'Bluetooth'}
                                {option === 'email' && 'Via email'}
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
                                    <CardContent className="p-6">
                                        {renderOptionContent(selectedOption)}
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </CardContent>
            </Card>

            {/* Fingerprint Authentication Modal */}
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
        </div>
    );
};

export default LocalTransfer;