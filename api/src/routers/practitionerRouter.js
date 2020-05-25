const express = require('express');
const router = new express.Router();
const Practitioner = require('../models/practitioner.model');
const auth = require('../middleware/auth');

router.post('/practitioners', async (req, res) => {
  const { accessLevel } = req.body;
  if (accessLevel && accessLevel > 1) {
    return res.status(403).send({ error: 'Forbidden to create with access level greater than 1' });
  }

  const practitioner = new Practitioner(req.body);

  try {
    await practitioner.save();
    const token = await practitioner.generateAuthToken();
    res.status(201).send({ practitioner, token });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

router.post('/practitioners/login', async (req, res) => {
  try {
    const practitioner = await Practitioner.findByCredentials(req.body.email, req.body.password);
    const token = await practitioner.generateAuthToken();
    res.send({ practitioner, token });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

router.post('/practitioners/logout', auth, async (req, res) => {
  try {
    req.practitioner.tokens = req.practitioner.tokens.filter((token) => token.token !== req.token);
    await req.practitioner.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.post('/practitioners/logoutAll', auth, async (req, res) => {
  try {
    req.practitioner.tokens = [];
    await req.practitioner.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

// GET /practitioners?gender=male
// GET /practitioners?limit=10&skip=10
// GET /practitioners?sortBy=createdAt:desc
router.get('/practitioners', auth, async (req, res) => {
  const match = {
    clinicId: req.practitioner.clinicId
  };
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

router.get('/practitioners/me', auth, async (req, res) => {
  res.send(req.practitioner);
});

router.get('/practitioners/:id', auth, async (req, res) => {
  try {
    const practitioner = await Practitioner.findOne({ _id: req.params.id, clinicId: req.practitioner.clinicId });
    // .populate('consultations')

    if (!practitioner) {
      return res.status(404).send({ error: 'Practitioner not found' });
    }

    res.send(practitioner);
  } catch (e) {
    res.status(500).send();
  }
});

router.patch('/practitioners/:id', auth, async (req, res) => {
  // Restrict who can change access levels
  if (req.body.accessLevel) {
    if (req.practitioner.accessLevel < 2) {
      return res.status(403).send({ error: 'Forbidden to change access level' });
    }

    if (req.body.accessLevel > req.practitioner.accessLevel) {
      return res.status(403).send({ error: 'Forbidden to increase access above own level' });
    }
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
    'profession',
    'jobLevel',
    'accessLevel',
    'clinicId',
    'password'
  ];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(404).send({ error: 'At least one property in object is invalid for updating!' });
  }

  try {
    const practitioner = await Practitioner.findOne({ _id: req.params.id, clinicId: req.practitioner.clinicId });

    if (!practitioner) {
      return res.status(404).send({ error: 'Practitioner not found' });
    }

    if (!(req.practitioner.accessLevel > 1 || practitioner.id === req.practitioner.id)) {
      return res.status(403).send({ error: 'Forbidden to update details for this practitioner' });
    }

    updates.forEach((update) => (practitioner[update] = req.body[update]));
    await practitioner.save();
    res.send(practitioner);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

router.delete('/practitioners/:id', auth, async (req, res) => {
  if (req.practitioner.accessLevel < 3) {
    return res.status(403).send({ error: 'Forbidden to delete' });
  }

  try {
    const practitioner = await Practitioner.findOneAndDelete({
      _id: req.params.id,
      clinicId: req.practitioner.clinicId
    });

    if (!practitioner) {
      return res.status(404).send({ error: 'Practitioner not found' });
    }

    res.send(practitioner);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

module.exports = router;
