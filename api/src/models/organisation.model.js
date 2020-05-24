const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  address1: { type: String, required: true, trim: true },
  address2: { type: String, trim: true },
  city: { type: String, required: true, trim: true },
  country: { type: String, required: true, trim: true },
  postcode: { type: String, trim: true },
  phone: { type: String, trim: true }
});

const organisationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    locations: [locationSchema],
    isActive: { type: Boolean, default: true }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

organisationSchema.virtual('practitioners', {
  ref: 'Practitioner',
  localField: '_id',
  foreignField: 'organisationId'
});

organisationSchema.virtual('patients', {
  ref: 'Patient',
  localField: '_id',
  foreignField: 'organisationId'
});

organisationSchema.methods.toJSON = function () {
  const organisation = this;
  const organisationObject = organisation.toObject();

  delete organisationObject.__v;
  delete organisationObject._id;
  delete organisationObject.updatedAt;
  delete organisationObject.createdAt;
  organisationObject.locations.forEach((l) => {
    delete l._id;
  });

  return organisationObject;
};

const Organisation = mongoose.model('Organisation', organisationSchema);

module.exports = Organisation;
