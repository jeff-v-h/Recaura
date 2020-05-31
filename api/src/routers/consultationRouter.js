const express = require('express');
const router = new express.Router();
const Consultation = require('../models/consultation.model');
const auth = require('../middleware/auth');
const { getInitialMatch, getFindByIdMatch } = require('../helpers/utils');

router.post('/consultations', auth, async (req, res) => {
  const data = req.body;
  if (req.practitioner.accessLevel < 4) {
    data.clinicId = req.practitioner.clinicId;
    data.practitionerId = req.practitioner.id;
  }

  const consultation = new Consultation(data);

  try {
    await consultation.save();
    res.status(201).send(consultation);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

// GET /consultations?patientId=125689
// GET /consultations?casefileId=125689
// GET /consultations?practitionerId=125689
// GET /consultations?limit=10&skip=10
// GET /consultations?sortBy=createdAt:desc
router.get('/consultations', auth, async (req, res) => {
  const match = getInitialMatch(req.practitioner);
  const sort = {};

  if (req.query.patientId) match.patientId = req.query.patientId;

  if (req.query.casefileId) match.casefileId = req.query.casefileId;

  if (req.query.practitionerId) match.practitionerId = req.query.practitionerId;

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(':');
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
  }

  try {
    const consultations = await Consultation.find(match, null, {
      limit: parseInt(req.query.limit),
      skip: parseInt(req.query.skip),
      sort
    });
    res.send(consultations);
  } catch (e) {
    res.status(500).send();
  }
});

router.get('/consultations/:id', auth, async (req, res) => {
  try {
    const consultation = await Consultation.findOne(getFindByIdMatch(req.params.id, req.practitioner)).populate(
      'practitioner',
      'firstName lastName'
    );
    // .populate('patient', 'gender firstName lastName dob occupation')

    if (!consultation) {
      return res.status(404).send({ error: 'Consultation not found' });
    }

    res.send(consultation);
  } catch (e) {
    res.status(500).send();
  }
});

router.patch('/consultations/:id', auth, async (req, res) => {
  const { clinicId, practitionerId } = req.body;
  if (clinicId && clinicId != req.practitioner.clinicId && req.practitioner.accessLevel < 4) {
    return res.status(403).send({ error: 'Forbidden to change clinicId' });
  }

  if (practitionerId && req.practitioner.accessLevel < 2) {
    return res.status(403).send({ error: 'Forbidden to change practitionerId' });
  }

  const updates = Object.keys(req.body);
  const allowedUpdates = [
    'patientId',
    'casefileId',
    'date',
    'practitionerId',
    'subjectiveAssessment',
    'objectiveAssessment',
    'treatments',
    'plans',
    'clinicId'
  ];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'At least one property in object is invalid for updating!' });
  }

  try {
    const consultation = await Consultation.findOne(getFindByIdMatch(req.params.id, req.practitioner));

    if (!consultation) {
      return res.status(404).send({ error: 'Consultation not found' });
    }

    updates.forEach((update) => (consultation[update] = req.body[update]));
    await consultation.save();
    res.send(consultation);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

router.delete('/consultations/:id', auth, async (req, res) => {
  if (req.practitioner.accessLevel < 2) {
    return res.status(403).send({ error: 'Forbidden to delete consultation' });
  }

  try {
    const consultation = await Consultation.findOneAndDelete(getFindByIdMatch(req.params.id, req.practitioner));
    if (!consultation) {
      return res.status(404).send({ error: 'Consultation not found' });
    }
    res.send(consultation);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

module.exports = router;
