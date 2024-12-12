import React, { useState, useEffect } from 'react';
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "../components/ui/accordion";
import { useNavigate } from 'react-router-dom';
import { useToast } from "../components/ui/hooks/use-toast";
import { Check, X } from "lucide-react";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Basic registration state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Password validation state
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    number: false,
    specialChar: false
  });

  // Verified user details state
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');

  // Email validation regex
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Password validation function
  const validatePassword = (pwd: string) => {
    const validation = {
      length: pwd.length >= 8,
      number: /\d/.test(pwd),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(pwd)
    };
    setPasswordValidation(validation);
    return validation.length && validation.number && validation.specialChar;
  };

  const handleRegister = () => {
    // Validate email
    if (!email || !validateEmail(email)) {
      toast({
        title: "Registration Error",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }

    // Validate password
    if (!password || !validatePassword(password)) {
      toast({
        title: "Registration Error",
        description: "Please create a valid password",
        variant: "destructive"
      });
      return;
    }

    // If all basic details are filled, navigate to dashboard
    toast({
      title: "Registration Successful",
      description: "Welcome to your new banking experience!",
    });

    // Navigate to login
    navigate('/login');
  };

  const handleAboutUs = () => {
    navigate('/about');
  };

  // Validate password on change
  useEffect(() => {
    validatePassword(password);
  }, [password]);

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

      {/* Registration Content */}
      <div className="flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Create Your Account</h2>
            <p className="text-gray-600 mt-2">Secure and fast registration</p>
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
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              
              <div className="mt-2 space-y-1 text-sm text-gray-600">
                <div className="flex items-center">
                  {passwordValidation.length ? (
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                  ) : (
                    <X className="h-4 w-4 text-red-500 mr-2" />
                  )}
                  At least 8 characters long
                </div>
                <div className="flex items-center">
                  {passwordValidation.number ? (
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                  ) : (
                    <X className="h-4 w-4 text-red-500 mr-2" />
                  )}
                  Contains at least one number
                </div>
                <div className="flex items-center">
                  {passwordValidation.specialChar ? (
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                  ) : (
                    <X className="h-4 w-4 text-red-500 mr-2" />
                  )}
                  Contains at least one special character
                </div>
              </div>
            </div>

            <Accordion type="single" collapsible>
              <AccordionItem value="verified-user">
                <AccordionTrigger>
                  Become a Verified User
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input 
                      placeholder="John Doe"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Address</Label>
                    <Input 
                      placeholder="123 Main St, City, Country"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Phone Number</Label>
                    <Input 
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Date of Birth</Label>
                    <Input 
                      type="date"
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Button 
              onClick={handleRegister} 
              className="w-full"
            >
              Create Account
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;