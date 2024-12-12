import React, { useState } from "react";
import { Button } from "./ui/button";
import { toast } from "./ui/hooks/use-toast";
import { useNavigate } from 'react-router-dom';

// Helper functions to convert data
const bufferToBase64 = (buffer: ArrayBuffer): string =>
  btoa(String.fromCharCode(...Array.from(new Uint8Array(buffer))));

const base64ToBuffer = (base64: string): ArrayBuffer =>
  Uint8Array.from(atob(base64), (c) => c.charCodeAt(0)).buffer;

// Mock functions to simulate backend responses
const getMockRegistrationOptions = (userId: string): PublicKeyCredentialCreationOptions => {
  const challenge = crypto.getRandomValues(new Uint8Array(32)).buffer;
  return {
    challenge,
    rp: { name: "PeerPay" },
    user: {
      id: new TextEncoder().encode(userId),
      name: `PeerPay`,
      displayName: "User",
    },
    pubKeyCredParams: [{ type: "public-key", alg: -7 }],
    timeout: 60000,
    attestation: "direct",
    authenticatorSelection: {
      authenticatorAttachment: "platform",
      requireResidentKey: false,
      userVerification: "required",
    },
  };
};

const getMockAuthenticationOptions = (): PublicKeyCredentialRequestOptions => {
  const challenge = crypto.getRandomValues(new Uint8Array(32)).buffer;
  return {
    challenge,
    allowCredentials: [
      {
        id: crypto.getRandomValues(new Uint8Array(16)).buffer,
        type: "public-key",
        transports: ["internal"],
      },
    ],
    timeout: 60000,
    userVerification: "required",
  };
};

const WebAuthnFingerprintDemo = () => {
  const [status, setStatus] = useState("");
  const [userId] = useState("demo-user-id"); // Mock user identifier
  const navigate = useNavigate();

  const registerPasskey = async () => {
    try {
        setStatus("Registering...");
        const options = getMockRegistrationOptions(userId);

        const credential = await navigator.credentials.create({ publicKey: options });
        if (!credential) throw new Error("Credential creation failed");

        console.log("Registered credential:", credential);
        setStatus("Passkey registered successfully using biometrics!");

        toast({
        title: "Login Successful",
        description: "Welcome back to your banking dashboard",
        });
        navigate('/dashboard');
    } catch (error) {
        setStatus(`Error: ${(error as Error).message}`);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-center text-gray-900">
        Biometric Authentication
      </h3>
      <div className="flex flex-col gap-2">
        <Button onClick={registerPasskey} variant="outline" className="w-full">
          Login with Biometrics
        </Button>
      </div>
    </div>
  );
};

export default WebAuthnFingerprintDemo;
