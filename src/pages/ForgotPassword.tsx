import React, { useState } from 'react';
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useNavigate } from 'react-router-dom';
import { useToast } from "../components/ui/hooks/use-toast";
import { Lock } from 'lucide-react';

const ForgotPasswordPage = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [email, setEmail] = useState('');
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [resetCode, setResetCode] = useState('');

    // Email validation regex
    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSendResetCode = () => {
        // Validate email format
        if (!email || !validateEmail(email)) {
            toast({
                title: "Reset Error",
                description: "Please enter a valid email address",
                variant: "destructive"
            });
            return;
        }

        // Simulate sending reset code
        toast({
            title: "Temporary password Sent",
            description: "A temporary password has been sent to your email",
        });
        setIsCodeSent(true);
    };

    const handleResetPassword = () => {
        // Validate reset code
        toast({
            title: "Login successful",
            description: "Please remember to change your password within 24 hours",
            variant: "default"
        });
        navigate('/dashboard');
    };    

    const handleBackToLogin = () => {
        navigate('/login');
    };

    const handleAboutUs = () => {
        navigate('/about');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="flex justify-between items-center p-4 bg-white shadow-sm">
                <div className="animate-fade-in-down hover:scale-110 transition-transform duration-300 font-bold text-4xl">PeerPay</div>
                <Button
                    variant="outline"
                    onClick={handleAboutUs}
                >
                    About Us
                </Button>
            </header>

            {/* Forgot Password Content */}
            <div className="flex items-center justify-center px-4 py-12">
                <Card className="w-full max-w-md">
                    <CardHeader className="text-center">
                        <h2 className="text-3xl font-bold text-gray-900">Reset Password</h2>
                        <p className="text-gray-600 mt-2">
                            {!isCodeSent 
                                ? "Enter your email to receive a new temporary password" 
                                : "Enter the temporary password sent to your email"}
                        </p>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {!isCodeSent ? (
                            <>
                                <div className="space-y-2">
                                    <Label>Email Address</Label>
                                    <Input
                                        type="email"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <Button
                                    onClick={handleSendResetCode}
                                    className="w-full"
                                >
                                    Send Temporary Password
                                </Button>
                            </>
                        ) : (
                            <>
                                <div className="space-y-2">
                                    <Label>Temporary</Label>
                                    <Input
                                        type="text"
                                        placeholder="Enter temporary password"
                                        value={resetCode}
                                        maxLength={6}
                                        onChange={(e) => setResetCode(e.target.value)}
                                    />
                                </div>
                                <Button
                                    onClick={handleResetPassword}
                                    className="w-full"
                                >
                                    Login with Temporary Password (change within 24 hours)
                                </Button>
                            </>
                        )}
                        
                        <div className="text-center text-sm text-gray-600">
                            <Button
                                variant="link"
                                className="p-0 text-sm hover:underline"
                                onClick={handleBackToLogin}
                            >
                                Back to Login
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;