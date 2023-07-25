const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const practiceSchema = new Schema({

    description: {type: String, required: true},
    status: {type: String, enum: ['completed', 'not completed']},
    duration: {type: Number, required: true}, 
    name: {type: String, ref: 'user', required: true}

});
const Practice = mongoose.model('practice', practiceSchema);
module.exports = Practice;