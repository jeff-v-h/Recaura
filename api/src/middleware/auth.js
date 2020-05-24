const jwt = require('jsonwebtoken');
const Practitioner = require('../models/practitioner.model');
const keys = require('../helpers/keys');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, keys.JWT_SECRET);
    const practitioner = await Practitioner.findOne({ _id: decoded._id, 'tokens.token': token });

    if (!practitioner) {
      throw new Error();
    }

    req.token = token;
    req.practitioner = practitioner;
    next();
  } catch (e) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

module.exports = auth;
