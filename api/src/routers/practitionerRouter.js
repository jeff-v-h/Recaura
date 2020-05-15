const express = require('express');
const router = new express.Router();
const Practitioner = require('../models/practitioner.model');

router.post('/api/practitioners', async (req, res) => {
  const practitioner = new Practitioner(req.body);

  try {
    await practitioner.save();
    res.status(201).send(practitioner);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

// GET /practitioners?gender=male
// GET /practitioners?limit=10&skip=10
// GET /practitioners?sortBy=createdAt:desc
router.get('/api/practitioners', async (req, res) => {
  const match = {};
  const sort = {};

  if (req.query.gender) {
    match.gender = req.query.gender;
  }

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(':');
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
  }

  try {
    const practitioners = await Practitioner.find(match, null, {
      limit: parseInt(req.query.limit),
      skip: parseInt(req.query.skip),
      sort
    });
    res.send(practitioners);
  } catch (e) {
    res.status(500).send();
  }
});

router.get('/api/practitioners/:id', async (req, res) => {
  try {
    const practitioner = await Practitioner.findOne({ _id: req.params.id });
    // .populate('consultations')

    if (!practitioner) {
      return res.status(404).send({ error: 'Practitioner not found' });
    }

    res.send(practitioner);
  } catch (e) {
    res.status(500).send();
  }
});

router.patch('/api/practitioners/:id', async (req, res) => {
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
    'profession',
    'jobLevel'
  ];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(404).send({ error: 'At least one property in object is invalid for updating!' });
  }

  try {
    const practitioner = await Practitioner.findOne({ _id: req.params.id });

    if (!practitioner) {
      return res.status(404).send({ error: 'Practitioner not found' });
    }

    updates.forEach((update) => (practitioner[update] = req.body[update]));
    await practitioner.save();
    res.send(practitioner);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

router.delete('/api/practitioners/:id', async (req, res) => {
  try {
    const practitioner = await Practitioner.findOneAndDelete({ _id: req.params.id });
    if (!practitioner) {
      return res.status(404).send({ error: 'Practitioner not found' });
    }
    res.send(practitioner);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

module.exports = router;
