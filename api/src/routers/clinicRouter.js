const express = require('express');
const router = new express.Router();
const Clinic = require('../models/clinic.model');

router.post('/clinics', async (req, res) => {
  const clinic = new Clinic(req.body);

  try {
    await clinic.save();
    res.status(201).send(clinic);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

// GET /clinics?isActive=true
// GET /clinics?limit=10&skip=10
// GET /clinics?sortBy=createdAt:desc
router.get('/clinics', async (req, res) => {
  const match = {};
  const sort = {};

  if (req.query.isActive) {
    match.isActive = req.query.isActive;
  }

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(':');
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
  }

  try {
    const clinics = await Clinic.find(match, null, {
      limit: parseInt(req.query.limit),
      skip: parseInt(req.query.skip),
      sort
    });
    res.send(clinics);
  } catch (e) {
    res.status(500).send();
  }
});

// GET /clinics/111?practitioners=true
// GET /clinics/111?patients=true
// GET /clinics/111?locationInfo=true
router.get('/clinics/:id', async (req, res) => {
  try {
    const clinic = await Clinic.findOne({ _id: req.params.id });

    if (req.query.practitioners === 'true') {
      await clinic.populate('practitioners', 'firstName lastName email profession jobLevel').execPopulate();
    }

    if (req.query.patients === 'true') {
      await clinic.populate('patients', 'gender firstName lastName dob occupation').execPopulate();
    }

    if (req.query.locationInfo === 'true') {
      await clinic.populate('locations').execPopulate();
    }

    if (!clinic) {
      return res.status(404).send({ error: 'clinic not found' });
    }

    res.send(clinic);
  } catch (e) {
    res.status(500).send();
  }
});

router.patch('/clinics/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'locations', 'isActive'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'At least one property in object is invalid for updating!' });
  }

  try {
    const clinic = await Clinic.findOne({ _id: req.params.id });

    if (!clinic) {
      return res.status(404).send({ error: 'clinic not found' });
    }

    updates.forEach((update) => (clinic[update] = req.body[update]));
    await clinic.save();
    res.send(clinic);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

module.exports = router;