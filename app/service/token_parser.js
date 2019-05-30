'use strict';

module.exports = function() {
  var parser = {};

  parser.decode = function(token) {
    if (!token) {
      return false;
    }

    var parts = token.split(".");
    if (parts.length >= 2) {
      var body = JSON.parse(atob(parts[1]));

      if (Math.floor(Date.now() / 1000) > body.exp) {
        return false;
      }

      return body;
    } else {
      return false;
    }
  };

  return parser;
};

