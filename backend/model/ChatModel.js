const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    charts : [
        {
            role:String,
            content:String
        }
    ]
},{timestamps:true});

const Model = mongoose.model("Chat",schema);

module.exports = Model;