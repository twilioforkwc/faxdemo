var mongoose = require('mongoose');
var User = mongoose.model('User');
var config = require('../config.js');
var request = require('request');
var RestClient = require('node-rest-client');

/**
 * Add a new user data.
 *
 * @param req
 * @param res
 */
exports.addUser = function (req, res, user) {

  user.save(function (err) {
    if (err) {
      console.log('Error Creating User', err);
      res.status(500).json(err);
    } else {
      res.status(200).send('User added.');
    }
  });
};
