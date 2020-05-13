const express = require('express')
const router = new express.Router()
const Patient = require('../models/patient.model')

router.post('/api/patients', async (req, res) => {
    const patient = new Patient(req.body);

    try {
        await patient.save();
        res.status(201).send(patient)
    } catch (e) {
        res.status(400).send({ error: e.message })
    }
})

// GET /patients?gender=male
// GET /patients?limit=10&skip=10
// GET /patients?sortBy=createdAt:desc
router.get('/api/patients', async (req, res) => {
    const match = {}
    const sort = {}

    if (req.query.gender) {
        match.gender = req.query.gender
    }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = (parts[1] === 'desc') ? -1 : 1;
    }

    try {
        const patients = await Patient.find(match, null, {
            limit: parseInt(req.query.limit),
            skip: parseInt(req.query.skip),
            sort
        });
        res.send(patients)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/api/patients/:id', async (req, res) => {
    try {
        const patient = await Patient.findOne({ _id: req.params.id })
            // .populate('casefiles')

        if (!patient) {
            return res.status(404).send({ error: "Patient not found" })
        }
       
        res.send(patient)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/api/patients/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['honorific', 'firstName', 'lastName', 'dob', 'email', 'countryCode', 'homePhone', 'mobilePhone', 'gender', 'occupation', 'casefiles']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(404).send({ error: "At least one property in object is invalid for updating!" });
    }

    try {
        const patient = await Patient.findOne({ _id: req.params.id })

        if (!patient) {
            return res.status(404).send({ error: "Patient not found" });
        }

        updates.forEach(update =>  patient[update] = req.body[update])
        await patient.save();
        res.send(patient);
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
})

router.delete('/api/patients/:id', async (req, res) => {
    try {
        const patient = await Patient.findOne({ _id: req.params.id });
        if (!patient) {
            return res.status(404).send({ error: "Patient not found" })
        }
        await patient.remove()
        res.send(patient)
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
})

module.exports = router