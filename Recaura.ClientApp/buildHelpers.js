var path = require("path");

exports.pathHelper = function() {
  const localPath = Array.prototype.slice.call(arguments, 0);
  const _root = path.resolve(__dirname);
  const relativePath = [_root].concat(localPath);
  return path.join.apply(path, relativePath);
};

exports.root = function(args) {
  const _root = path.resolve(__dirname, "..");
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [_root].concat(args));
};

exports.getVendorName = function(env) {
  return env.public ? "publicVendor" : "vendor";
};
