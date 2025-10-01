import React from 'react';
import RoundedButton from './RoundedButton';

const RoundedButtonExample: React.FC = () => {
  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <h2 className="text-xl font-bold text-gray-800">Rounded Button Examples</h2>
      
      {/* Default button with blue background */}
      <RoundedButton 
        onClick={() => console.log('Blue button clicked')}
      >
        Click Me
      </RoundedButton>
      
      {/* Button with custom background */}
      <RoundedButton 
        className="bg-purple-500 hover:bg-purple-600"
        onClick={() => console.log('Purple button clicked')}
      >
        Purple
      </RoundedButton>
      
      {/* Button with outline style */}
      <RoundedButton 
        className="bg-white text-gray-800 border-2 border-gray-300 hover:bg-gray-100"
        onClick={() => console.log('Outlined button clicked')}
      >
        Outlined
      </RoundedButton>
      
      {/* Button with gradient */}
      <RoundedButton 
        className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600"
        onClick={() => console.log('Gradient button clicked')}
      >
        Gradient
      </RoundedButton>
    </div>
  );
};

export default RoundedButtonExample;