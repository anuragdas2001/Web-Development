const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory = path.join(__dirname,'../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
  
const accessLogStream = rfs.createStream("access.log", {
  // size: "10M", // rotate every 10 MegaBytes written
  interval: "1d", // rotate daily
  path: logDirectory,
  compress: "gzip" // compress rotated files
});



const development = {
  name: "development",
  asset_path: "./assets",
  session_cookie_key: "blahsomething",
  db: "codeial_development",
  mailer: {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // two factor authentication
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: "anuragdas12921@gmail.com",
      pass: "sxar wjeq fyuy wvny",
    },
  },
  google_client_ID:
    "502665739610-06qo6n62h8484ief284ttvmebu4rj9ru.apps.googleusercontent.com",
  google_clientSecret: "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",
  google_callbackURL: "http://localhost:8000/users/auth/google/callback",
  jwt_secret: "codeial",
  morgan:{
    mode:'dev',
    options: {stream:accessLogStream}
  }
};

const production = {
  name: process.env.CODEIAL_ENVIRONMENT,
  asset_path: process.env.CODEIAL_ASSET_PATH,
  session_cookie_key: process.env.CODEIAL_SESSION_COOKIE_KEY,
  db: process.env.CODEIAL_DB,
  mailer: {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // two factor authentication
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: process.env.CODEIAL_GMAIL_USERNAME,
      pass: process.env.CODEIAL_GMAIL_PASSWORD,
    },
  },
  google_client_ID: process.env.CODEIAL_GOOGLE_CLIENT_ID,
  google_clientSecret: process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
  google_callbackURL: process.env.CODEIAL_GOOGLE_CALLBACK_URL,
  jwt_secret: process.env.CODEIAL_JWT_SECRET,
  morgan:{
    mode:'combined',
    options: {stream:accessLogStream}
  }
};

// module.exports = eval(process.env.CODEIAL_ENVIRONMENT)==undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT);
module.exports = development
