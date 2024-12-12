import React, { useState } from 'react';
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom';

const TransferPage = () => {
  const [selectedTransfer, setSelectedTransfer] = useState(null);
  const [selectedLocalOption, setSelectedLocalOption] = useState(null);
  const navigate = useNavigate();

  const handleTransferSelection = (type) => {
    setSelectedTransfer(selectedTransfer === type ? null : type);
    // Reset local option when changing transfer type
    setSelectedLocalOption(null);
  };

  const handleLocalOptionSelection = (option) => {
    setSelectedLocalOption(selectedLocalOption === option ? null : option);
  };


  const renderTransferBox = (type, title) => {
    const isSelected = selectedTransfer === type;
    const isOtherSelected = selectedTransfer !== null && selectedTransfer !== type;

    return (
      <div 
        className={`
          bg-white border rounded-lg p-4 cursor-pointer
          flex flex-col justify-center items-center
          transition-all duration-300
          ${isOtherSelected ? 'opacity-50' : 'opacity-100'}
          ${isSelected ? 'shadow-xl' : 'hover:shadow-md'}
          w-1/2
        `}
        onClick={() => handleTransferSelection(type)}
      >
        <h3 className="text-xl font-semibold mb-4">{title}</h3>
        
        <AnimatePresence>
          {isSelected && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{
                width: '100%',
                overflow: 'hidden'
              }}
            >
              {type === 'local' && (
                <div className="mt-4 space-y-4">
                  <p className="text-sm text-gray-600">
                  A local transfer is a fast, lightweight transaction between users on a local blockchain, designed for small-scale everyday exchanges without requiring main chain approval.
                  </p>
                  <Button
                    className="w-full"
                    onClick={() => navigate('/local-transfer')}
                  >
                    Proceed
                  </Button>
                </div>
              )}
              {type === 'external' && (
                <div className="mt-4 space-y-4">
                  <p className="text-sm text-gray-600">
                  An external transfer sends money to an external bank account. It is recorded on the main chain, approved by the governing node, requires user verification, and uses the exchange rate set by the governing node.
                  </p>
                  <Button
                    className="w-full"
                    onClick={() => navigate('/external-transfer')}
                  >
                    Proceed
                  </Button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="p-6 bg-gray-50 h-screen flex flex-col justify-center items-center">
      <h2 className="text-3xl font-bold mb-8 text-center">
        What kind of transfer do you wish to make?
      </h2>
      <Card className="w-full max-w-4xl">
        <CardContent className="p-6">
          <div className="flex space-x-4 w-full">
            {renderTransferBox('local', 'Local Transfer')}
            {renderTransferBox('external', 'External Transfer')}
          </div>
          
          {selectedTransfer === 'local'}
        </CardContent>
      </Card>
    </div>
  );
};

export default TransferPage;