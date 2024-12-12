import React, { useState } from 'react';
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { motion } from "framer-motion";

const CustomerSupport = () => {
    const [queryType, setQueryType] = useState<string | null>(null);

    const renderContent = () => {
        switch (queryType) {
            case 'call':
                return (
                    <div className="space-y-4">
                        <p className="text-lg text-gray-600">
                            You can reach us at <strong>+44 1234 5678</strong>.
                        </p>
                        <p className="text-sm text-gray-500">
                            Our customer support team is available 24/7 to assist you with your queries.
                        </p>
                    </div>
                );
            case 'meeting':
                return (
                    <div className="space-y-4">
                        <Input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            className="w-full"
                        />
                        <Input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            className="w-full"
                        />
                        <Input
                            type="datetime-local"
                            name="datetime"
                            placeholder="Preferred Date and Time"
                            className="w-full"
                        />
                        <Button className="w-full h-12 rounded-lg bg-primary text-white hover:bg-primary-dark">
                            Book Meeting
                        </Button>
                    </div>
                );
            default:
                return (
                    <div className="space-y-4">
                        <Input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            className="w-full"
                        />
                        <Input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            className="w-full"
                        />
                        <Input
                            type="text"
                            name="subject"
                            placeholder="Subject"
                            className="w-full"
                        />
                        <Textarea
                            name="message"
                            placeholder="Your Message"
                            className="w-full"
                        />
                        <Button
                            className="w-full h-12 rounded-lg bg-primary text-white hover:bg-primary-dark"
                        >
                            Submit
                        </Button>
                    </div>
                );
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen flex flex-col items-center">
            <div className="flex space-x-4 mb-6">
                <Button
                    className={`flex-1 h-12 rounded-lg ${queryType === 'call' ? 'bg-primary text-white' : 'bg-gray-100 text-black hover:text-white'}`}
                    onClick={() => setQueryType('call')}
                >
                    Give us a call
                </Button>
                <Button
                    className={`flex-1 h-12 rounded-lg ${queryType === 'meeting' ? 'bg-primary text-white' : 'bg-gray-100 text-black hover:text-white'}`}
                    onClick={() => setQueryType('meeting')}
                >
                    Book an online meeting
                </Button>
            </div>

            <Card className="w-full max-w-3xl">
                <CardContent className="p-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {renderContent()}
                    </motion.div>
                </CardContent>
            </Card>

            {queryType && (
                <div className="mt-4 w-full max-w-3xl">
                    <Button
                        className="w-full h-12 rounded-lg bg-gray-100 text-black hover:text-white"
                        onClick={() => setQueryType(null)}
                    >
                        Back to Form
                    </Button>
                </div>
            )}
        </div>
    );
};

export default CustomerSupport;
