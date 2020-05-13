const express = require('express')
const router = new express.Router()
const Consultation = require('../models/consultation.model')

router.post('/api/consultations', async (req, res) => {
    const consultation = new Consultation(req.body);

    try {
        await consultation.save();
        res.status(201).send(consultation)
    } catch (e) {
        res.status(400).send({ error: e.message })
    }
})

// GET /consultations?patientId=125689
// GET /consultations?casefileId=125689
// GET /consultations?practitionerId=125689
// GET /consultations?number=1
// GET /consultations?limit=10&skip=10
// GET /consultations?sortBy=createdAt:desc
router.get('/api/consultations', async (req, res) => {
    const match = {}
    const sort = {}

    if (req.query.patientId) {
        match.patientId = req.query.patientId
    }

    if (req.query.casefileId) {
        match.casefileId = req.query.casefileId
    }

    if (req.query.practitionerId) {
        match.practitionerId = req.query.practitionerId
    }

    if (req.query.number) {
        match.number = req.query.number
    }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = (parts[1] === 'desc') ? -1 : 1;
    }

    try {
        const consultations = await Consultation.find(match, null, {
            limit: parseInt(req.query.limit),
            skip: parseInt(req.query.skip),
            sort
        });
        res.send(consultations)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/api/consultations/:id', async (req, res) => {
    try {
        const consultation = await Consultation.findOne({ _id: req.params.id })

        if (!consultation) {
            return res.status(404).send({ error: "Consultation not found" })
        }
       
        res.send(consultation)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/api/consultations/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['patientId', 'casefileId', 'date', 'number', 'practitionerId', 'subjectiveAssessment', 'objectiveAssessment', 'treatments', 'plans']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(404).send({ error: "At least one property in object is invalid for updating!" });
    }

    try {
        const consultation = await Consultation.findOne({ _id: req.params.id })

        if (!consultation) {
            return res.status(404).send({ error: "Consultation not found" });
        }

        updates.forEach(update =>  consultation[update] = req.body[update])
        await consultation.save();
        res.send(consultation);
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
})

router.delete('/api/consultations/:id', async (req, res) => {
    try {
        const consultation = await Consultation.findOneAndDelete({ _id: req.params.id });
        if (!consultation) {
            return res.status(404).send({ error: "Consultation not found" })
        }
        res.send(consultation)
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
})

module.exports = router