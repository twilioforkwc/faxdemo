var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    receiveDate: {type: Date, default: Date.now},
    fax_number: { type: String, required: true},
    status: { type: Number, default: 0}
});

mongoose.model('User', UserSchema);
