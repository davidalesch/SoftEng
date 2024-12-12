import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useNavigate } from 'react-router-dom';
import { useToast } from "../components/ui/hooks/use-toast";

const ManageAccountPage = () => {
  const navigate = useNavigate();

  // State for personal details
  const [personalDetails, setPersonalDetails] = useState({
    email: 'example@user.uk',
    name: 'Example User',
    address: '1 London St, London, UK',
    phoneNumber: '+44 1234 567890',
    dateOfBirth: '2001-10-01'
  });
  const [originalDetails, setOriginalDetails] = useState({ ...personalDetails });

  // State for password change
  const [passwordDetails, setPasswordDetails] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  // State for form validation and feedback
  interface FormErrors {
    email?: string;
    confirmNewPassword?: string;
  }
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  // Toast for feedback
  const { toast } = useToast();

  // Handler for personal details update
  const handlePersonalDetailsUpdate = () => {
    const hasChanges = Object.keys(personalDetails).some(
      key => personalDetails[key] !== originalDetails[key]
    );

    if (!hasChanges) {
      toast({
        title: 'No Changes Detected',
        description: 'Please make changes to your details before updating.',
        variant: 'default'
      });
      return;
    }

    if (!personalDetails.email) {
      setFormErrors({ email: 'Email is required' });
      return;
    }

    toast({
      title: 'Personal details updated successfully',
      description: 'Your account information has been updated.'
    });
    setOriginalDetails({ ...personalDetails });
    navigate('/dashboard');
  };

  // Handler for password change
  const handlePasswordChange = () => {
    if (passwordDetails.newPassword === passwordDetails.currentPassword) {
      toast({
        title: 'Invalid Password',
        description: 'The new password must be different from the current password.',
        variant: 'destructive'
      });
      return;
    }

    if (passwordDetails.newPassword !== passwordDetails.confirmNewPassword) {
      setFormErrors({
        confirmNewPassword: 'Passwords do not match'
      });
      return;
    }

    toast({
      title: 'Password changed successfully',
      description: 'Your password has been updated.'
    });
    navigate('/dashboard');

    setPasswordDetails({
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    });
    setFormErrors({});
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Personal Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={personalDetails.email}
                  onChange={(e) => setPersonalDetails(prev => ({
                    ...prev, 
                    email: e.target.value
                  }))}
                  className="mt-2"
                />
                {formErrors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.email}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={personalDetails.name}
                  onChange={(e) => setPersonalDetails(prev => ({
                    ...prev, 
                    name: e.target.value
                  }))}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  type="text"
                  value={personalDetails.address}
                  onChange={(e) => setPersonalDetails(prev => ({
                    ...prev, 
                    address: e.target.value
                  }))}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  value={personalDetails.phoneNumber}
                  onChange={(e) => setPersonalDetails(prev => ({
                    ...prev, 
                    phoneNumber: e.target.value
                  }))}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={personalDetails.dateOfBirth}
                  onChange={(e) => setPersonalDetails(prev => ({
                    ...prev, 
                    dateOfBirth: e.target.value
                  }))}
                  className="mt-2"
                />
              </div>
            </div>
            <Button 
              onClick={handlePersonalDetailsUpdate}
              className="w-full mt-4"
            >
              Update Personal Details
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Change Password</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={passwordDetails.currentPassword}
                  onChange={(e) => setPasswordDetails(prev => ({
                    ...prev, 
                    currentPassword: e.target.value
                  }))}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={passwordDetails.newPassword}
                  onChange={(e) => setPasswordDetails(prev => ({
                    ...prev, 
                    newPassword: e.target.value
                  }))}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
                <Input
                  id="confirmNewPassword"
                  type="password"
                  value={passwordDetails.confirmNewPassword}
                  onChange={(e) => setPasswordDetails(prev => ({
                    ...prev, 
                    confirmNewPassword: e.target.value
                  }))}
                  className="mt-2"
                />
                {formErrors.confirmNewPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.confirmNewPassword}
                  </p>
                )}
              </div>
            </div>
            <Button 
              onClick={handlePasswordChange}
              className="w-full mt-4"
              variant="destructive"
            >
              Change Password
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ManageAccountPage;