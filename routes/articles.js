const express = require('express')
const router = express.Router()
const Article = require('../models/article.js')

router.get('/new', (req, res) => {
    res.render('articles/new', {article: new Article()})
})

router.get('/:id', async (req, res) => {
    const article = await Article.findById(req.params.id)
    if(article == null) {
        res.redirect('/')
    } else {
        res.render('articles/show.ejs', {article})
    }
})

router.post('/', async (req, res) => {
    const article = await Article.create(req.body)
    try {
        res.redirect('articles/' + article.id)
    } catch(err) {
        res.render('articles/new', {article})
    }
})

module.exports = router