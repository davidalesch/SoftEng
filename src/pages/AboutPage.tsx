import React from 'react';
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { useNavigate } from 'react-router-dom';
import { Briefcase, ChevronLeft } from "lucide-react";

const AboutPage = () => {
    const navigate = useNavigate();

    const handleNavigateHome = () => {
        navigate(-1);
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12 relative">
            {/* Header */}
            <header className="absolute top-0 left-0 right-0 flex justify-between items-center p-6 text-black">
                <Button
                    variant="outline"
                    onClick={handleNavigateHome}
                    className="text-black border-black/50 hover:bg-black/10 flex items-center space-x-2"
                >
                    <ChevronLeft className="h-5 w-5" />
                    <span>Back</span>
                </Button>
                <div className="font-bold text-2xl">PeerPay</div>
            </header>

            {/* Background Decorative Elements */}
            <div className="absolute inset-0 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-900/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-900/20 rounded-full blur-3xl"></div>
            <div className="max-w-4xl w-full space-y-8 text-center relative z-10">
                <h1 className="text-5xl font-bold text-black tracking-tight">About Us</h1>
                <Card className="w-full shadow-2xl border-none bg-white/50 backdrop-blur-lg">
                    <CardContent className="space-y-8 px-8 py-12">
                        <h2 className="text-2xl font-bold text-black mb-6">
                            Instant Payments. Smarter Blockchain.
                        </h2>

                        <p className="text-lg text-gray-700 leading-relaxed mb-8">
                            Welcome to the future of digital transactions! Our service introduces a revolutionary blockchain-based currency
                            designed to make everyday payments simple, fast, and secure. Unlike traditional cryptocurrencies, where every
                            transaction clogs the main blockchain, we've built a smarter system with local chains and a main chain.
                        </p>

                        <div className="space-y-6 text-left">
                            <h3 className="text-xl font-semibold text-black mb-4">Here's how it works:</h3>
                            <ul className="space-y-4 text-gray-700">
                                <li className="flex items-start">
                                    <span className="font-semibold mr-2">•</span>
                                    <span>Instant Transactions: Small, everyday payments happen instantly on local blockchains, tailored for your region or community.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="font-semibold mr-2">•</span>
                                    <span>Efficient and Scalable: Only major transactions or currency exchanges get recorded on the main blockchain, keeping things fast and affordable for everyone.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="font-semibold mr-2">•</span>
                                    <span>Stable and Secure: Our governing node ensures fair currency exchange rates while maintaining decentralized control, so your money is always in your hands.</span>
                                </li>
                            </ul>
                        </div>

                        <p className="text-lg text-gray-700 leading-relaxed mt-8">
                            Whether you're buying a coffee, splitting a dinner bill, or transferring money across borders, our app makes it
                            as easy as a tap. Say goodbye to long waiting times, high fees, and complicated systems.
                        </p>

                        <p className="text-xl font-semibold text-black mt-8">
                            Join us today and experience a currency built for real life. Fast. Local. Reliable.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default AboutPage;
