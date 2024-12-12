import React, { useState } from 'react';
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Switch } from "../components/ui/switch";
import { Label } from "../components/ui/label";
import { useNavigate } from 'react-router-dom';
import { useToast } from "../components/ui/hooks/use-toast";
import { Bell, Palette, Lock } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog";

const SettingsPage = () => {
    const navigate = useNavigate();
    const { toast } = useToast();

    // Notification Settings State
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [pushNotifications, setPushNotifications] = useState(false);
    const [smsNotifications, setSmsNotifications] = useState(false);

    // Theme Settings State
    const [showThemeDialog, setShowThemeDialog] = useState(false);

    const handleNotificationToggle = (type, currentState) => {
        switch(type) {
            case 'email':
                setEmailNotifications(!currentState);
                toast({
                    title: "Notification Settings Updated",
                    description: `Email notifications ${!currentState ? 'enabled' : 'disabled'}`,
                });
                break;
            case 'push':
                setPushNotifications(!currentState);
                toast({
                    title: "Notification Settings Updated",
                    description: `Push notifications ${!currentState ? 'enabled' : 'disabled'}`,
                });
                break;
            case 'sms':
                setSmsNotifications(!currentState);
                toast({
                    title: "Notification Settings Updated",
                    description: `SMS notifications ${!currentState ? 'enabled' : 'disabled'}`,
                });
                break;
        }
    };

    const handleAboutUs = () => {
        navigate('/about');
    };

    const handleOpenThemeDialog = () => {
        setShowThemeDialog(true);
    };

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Settings Content */}
            <div className="container mx-auto px-4 py-8 space-y-6">
                {/* Notification Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Bell className="mr-2" />
                            Notification Settings
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="email-notifications">Email Notifications</Label>
                            <Switch
                                id="email-notifications"
                                checked={emailNotifications}
                                onCheckedChange={() => handleNotificationToggle('email', emailNotifications)}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <Label htmlFor="push-notifications">Push Notifications</Label>
                            <Switch
                                id="push-notifications"
                                checked={pushNotifications}
                                onCheckedChange={() => handleNotificationToggle('push', pushNotifications)}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <Label htmlFor="sms-notifications">SMS Notifications</Label>
                            <Switch
                                id="sms-notifications"
                                checked={smsNotifications}
                                onCheckedChange={() => handleNotificationToggle('sms', smsNotifications)}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Theme Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Palette className="mr-2" />
                            Theme Settings
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Button 
                            onClick={handleOpenThemeDialog}
                            className="w-full"
                            variant="outline"
                        >
                            Customize Theme
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Theme Customization Dialog */}
            <Dialog open={showThemeDialog} onOpenChange={setShowThemeDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex items-center">
                            <Lock className="mr-2" />
                            Theme Customization
                        </DialogTitle>
                    </DialogHeader>
                    <div className="text-center py-6">
                        <p className="text-gray-600 mb-4">Theme customization is coming soon!</p>
                        <div className="flex justify-center space-x-4">
                            <div className="w-16 h-16 bg-gray-200 rounded-lg opacity-50 cursor-not-allowed"></div>
                            <div className="w-16 h-16 bg-gray-200 rounded-lg opacity-50 cursor-not-allowed"></div>
                            <div className="w-16 h-16 bg-gray-200 rounded-lg opacity-50 cursor-not-allowed"></div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default SettingsPage;