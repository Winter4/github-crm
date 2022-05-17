const express = require('express');
const router  = express.Router();

const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

const { log } = require('../logger');
const User = require('../database/models/User');

// ============================================

router.post('/login', 
  [
    body('email', 'Invalid email').isEmail(),
    body('password', 'Password length must be 6-30 symbols').isLength({ min: 6, max: 30}),
  ],
  async (req, res) => { 
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        log.info('Invalid signin data', { data: req.body, errors: errors.array() });
        return res.status(400).json({
          message: 'Invalid signin data',
          errors: errors.array(),
        });
      }

      console.log(req.body);

      const user = await User.findOne({ where: {'email': req.body.email} });
      if (await bcrypt.compare(req.body.password, user.password)) {
        log.info('Response for login POST with LOGINED OK', { route: req.url });
        return res.json({ id: user.id, name: user.name, email: user.email });  
      }
      else {
        log.info('Response for login POST with NOT_LOGINED OK', { route: req.url });
        return res.status(400).send('Unexisting account');
      }

    } catch (e) {
      log.error(e.message, { route: req.url });
      res.status(500).send('Server failed');
    }
  }
);

router.post('/register',
  [
    body('name', 'Name must be aplha only').isAlpha(),
    body('name', 'Name length must be 2-30 symbols').isLength({ min: 2, max: 30 }),
    body('email', 'Invalid email').isEmail(),
    body('email').custom(value => {
      return User.findOne({ where: {'email': value} }).then(user => {
        if (user) return Promise.reject('Email is already in use');
      });
    }),
    body('password', 'Password length must be 6-30 symbols').isLength({ min: 6, max: 30 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        log.info('Invalid signup data', { data: req.body, errors: errors.array() });
        return res.status(400).json({
          message: 'Invalid signup data',
          errors: errors.array(),
        });
      }

      let user = User.build({ ...req.body });

      const salt = await bcrypt.genSalt(Number(process.env.CRYPT_SALT));
      user.password = await bcrypt.hash(user.password, salt);

      log.info('Saving new user', { route: req.url, user: user.toJSON()});
      const savedUser = await user.save();
      log.info('User saved', { route: req.url, user: savedUser.toJSON()});

      log.info('Response for register POST with OK', { route: req.url });
      return res.json({ id: savedUser.id, name: savedUser.name, email: savedUser.email });

    } catch (e) {
      log.error(e.message, { route: req.url });
      res.status(500).send('Server failed');
    }
  }
);

module.exports = router;