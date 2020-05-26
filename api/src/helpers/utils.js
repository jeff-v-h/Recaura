const honorifics = ['NoTitle', 'Mr', 'Mrs', 'Miss', 'Ms', 'Master', 'Mx', 'M', 'Sir', 'Madam', 'Dr', 'Prof'];

const genders = ['preferNotToSay', 'male', 'female', 'other'];

// inactive, normal, admin, master, appAdmin, appMaster
const accessLevel = [0, 1, 2, 3, 4, 5];

function getInitialMatch(user) {
  const match = {};
  if (user.accessLevel < 4) match.clinicId = user.clinicId;
  return match;
}

function getFindByIdMatch(id, user) {
  const match = { _id: id };
  if (user.accessLevel < 4) match.clinicId = user.clinicId;
  return match;
}

module.exports = {
  honorifics,
  genders,
  accessLevel,
  getInitialMatch,
  getFindByIdMatch
};
