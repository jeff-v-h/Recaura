const express = require('express');
const router = new express.Router();
const Casefile = require('../models/casefile.model');
const mongoose = require('mongoose');

router.post('/api/casefiles', async (req, res) => {
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
router.get('/api/casefiles', async (req, res) => {
  const match = {};
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
router.get('/api/casefiles/:id', async (req, res) => {
  try {
    const casefile = await Casefile.findOne({ _id: req.params.id });

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

router.patch('/api/casefiles/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['patientId', 'name'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(404).send({ error: 'At least one property in object is invalid for updating!' });
  }

  try {
    const casefile = await Casefile.findOne({ _id: req.params.id });

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

router.delete('/api/casefiles/:id', async (req, res) => {
  try {
    const casefile = await Casefile.findOne({ _id: req.params.id });
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
