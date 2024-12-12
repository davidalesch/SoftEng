import React from 'react';
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  const handleAboutUs = () => {
    navigate('/about');
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12 relative">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 flex justify-between items-center p-6 text-black">
        <div className="animate-fade-in-down hover:scale-110 transition-transform duration-300 font-bold text-4xl">PeerPay</div>
        <Button 
          variant="outline"
          onClick={handleAboutUs}
          className="text-black border-black/50 hover:bg-black/10"
        >
          About Us
        </Button>
      </header>

      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-900/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-900/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-2xl w-full space-y-8 text-center relative z-10">
        <h1 className="animate-fade-in-down hover:scale-110 transition-transform duration-300 text-5xl font-bold text-black tracking-tight">
          Welcome to the future of banking
        </h1>
        <p className="text-xl text-gray-700 mb-8">
          Secure, fast, decentralized and intelligent payments.
        </p>

        <Card className="animate-fade-in-down hover:scale-110 transition-transform duration-300 w-full max-w-md mx-auto shadow-2xl border-none bg-white/50 backdrop-blur-lg">
          <CardContent className="space-y-6 pt-8 pb-8">
            <div className="space-y-4">
            <Button
                onClick={handleLogin}
                className="w-full text-lg py-3 bg-black text-white flex items-center justify-center transition-all duration-300 hover:bg-[repeating-linear-gradient(45deg,_black_0%,_black_20%,_white_40%),_linear-gradient(to_bottom,_black,_black)] hover:bg-[length:10px_10px] hover:text-white"
            >
                Log In
            </Button>


              <div className="flex items-center justify-center space-x-4">
                <div className="h-px bg-gray-400 flex-grow"></div>
                <span className="text-gray-600 text-sm">or</span>
                <div className="h-px bg-gray-400 flex-grow"></div>
              </div>

              <Button
                onClick={handleRegister}
                className="w-full text-lg py-3 border-emerald-900 text-emerald-900 hover:bg-emerald-900/10 flex items-center justify-center bg-diagonal-stripes-white-black"
                variant="outline"
              >
                Register
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WelcomePage;