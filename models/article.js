const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: String,
    markdown: {type: String, required: true},
    date: {type: Date, default: new Date()}
})

module.exports = mongoose.model('article', articleSchema)