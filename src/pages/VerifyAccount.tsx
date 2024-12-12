import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useNavigate } from 'react-router-dom';
import { useToast } from "../components/ui/hooks/use-toast";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

const VerifyAccountPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // State for personal verification details
  const [verificationDetails, setVerificationDetails] = useState({
    firstName: '',
    lastName: '',
    address: '',
    phoneNumber: '',
    dateOfBirth: '',
  });

  // State for bank account details
  const [bankDetails, setBankDetails] = useState({
    bankName: '',
    accountNumber: '',
    routingNumber: '',
  });

  // State for form validation
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Validate form before submission
  const validateForm = () => {
    const errors: Record<string, string> = {};

    // Required field validations
    const requiredFields: (keyof typeof verificationDetails)[] = [
      'firstName', 'lastName', 'address', 'phoneNumber', 'dateOfBirth'
    ];

    requiredFields.forEach(field => {
      if (!verificationDetails[field]) {
        errors[field] = `${field.replace(/([A-Z])/g, ' $1').toLowerCase()} is required`;
      }
    });

    // Phone number validation
    const phoneRegex = /^\+?1?\d{10,14}$/;
    if (verificationDetails.phoneNumber && !phoneRegex.test(verificationDetails.phoneNumber)) {
      errors.phoneNumber = 'Invalid phone number format';
    }

    // Age validation (must be 18+)
    const today = new Date();
    const birthDate = new Date(verificationDetails.dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    if (age < 18) {
      errors.dateOfBirth = 'You must be 18 or older to verify your account';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleVerification = () => {
    if (validateForm()) {
      // Optional bank account validation
      if (bankDetails.bankName || bankDetails.accountNumber || bankDetails.routingNumber) {
        const bankErrors: Record<string, string> = {};
        
        if (bankDetails.bankName && !bankDetails.accountNumber) {
          bankErrors.accountNumber = 'Account number is required when bank name is provided';
        }
        
        if (bankDetails.accountNumber && !bankDetails.routingNumber) {
          bankErrors.routingNumber = 'Routing number is required when account number is provided';
        }

        if (Object.keys(bankErrors).length > 0) {
          setFormErrors(prev => ({...prev, ...bankErrors}));
          return;
        }
      }
        toast({
          title: 'Account Verification Successful',
          description: 'Your account details have been updated.'
        });
        navigate('/dashboard');
      } else {
        toast({
          title: 'Verification Failed',
          description: 'Please check the form and correct any errors.',
          variant: "destructive"
        });
    }
  };

  // Update personal details
  const updateField = (field: keyof typeof verificationDetails, value: string) => {
    setVerificationDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Update bank details
  const updateBankField = (field: keyof typeof bankDetails, value: string) => {
    setBankDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Verify Your Account</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  type="text"
                  value={verificationDetails.firstName}
                  onChange={(e) => updateField('firstName', e.target.value)}
                  className="mt-2"
                />
                {formErrors.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.firstName}
                  </p>
                )}
              </div>
              
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  type="text"
                  value={verificationDetails.lastName}
                  onChange={(e) => updateField('lastName', e.target.value)}
                  className="mt-2"
                />
                {formErrors.lastName && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.lastName}
                  </p>
                )}
              </div>
              
              <div className="md:col-span-2">
                <Label htmlFor="address">Full Address</Label>
                <Input
                  id="address"
                  type="text"
                  value={verificationDetails.address}
                  onChange={(e) => updateField('address', e.target.value)}
                  className="mt-2"
                />
                {formErrors.address && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.address}
                  </p>
                )}
              </div>
              
              <div>
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  value={verificationDetails.phoneNumber}
                  onChange={(e) => updateField('phoneNumber', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className="mt-2"
                />
                {formErrors.phoneNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.phoneNumber}
                  </p>
                )}
              </div>
              
              <div>
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={verificationDetails.dateOfBirth}
                  onChange={(e) => updateField('dateOfBirth', e.target.value)}
                  className="mt-2"
                />
                {formErrors.dateOfBirth && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.dateOfBirth}
                  </p>
                )}
              </div>
            </div>

            <Accordion type="single" collapsible className="w-full mt-4">
              <AccordionItem value="bank-details">
                <AccordionTrigger>
                  Link Bank Account (Optional)
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <Label htmlFor="bankName">Bank Name</Label>
                      <Input
                        id="bankName"
                        type="text"
                        value={bankDetails.bankName}
                        onChange={(e) => updateBankField('bankName', e.target.value)}
                        className="mt-2"
                      />
                      {formErrors.bankName && (
                        <p className="text-red-500 text-sm mt-1">
                          {formErrors.bankName}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="accountNumber">Account Number</Label>
                      <Input
                        id="accountNumber"
                        type="text"
                        value={bankDetails.accountNumber}
                        onChange={(e) => updateBankField('accountNumber', e.target.value)}
                        className="mt-2"
                      />
                      {formErrors.accountNumber && (
                        <p className="text-red-500 text-sm mt-1">
                          {formErrors.accountNumber}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="routingNumber">Routing Number</Label>
                      <Input
                        id="routingNumber"
                        type="text"
                        value={bankDetails.routingNumber}
                        onChange={(e) => updateBankField('routingNumber', e.target.value)}
                        className="mt-2"
                      />
                      {formErrors.routingNumber && (
                        <p className="text-red-500 text-sm mt-1">
                          {formErrors.routingNumber}
                        </p>
                      )}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Button 
              onClick={handleVerification}
              className="w-full mt-4"
            >
              Verify Account
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VerifyAccountPage;