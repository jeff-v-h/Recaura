const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  address: { type: String, required: true, trim: true },
  address2: { type: String, trim: true },
  city: { type: String, required: true, trim: true },
  country: { type: String, required: true, trim: true },
  postcode: { type: String, trim: true },
  phone: { type: String, trim: true }
});

const clinicSchema = new mongoose.Schema(
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

clinicSchema.virtual('practitioners', {
  ref: 'Practitioner',
  localField: '_id',
  foreignField: 'clinicId'
});

clinicSchema.virtual('patients', {
  ref: 'Patient',
  localField: '_id',
  foreignField: 'clinicId'
});

clinicSchema.methods.toJSON = function () {
  const clinic = this;
  const clinicObject = clinic.toObject();

  delete clinicObject.__v;
  delete clinicObject._id;
  delete clinicObject.updatedAt;
  delete clinicObject.createdAt;
  clinicObject.locations.forEach((l) => {
    delete l._id;
  });

  return clinicObject;
};

const Clinic = mongoose.model('clinic', clinicSchema);

module.exports = Clinic;
