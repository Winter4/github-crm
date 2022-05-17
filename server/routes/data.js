const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const axios = require('axios');

const { log } = require('../logger');

const Repo = require('../database/models/Repo');

// ============================================

router.post('/repo', 
  [
    body('user', 'Invalid user ID').isInt({ min: 1 }),
    body('path', 'Invalid path').notEmpty().isString(),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      log.info('Invalid repo fetch data', { data: req.body, errors: errors.array() });
      return res.status(400).json({
        message: 'Invalid repo fetch data',
        errors: errors.array(),
      });
    }

    const data = await axios.get('https://api.github.com/repos/' + req.body.path);
    const repo = data.data; 

    log.info('Saving new repo', { route: req.url, user_id: req.body.user });
    const newRepo = await Repo.create({
      owner: repo.owner.login,
      name: repo.name,
      url: repo.html_url,
      stars: repo.watchers,
      forks: repo.forks,
      issues: repo.open_issues,
      created: repo.created_at,
      user_id: req.body.user,
    });
    log.info('Repo saved', { route: req.url, user_id: req.body.user, repo: newRepo });

    log.info('Response for repo POST with OK', { route: req.url });
    res.json({ msg: 'OK' });
  }
);

module.exports = router;