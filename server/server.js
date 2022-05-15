const express = require('express');
require('dotenv').config();

const app = express();
const { log } = require('./logger');

const { Sequelize } = require('sequelize');

// ========================================

app.use(express.json({ extended: true }));

app.use('/api/auth', require('./routes/auth'));

// ========================================

async function start() {

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

  // connect to db
  try {
    const db = new Sequelize(process.env.DB_URI, {
      logging: msg => log.info(msg)
    });
    db.authenticate().then(() => {
      const tmp = 'Connected to DB';

      console.log(tmp);
      log.info(tmp);
    });
  } catch (e) {
    console.error('')
  }

  // log indicator
  const tmp = 'Logging...';

  console.log(tmp);
  log.info(tmp);
}

start();