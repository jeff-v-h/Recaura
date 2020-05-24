const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { honorifics, genders } = require('../helpers/utils');

const practitionerSchema = new mongoose.Schema(
  {
    honorific: {
      type: String,
      enum: honorifics,
      default: honorifics[0] // NoTitle
    },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    dob: { type: Date },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Email is invalid');
        }
      }
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      trim: true,
      validate(value) {
        if (value.toLowerCase().includes('password')) {
          throw new Error('Password cannot contain "password".');
        }
        if (!/^(?=.*[A-Za-z])(?=.*\d)$/.test(value)) {
          throw new Error('Password must contain at least one digit and one letter.');
        }
      }
    },
    countryCode: { type: String, trim: true },
    homePhone: { type: String, trim: true },
    mobilePhone: { type: String, trim: true },
    gender: {
      type: String,
      enum: genders,
      default: genders[0] // 'preferNotToSay'
    },
    profession: { type: String, trim: true },
    jobLevel: { type: String, trim: true }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

practitionerSchema.virtual('consultations', {
  ref: 'Consultation',
  localField: '_id',
  foreignField: 'practitionerId'
});

practitionerSchema.methods.toJSON = function () {
  const practitioner = this;
  const practitionerObject = practitioner.toObject();

  delete practitionerObject.createdAt;
  delete practitionerObject.updatedAt;
  delete practitionerObject.__v;
  delete practitionerObject._id;

  return practitionerObject;
};

const Practitioner = mongoose.model('Practitioner', practitionerSchema);

module.exports = Practitioner;
