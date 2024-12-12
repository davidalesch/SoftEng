import React, { useState } from 'react';
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Clock } from 'lucide-react';

// More realistic data generator for exchange rates
const generateRealisticExchangeRateData = () => {
    const currentDate = new Date();
    return Array.from({ length: 12 }, (_, index) => {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - (11 - index), 1);
        
        // Simulate more realistic rate variations
        const baseRates = {
            USD: 1.23,
            EUR: 1.05,
            BTC: 0.000025
        };

        const volatility = {
            USD: 0.03,
            EUR: 0.025,
            BTC: 0.1
        };

        const trend = Math.sin(index / 3) * 0.1;
        const randomness = (Math.random() - 0.5) * volatility[baseRates[index] ? 'USD' : 'EUR'];
        
        return {
            month: date.toLocaleString('default', { month: 'short', year: 'numeric' }),
            rate: baseRates.USD * (1 + trend + randomness)
        };
    });
};

// Currency configuration
const CURRENCIES = [
    {
        code: 'USD',
        name: 'US Dollar',
        source: 'European Central Bank',
        data: generateRealisticExchangeRateData(),
        currentTimestamp: new Date()
    },
    {
        code: 'EUR',
        name: 'Euro',
        source: 'European Central Bank',
        data: generateRealisticExchangeRateData(),
        currentTimestamp: new Date()
    },
    {
        code: 'BTC',
        name: 'Bitcoin',
        source: 'Coinbase Exchange',
        data: generateRealisticExchangeRateData(),
        currentTimestamp: new Date()
    }
];

const ExchangeRatesPage = () => {
    const [visibleCurrencies, setVisibleCurrencies] = useState(3);

    const handleLoadMore = () => {
        // In a real app, this would load more currencies
        // For this mock, we'll just show the same currencies again
        setVisibleCurrencies(prev => prev + 3);
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto space-y-6">
                {CURRENCIES.slice(0, visibleCurrencies).map((currency) => (
                    <Card key={currency.code} className="w-full shadow-lg">
                        <CardContent className="p-0">
                            <div className="p-6 pb-0">
                                <div className="flex justify-between items-center mb-4">
                                    <div>
                                        <div className="text-lg font-semibold text-gray-800">
                                            {currency.name}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {currency.code}
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1">
                                            Source: {currency.source}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm text-gray-600 flex items-center justify-end gap-1">
                                            <Clock size={14} className="text-gray-400" />
                                            {currency.currentTimestamp.toLocaleString('default', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </div>
                                        <div className="text-2xl font-bold text-primary mt-1">
                                            1 = {currency.data[currency.data.length - 1].rate.toFixed(4)}
                                        </div>
                                    </div>
                                </div>
                                <hr className="border-t-1 border-gray-200 mb-4" />
                            </div>
                            <ResponsiveContainer width="100%" height={350}>
                                <LineChart 
                                    data={currency.data}
                                    margin={{ top: 0, right: 30, left: 20, bottom: 0 }}
                                >
                                    <CartesianGrid 
                                        strokeDasharray="3 3" 
                                        vertical={false} 
                                        stroke="#f0f0f0"
                                    />
                                    <XAxis 
                                        dataKey="month" 
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <YAxis 
                                        domain={['dataMin', 'dataMax']} 
                                        tickFormatter={(value) => value.toFixed(4)}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <Tooltip 
                                        formatter={(value) => [typeof value === 'number' ? value.toFixed(4) : value, 'Rate']}
                                        contentStyle={{ 
                                            backgroundColor: '#f8f8f8', 
                                            border: '1px solid #e0e0e0',
                                            borderRadius: '8px'
                                        }}
                                    />
                                    <Line 
                                        type="monotone" 
                                        dataKey="rate" 
                                        stroke="#3b82f6" 
                                        strokeWidth={3}
                                        dot={false}
                                        activeDot={{ 
                                            r: 6, 
                                            strokeWidth: 2, 
                                            stroke: 'white' 
                                        }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                ))}

                <div className="flex justify-center">
                    <Button 
                        onClick={handleLoadMore}
                        className="w-full max-w-md"
                        disabled={visibleCurrencies >= CURRENCIES.length}
                    >
                        {visibleCurrencies >= CURRENCIES.length 
                            ? 'No More Currencies' 
                            : 'Load More'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ExchangeRatesPage;