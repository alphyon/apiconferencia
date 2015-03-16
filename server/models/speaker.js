/**
 * Created by alphyon on 03-15-15.
 */
//importando paquetes
var mongoose = require('mongoose');
var schema = mongoose.Schema;

//atributos del conferencista
var SpeakerSchema = new schema({
    name:       {type:String,default: ''},
    company:    {type:String,default: ''},
    title:      {type:String,default: ''},
    description:{type:String,default: ''},
    picture:    {type:String,default: ''},
    schedule:   {type:String,default: ''},
    createdOn:  {type:Date,default: Date.now}
});

module.exports = mongoose.model('Speaker',SpeakerSchema);