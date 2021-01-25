const mongoose = require('mongoose')
const marked = require('marked')
const createDomPurifier = require('dompurify')
const { JSDOM } = require('jsdom')
const domPurify = createDomPurifier(new JSDOM().window)
const slugify = require('slugify')

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
         required: true
    },
    description: {
        type: String
    },
    markdown: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: new Date()
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    sanitisedHTML: {
        type: String,
        required: true
    }
})

articleSchema.pre('validate', function(next) {
    if(this.title) {
        this.slug = slugify(this.title, {lower: true, strict: true})
    }
    if(this.markdown) {
        this.sanitisedHTML = domPurify.sanitize(marked(this.markdown))
    }
    next()
})

module.exports = mongoose.model('article', articleSchema)