require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Pusher = require('pusher');

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const pusher = new Pusher({
  appId: '840882',
  key: '0d5c31e9db7a4bddf61e',
  secret: '65d7af0e8c3bb940cbbf',
  cluster: 'us3',
  useTLS: true,
});

app.post('/pusher/auth', (req, res) => {
  const socketId = req.body.socket_id;
  const channel = req.body.channel_name;
  const auth = pusher.authenticate(socketId, channel);
  res.send(auth);
});

app.get('/api', (_, res) => {
  const info = {
    success: true,
  };

  res.json(info);
});

const port = process.env.PORT || 3000;

app.listen(port, () => `Server running on port ${port}`);
