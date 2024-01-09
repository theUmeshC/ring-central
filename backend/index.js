const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors({
  origin: 'http://localhost:3001',
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

const clientId = '0BQGLfZF5frcdMhkSIz1i6';
const clientSecret = '4PQwfT6YkLLb6rWZBDKRBC52SgMEtTZExbhaWcrdEtum';
const redirectUri = 'http://localhost:3000/callback/';

app.get('/login', (req, res) => {
  const authorizationUrl = `https://platform.devtest.ringcentral.com/restapi/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}`;
  res.redirect(authorizationUrl);
});

app.get('/callback', async (req, res) => {
  const { code } = req.query;
  const params = new URLSearchParams();
  params.append('grant_type', 'authorization_code');
  params.append('code', code);
  params.append('redirect_uri', redirectUri);
  params.append('client_id', clientId);
  params.append('client_secret', clientSecret);
  try {
    const response = await axios.post('https://platform.devtest.ringcentral.com/restapi/oauth/token', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    console.log(response.data);
    const accessToken = response.data.access_token;
    const callRecordingRes = axios.get(`https://platform.devtest.ringcentral.com/restapi/v1.0/account/~/extension/~/call-log?extensionNumber=101&phoneNumber=13133982184&showBlocked=true&view=Simple&withRecording=false&page=1&perPage=100&showDeleted=false`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    })
      .then(callLogResponse => {
        const callRecords = callLogResponse.data.records;
      })
      .catch(error => {
        console.error('Error fetching call records:', error.response.data);
      });
    res.redirect(`http://localhost:3001?code=${accessToken}`);
  } catch (error) {
    console.error('Error exchanging authorization code for access token:', error.response.data);
    res.status(500).send('Authentication failed');
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
