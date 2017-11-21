import express from 'express';
import config from './config';
import compression from 'compression';
import helmet from 'helmet';
import https from 'https';
import session from 'cookie-session';
import bodyParser from 'body-parser';
import fs from 'fs';

const app = express();

// Express Security best practices
// helmet is used to protect against well known vulnerabilities
app.use(helmet());

app.set('trust proxy', 1);
app.use(session({
  secret: config.session.session_secret,
  name: 'sessionId',
  cookie: {
    secure: true,
    httpOnly: true,
    domain: config.session.domain,
    path: config.session.cookie_path,
    expires: config.session.expiryDate
  }
}));

// Express Performance best practices
app.use(compression());

// Other middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Attach Routes
app.get('/', (req, res)=>{
  return res.status(200).json({message: "hello world"});
});

// Server setup
const key = fs.readFileSync(config.server.key);
const cert = fs.readFileSync(config.server.cert);

https.createServer({key, cert}, app)
  .listen(config.server.port, config.server.host);


