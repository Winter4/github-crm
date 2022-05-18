const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express();
const { log } = require('./logger');

// ========================================

// requests body parser
app.use(express.json({ extended: true }));
// cors policy 
app.use(cors());

// log all income requests
app.use((req, res, next) => {
  log.info('New Request', { method: req.method, url: req.url, query: req.query, body: req.body });
  next();
});

// - - - - - - - - - - - - -

// handle auth routes here
app.use('/api/auth', require('./routes/auth'));

// handle data routes here
app.use('/api/data', require('./routes/data'));

// sending static in prod mode
if (process.env.NODE_ENV === 'prod') {
  app.use(express.static(__dirname + '/client/build'));

  app.get('*', (req, res) => {
    res.sendFile(__dirname + '/client/build/index.html')
  }); 
}

// ========================================

// define & call start function
(async function start() {

  // run the server itself
  try {
    app.listen(8080, () => { 
      const tmp = 'Server started at 8080';

      console.log(tmp);
      log.info(tmp);
    });
  } catch (e) {
    const tmp = 'Failed to start server:';

    console.error(tmp, e);
    log.error(tmp, { msg: e.message });
  }

  // connect to DB
  const db = require('./database/index');
  db.authenticate().then(() => {
    const tmp = 'Connected to DB';

    console.log(tmp);
    log.info(tmp);
  })
  .catch(err => {
    console.error(err);
    log.error(err.message);
  });

  await db.sync();

  // log indicator
  const tmp = 'Logging...';
  console.log(tmp);
  log.info(tmp);
}) ();