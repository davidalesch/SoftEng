import React, { useState } from 'react';
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Dialog, DialogContent } from "../components/ui/dialog";
import { useNavigate } from 'react-router-dom';
import { useToast } from "../components/ui/hooks/use-toast";
import { Fingerprint } from 'lucide-react';
import WebAuthnFingerprintDemo from '../components/WebAuthnFingerprintDemo';

const LoginPage = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showFingerprintModal, setShowFingerprintModal] = useState(false);
    const [fingerprintScanProgress, setFingerprintScanProgress] = useState(0);

    // Email validation regex
    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleLogin = () => {
        // Validate email format
        if (!email || !validateEmail(email)) {
            toast({
                title: "Login Error",
                description: "Please enter a valid email address",
                variant: "destructive"
            });
            return;
        }

        // Check password
        if (!password) {
            toast({
                title: "Login Error",
                description: "Please enter your password",
                variant: "destructive"
            });
            return;
        }

        // If email and password are valid, show fingerprint modal
        setShowFingerprintModal(true);
        
        // Simulate fingerprint scanning progress
        const interval = setInterval(() => {
            setFingerprintScanProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    // Redirect to dashboard after successful authentication
                    setTimeout(() => {
                        setShowFingerprintModal(false);
                        toast({
                            title: "Login Successful",
                            description: "Welcome back to your banking dashboard",
                        });
                        navigate('/dashboard');
                    }, 500);
                    return 100;
                }
                return prev + 10;
            });
        }, 200);
    };

    const handleForgotPassword = () => {
        navigate('/forgot-password');
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

            {/* Login Content */}
            <div className="flex items-center justify-center px-4 py-12">
                <Card className="w-full max-w-md">
                    <CardHeader className="text-center">
                        <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
                        <p className="text-gray-600 mt-2">Log in to your account</p>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label>Email Address</Label>
                            <Input
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Password</Label>
                            <Input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <Button
                            variant="link"
                            className="text-sm text-gray-600 p-0 hover:underline"
                            onClick={handleForgotPassword}
                        >
                            Forgot Password?
                        </Button>
                        <Button
                            onClick={handleLogin}
                            className="w-full"
                        >
                            Log In
                        </Button>
                        <div className="text-center text-sm text-gray-600">
                            Don't have an account? {' '}
                            <Button
                                variant="link"
                                className="p-0 text-sm hover:underline"
                                onClick={() => navigate('/register')}
                            >
                                Register
                            </Button>
                        </div>
                        <WebAuthnFingerprintDemo/>

                    </CardContent>
                </Card>
            </div>


            {/* Fingerprint Authentication Modal */}
            <Dialog open={showFingerprintModal} onOpenChange={setShowFingerprintModal}>
                <DialogContent>
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

export default LoginPage;