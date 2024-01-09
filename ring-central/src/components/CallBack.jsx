// CallbackComponent.js
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // If you're using React Router

const CallbackComponent = () => {
  const location = useLocation();

  useEffect(() => {
    // Extract query parameters from the URL
    const params = new URLSearchParams(location.search);
    const code = params.get('code');

    // Send the code to your backend for further processing
    // You might want to store it in state or dispatch an action for further use
    console.log('Received authorization code:', code);
  }, [location.search]);

  return (
    <div>
      <h2>Callback Component</h2>
      {/* Add any loading or informative messages here */}
    </div>
  );
};

export default CallbackComponent;
