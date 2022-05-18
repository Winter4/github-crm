const express = require('express');
const router = express.Router();
const { body, param, validationResult } = require('express-validator');
const axios = require('axios');

const { log } = require('../logger');

const Repo = require('../database/index').models.repo;

// ============================================

async function fetchRepo(path) {
  try {
    const repo = await axios.get('https://api.github.com/repos/' + path);
    return repo.data; 
  } catch (e) {
    throw e;
  }
}

function buildRepo(repo, path, user) {
  return Repo.build({
    owner: repo.owner.login,
    name: repo.name,
    path: path,
    url: repo.html_url,
    stars: repo.watchers,
    forks: repo.forks,
    issues: repo.open_issues,
    created: repo.created_at,
    user_id: user,
  });
}

// ============================================

// fetch repo info from github api
router.post('/repo', 
  [
    body('user', 'Invalid user ID').isInt({ min: 1 }),
    body('path', 'Invalid path').notEmpty().isString(),
  ],
  async (req, res) => {
    try {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        log.info('Invalid repo fetch data', { data: req.body, errors: errors.array() });
        return res.status(400).json({
          message: 'Invalid repo fetch data',
          errors: errors.array(),
        });
      } 

      let newRepo;
      log.info('Saving new repo', { route: req.url, user_id: req.body.user });
      try {
        newRepo = buildRepo(await fetchRepo(req.body.path), req.body.path, req.body.user);
        await newRepo.save();
      } catch (e) {
        log.info('Fetching repo failed', { route: req.url, error: e.message });
        return res.status(400).json({ message: 'Fetching repo from GH API failed: ' + e.message });
      }
      log.info('Repo saved', { route: req.url, user_id: req.body.user, repo: newRepo });

      log.info('Response for repo POST with OK', { route: req.url });
      return res.json({ msg: 'OK' });
    } catch (e) {
      log.error(e.message, { route: req.url });
      res.status(500).send('Server failed');
    }
  }
);

router.get('/repos/:userId', 
  [
    param('userId', 'Invalid user ID').isInt({ min: 1 }),
  ], 
  async (req, res) => {
    try {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        log.info('Invalid user repos fetch data', { user_id: req.params.userId, errors: errors.array() });
        return res.status(400).json({
          message: 'Invalid user repos fetch data',
          errors: errors.array(),
        });
      }

      const data = await Repo.findAll({ where: {user_id: req.params.userId}});
      let repos = [];
      data.forEach(repo => repos.push(repo.toJSON()) );
      
      log.info('Response for repos GET with repos json OK');
      return res.json(repos.sort((a, b) => a.id - b.id));
    } catch (e) {
      log.error(e.message, { route: req.url });
      res.status(500).send('Server failed');
    }
  }
);

router.put('/repo/:repoId',
  [
    param('repoId', 'Invalid repo ID').isInt({ min: 1 }),
  ],
  async (req, res) => {
    try {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        log.info('Invalid repo refresh data', { user_id: req.params.userId, errors: errors.array() });
        return res.status(400).json({
          message: 'Invalid repo refresh data',
          errors: errors.array(),
        });
      }

      // get repo from DB
      let repo = await Repo.findOne({ where: {id: req.params.repoId}});
      const path = repo.path;
      const user = repo.user_id;

      // refresh repo data
      try {
        const newRepo = await fetchRepo(path);
        // build refreshed instance
        repo = buildRepo(newRepo, path, user);
      } catch (e) {
        log.info('Fetching repo failed', { route: req.url, error: e.message });
        return res.status(400).json({ message: 'Fetching repo from GH API failed: ' + e.message });
      }

      log.info('Refreshing repo', { route: req.url, repoId: req.params.repoId });
      repo.id = req.params.repoId;
      await Repo.update(repo.toJSON(), { where: {id: req.params.repoId} });
      log.info('Repo refreshed', { route: req.url, repoId: req.params.repoId });

      log.info('Response for repo PUT with OK', { route: req.url });
      return res.json({ msg: 'OK' });
    } catch (e) {
      log.error(e.message, { route: req.url });
      res.status(500).send('Server failed');
    }
  }
);

router.delete('/repo/:repoId',
  [
    param('repoId', 'Invalid repo ID').isInt({ min: 1 }),
  ],
  async (req, res) => {
    try {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        log.info('Invalid repo delete data', { user_id: req.params.userId, errors: errors.array() });
        return res.status(400).json({
          message: 'Invalid repo delete data',
          errors: errors.array(),
        });
      }

      log.info('Deleting repo', { route: req.url, repoId: req.params.repoId });
      await Repo.destroy({ where: {id: req.params.repoId} });
      log.info('Repo refreshed', { route: req.url, repoId: req.params.repoId });

      log.info('Response for repo DELETE with OK', { route: req.url });
      return res.json({ msg: 'OK' });
    } catch (e) {
      log.error(e.message, { route: req.url });
      res.status(500).send('Server failed');
    }
  }
);

module.exports = router;