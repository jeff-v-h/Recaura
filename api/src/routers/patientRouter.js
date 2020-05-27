const express = require('express');
const router = new express.Router();
const Patient = require('../models/patient.model');
const auth = require('../middleware/auth');
const { getInitialMatch, getFindByIdMatch } = require('../helpers/utils');

router.post('/patients', auth, async (req, res) => {
  const patient = new Patient({ ...req.body, clinicId: req.practitioner.clinicId });

  try {
    await patient.save();
    res.status(201).send(patient);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

// GET /patients?gender=male
// GET /patients?limit=10&skip=10
// GET /patients?sortBy=createdAt:desc
router.get('/patients', auth, async (req, res) => {
  const match = getInitialMatch(req.practitioner);
  const sort = {};

  if (req.query.gender) {
    match.gender = req.query.gender;
  }

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(':');
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
  }

  try {
    const patients = await Patient.find(match, null, {
      limit: parseInt(req.query.limit),
      skip: parseInt(req.query.skip),
      sort
    });
    res.send(patients);
  } catch (e) {
    res.status(500).send();
  }
});

router.get('/patients/:id', auth, async (req, res) => {
  try {
    const patient = await Patient.findOne(getFindByIdMatch(req.params.id, req.practitioner));
    // .populate('casefiles')

    if (!patient) {
      return res.status(404).send({ error: 'Patient not found' });
    }

    res.send(patient);
  } catch (e) {
    res.status(500).send();
  }
});

router.patch('/patients/:id', auth, async (req, res) => {
  if (req.practitioner.accessLevel < 2) {
    return res.status(403).send({ error: 'Forbidden to update details for patient' });
  }

  const updates = Object.keys(req.body);
  const allowedUpdates = [
    'honorific',
    'firstName',
    'lastName',
    'dob',
    'email',
    'countryCode',
    'homePhone',
    'mobilePhone',
    'gender',
    'occupation',
    'clinicId'
  ];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'At least one property in object is invalid for updating!' });
  }

  try {
    const patient = await Patient.findOne(getFindByIdMatch(req.params.id, req.practitioner));

    if (!patient) {
      return res.status(404).send({ error: 'Patient not found' });
    }

    updates.forEach((update) => (patient[update] = req.body[update]));
    await patient.save();
    res.send(patient);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

router.delete('/patients/:id', auth, async (req, res) => {
  if (req.practitioner.accessLevel < 2) {
    return res.status(403).send({ error: 'Forbidden to delete patient' });
  }

  try {
    const patient = await Patient.findOne(getFindByIdMatch(req.params.id, req.practitioner));

    if (!patient) {
      return res.status(404).send({ error: 'Patient not found' });
    }

    await patient.remove();
    res.send(patient);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

module.exports = router;
