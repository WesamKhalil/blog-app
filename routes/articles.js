const express = require('express')
const router = express.Router()
const Article = require('../models/article.js')

router.get('/new', (req, res) => {
    res.render('articles/new', {article: new Article()})
})

router.get('/edit/:id', async (req, res) => {
    const article = await Article.findById(req.params.id)
    res.render('articles/edit', {article})
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

router.put('/:id', async (req, res) => {
    const article = await Article.findByIdAndUpdate(req.params.id, req.body)
    try {
        res.redirect('articles/' + article.slug)
    } catch(err) {  
        res.render('articles/new', {article})
    }
})


router.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})


const saveAndRedirect = (path, article) => {
    return async (req, res) => {
        try {
            res.redirect('articles/' + article.slug)
        } catch(err) {  
            res.render('articles/' + path, {article})
        }
    }
}

module.exports = router