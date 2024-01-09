// RingCentralLoginComponent.js
import React from 'react';
import axios from 'axios';

const RingCentralLoginComponent = () => {
  const handleLogin = async () => {
    try {
      // Make a request to initiate the RingCentral authentication
      const response = await axios.get('http://localhost:3000/login');
      console.log('Redirecting to RingCentral for login:', response.data);
    } catch (error) {
      console.error('Failed to initiate RingCentral login:', error);
    }
  };

  return (
    <div>
      <h2>RingCentral Login</h2>
      <button onClick={handleLogin}>Login with RingCentral</button>
    </div>
  );
};

export default RingCentralLoginComponent;
