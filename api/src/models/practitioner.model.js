const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { honorifics, genders, accessLevel } = require('../helpers/utils');
const keys = require('../helpers/keys');

const practitionerSchema = new mongoose.Schema(
  {
    honorific: {
      type: String,
      enum: honorifics,
      default: honorifics[0] // NoTitle
    },
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
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
        if (!/^(?=.*[A-Za-z])(.*[0-9].*)$/.test(value)) {
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
    jobLevel: { type: String, trim: true },
    clinicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Clinic', required: true },
    accessLevel: { type: Number, min: accessLevel[0], max: accessLevel[accessLevel.length - 1], default: 1 },
    tokens: [
      {
        token: {
          type: String,
          required: true
        }
      }
    ]
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

//#region middleware
practitionerSchema.virtual('clinic', {
  ref: 'Clinic',
  localField: 'clinicId',
  foreignField: '_id',
  justOne: true
});

practitionerSchema.virtual('consultations', {
  ref: 'Consultation',
  localField: '_id',
  foreignField: 'practitionerId'
});

practitionerSchema.methods.toJSON = function () {
  const practitioner = this;
  const practitionerObject = practitioner.toObject();

  delete practitionerObject.password;
  delete practitionerObject.tokens;
  delete practitionerObject.createdAt;
  delete practitionerObject.updatedAt;
  delete practitionerObject.__v;
  delete practitionerObject._id;

  return practitionerObject;
};

practitionerSchema.methods.generateAuthToken = async function () {
  const practitioner = this;
  const token = jwt.sign({ _id: practitioner._id.toString() }, keys.JWT_SECRET);

  // add token to practitioner
  practitioner.tokens = practitioner.tokens.concat({ token });
  await practitioner.save();

  return token;
};

// Methods on model
practitionerSchema.statics.findByCredentials = async (email, password) => {
  const loginErrorMsg = 'Unable to login';
  const practitioner = await Practitioner.findOne({ email });

  if (!practitioner) {
    throw new Error(loginErrorMsg);
  }

  const isMatch = await bcrypt.compare(password, practitioner.password);

  if (!isMatch) {
    throw new Error(loginErrorMsg);
  }

  return practitioner;
};

// Hash the plain text password before saving
practitionerSchema.pre('save', async function (next) {
  const practitioner = this;

  if (practitioner.isModified('password')) {
    // second argument is number of rounds to hash
    practitioner.password = await bcrypt.hash(practitioner.password, 8);
  }

  next();
});
//#endregion

const Practitioner = mongoose.model('Practitioner', practitionerSchema);

module.exports = Practitioner;
