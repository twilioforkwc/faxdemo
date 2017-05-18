# 2FA by fax Demo Site - 2FA Verification

A simple NodeJS and AngularJS implementation of a website that uses Authy to protect all assets within a folder.  Additionally, we have a simple Fax Verification demo website.
This app uses MongoDB as a data store.  You may have to install that as well and make sure it is up and running.

#### 2FA Demo
- OneCode (Fax)

### Setup
- Clone this repo
- Run `npm install`
- Register for a [Twilio Account](https://www.twilio.com/).
- Buy a number for sending Fax and save it in your demo.env
- Load the demo.env environmental variables into your shell `source demo.env`
- Check and make sure MongoDB is up and running
- Run `nodemon .` or `node .` from the cloned repo to run the app

### License
- MIT
