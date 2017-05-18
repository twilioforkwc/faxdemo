var mongoose = require('mongoose');
var User = mongoose.model('User');
var config = require('../config.js');
var request = require('request');
var RestClient = require('node-rest-client').Client;

/**
 * Receive a FAX
 * @param req
 * @param res
 */
exports.receive = function (req, res) {
  console.log('receive function called.');
  var hostname = req.headers.host;
  var protocol = req.connection.encrypted ? 'https://' : 'http://';
  var result = '<?xml version="1.0" encoding="UTF-8"?>';
  result += '<Response>';
  result += '<Receive action="'+protocol+hostname+'/api/fax/receiveAction" method="POST" />';
  result += '</Response>';
  res.set('Content-Type', 'text/xml');
  res.status(200).send(result);
};

/**
 * Receive action webhook
 *
 * @param req
 * @param res
 */
exports.receiveAction = function (req, res) {
  console.log('receiveAction function called.');
  var faxSid = req.body.FaxSid || '';
  var from = req.body.From || '';
  var to = req.body.To || '';
  var faxStatus = req.body.FaxStatus || '';
  var numPages = req.body.NumPages || '';
  var mediaUrl = req.body.MediaUrl || '';
  var errorCode = req.body.ErrorCode || '';
  var errorMessage = req.body.Error || '';
  var message = 'faxSid:'+faxSid+'\n';
  message += 'from:'+from+'\n';
  message += 'to:'+to+'\n';
  message += 'faxStatus:'+faxStatus+'\n';
  message += 'numPages:'+numPages+'\n';
  message += 'mediaUrl:'+mediaUrl+'\n';
  message += 'errorCode:'+errorCode+'\n';
  message += 'errorMessage:'+errorMessage;
  console.log(message);
  res.status(200).send();
};
