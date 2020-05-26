const express = require('express');
const router = new express.Router();
const Casefile = require('../models/casefile.model');
const auth = require('../middleware/auth');
const { getInitialMatch, getFindByIdMatch } = require('../helpers/utils');

router.post('/casefiles', auth, async (req, res) => {
  const casefile = new Casefile(req.body);

  try {
    await casefile.save();
    res.status(201).send(casefile);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

// GET /casefiles?patientId=123124
// GET /casefiles?limit=10&skip=10
// GET /casefiles?sortBy=createdAt:desc
router.get('/casefiles', auth, async (req, res) => {
  const match = getInitialMatch(req.practitioner);
  const sort = {};

  if (req.query.patientId) {
    match.patientId = req.query.patientId;
  }

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(':');
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
  }

  try {
    const casefiles = await Casefile.find(match, null, {
      limit: parseInt(req.query.limit),
      skip: parseInt(req.query.skip),
      sort
    });
    res.send(casefiles);
  } catch (e) {
    res.status(500).send();
  }
});

// GET /casefiles/111?patientInfo=true
// GET /casefiles/111?consultations=true
router.get('/casefiles/:id', auth, async (req, res) => {
  try {
    const casefile = await Casefile.findOne(getFindByIdMatch(req.params.id, req.practitioner));

    if (req.query.consultations === 'true') {
      await casefile.populate('consultations', 'number date practitionerId').execPopulate();
    }

    if (req.query.patientInfo === 'true') {
      await casefile.populate('patient', 'gender firstName lastName dob occupation').execPopulate();
    }

    if (!casefile) {
      return res.status(404).send({ error: 'Casefile not found' });
    }

    res.send(casefile);
  } catch (e) {
    res.status(500).send();
  }
});

router.patch('/casefiles/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['patientId', 'name'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'At least one property in object is invalid for updating!' });
  }

  try {
    const casefile = await Casefile.findOne(getFindByIdMatch(req.params.id, req.practitioner));

    if (!casefile) {
      return res.status(404).send({ error: 'Casefile not found' });
    }

    updates.forEach((update) => (casefile[update] = req.body[update]));
    await casefile.save();
    res.send(casefile);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

router.delete('/casefiles/:id', auth, async (req, res) => {
  if (req.practitioner.accessLevel < 2) {
    return res.status(403).send({ error: 'Forbidden to delete casefile' });
  }

  try {
    const casefile = await Casefile.findOne(getFindByIdMatch(req.params.id, req.practitioner));
    if (!casefile) {
      return res.status(404).send({ error: 'Casefile not found' });
    }
    await casefile.remove();
    res.send(casefile);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

module.exports = router;
