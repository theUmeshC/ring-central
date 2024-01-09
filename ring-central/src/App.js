import React, { useEffect, useState } from 'react'
import axios from 'axios';

const App = () => {
  const [callLogs, setCallLogs] = useState(null);
  const handleLogin = () => {
    window.location.href = 'http://localhost:3000/login';
    // try {
    //   const response = await axios.get('http://localhost:3000/login');
    //   console.log('Redirecting to RingCentral for login:', response.data);
    // } catch (error) {
    //   console.error('Failed to initiate RingCentral login:', error);
    // }
  };

  const handleCallLogs = () => {
    const access_token = JSON.parse(localStorage.getItem('access_token'));
    debugger;
    axios.get(`https://platform.devtest.ringcentral.com/restapi/v1.0/account/~/extension/~/call-log?extensionNumber=101&phoneNumber=13133982184&showBlocked=true&view=Simple&withRecording=false&page=1&perPage=100&showDeleted=false`, {
      headers: {
        'Authorization': `Bearer ${access_token}`,
      },
    })
      .then(callLogResponse => {
        const callRecords = callLogResponse.data.records;
        setCallLogs(callRecords);
        console.log(callRecords);
      })
      .catch(error => {
        console.error('Error fetching call records:', error.response.data);
      });
  }

  const handleGetMessages = () => {
    const access_token = JSON.parse(localStorage.getItem('access_token'));
    const body = {
      from: {
          phoneNumber: '13133982184'
      },
      to: [
          {
              phoneNumber: '1800811800'
          },
      ],
      text: '<ENTER VALUE>',
  };
    debugger;
    axios.post(`https://platform.devtest.ringcentral.com/restapi/v1.0/account/~/extension/~/sms`, {
      headers: {
        'Authorization': `Bearer ${access_token}`,
      }, body,
    })
      .then(callLogResponse => {
        const callRecords = callLogResponse.data.records;
        setCallLogs(callRecords);
        console.log(callRecords);
      })
      .catch(error => {
        console.error('Error fetching call records:', error.response.data);
      });
  }

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const code = query.get('code');
    localStorage.setItem('access_token', JSON.stringify(code));
    console.log('Got code:', code);
  }, [])
  return (
    <div>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleCallLogs}>call logs</button>
      <button onClick={handleGetMessages}>message logs</button>
      {callLogs?.map((callLog) => (
        <div key={callLog.id}>
          <h4> call from : {callLog.from.name}</h4>
          <h4> call to : {callLog.to.phoneNumber}</h4>
        </div>
      ))}
    </div>
  )
}

export default App