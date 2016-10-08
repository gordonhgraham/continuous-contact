module.exports = {
  extends: [
    'ryansobol/browser',
    'ryansobol/es6',
    'ryansobol/jquery',
    'ryansobol/mocha',
    'ryansobol/node'
  ],
  rules: {
    "quotes": ["warn", "backtick"],
    "no-plusplus": 0,
    "no-undefined": 0,
    "max-statements": ["error",15,{"ignoreTopLevelFunctions": true}],
    "no-console": ["error", { "allow": ["warn", "error"] }],
    "id-length": ["error", { "exceptions": ["a","b","i","x","y"] }],
    "arrow-parens": ["error", "as-needed"],
    "brace-style": ["error", "1tbs", { "allowSingleLine": true }],
  }
};
