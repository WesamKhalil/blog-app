const express = require('express')
const router = express.Router()
const Article = require('../models/article.js')

router.get('/new', (req, res) => {
    res.render('articles/new', {article: new Article()})
})

router.get('/:slug', async (req, res) => {
    const article = await Article.findOne({slug: req.params.slug})
    if(article == null) {
        res.redirect('/')
    } else {
        res.render('articles/show', {article})
    }
})

router.post('/', async (req, res) => {
    const article = await Article.create(req.body)
    try {
        res.redirect('articles/' + article.slug)
    } catch(err) {  
        res.render('articles/new', {article})
    }
})

router.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id)
})

module.exports = router