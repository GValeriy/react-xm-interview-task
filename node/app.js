const express = require('express');
const cors = require('cors');
require('dotenv/config');

const {
  SERVICE_ID,
  USER_ID,
  ACCESS_TOKEN,
  TEMPLATE_ID,
} = process.env;

const isDev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 5000;
const allowedOrigins = ['http://localhost:3000'];
const options = {
  origin: allowedOrigins,
};

const app = express();
app.use(express.urlencoded());

app.use(cors(options));
app.use(express.json());

app.get('/api-keys', (req, res) => {
  const config = {
    serviceId: SERVICE_ID,
    userId: USER_ID,
    accessToken: ACCESS_TOKEN,
    templateId: TEMPLATE_ID,
  };
  res.send(config);
});

app.listen(PORT, () => {
  /* eslint-disable no-console */
  console.error(`Node ${isDev ? 'dev server' : `cluster worker ${process.pid}`}: listening on port ${PORT}`);
});
