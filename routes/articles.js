const express = require('express')
const router = express.Router()
const Article = require('../models/article.js')

//Directs you to page to create new post.
router.get('/new', (req, res) => {
    res.render('articles/new', {article: new Article()})
})

//Directs you to page where you edit specific posts.
router.get('/edit/:id', async (req, res) => {
    const article = await Article.findById(req.params.id)
    res.render('articles/edit', {article})
})

//Directs you to page where you view an individual post.
router.get('/:id', async (req, res) => {
    const article = await Article.findOne({_id: req.params.id})
    if(article == null) {
        res.redirect('/')
    } else {
        res.render('articles/show', {article})
    }
})

//Handles adding extra posts to mongodb.
router.post('/', (req, res, next) => {
    req.article = new Article()
    next()
}, saveAndRedirect('new'))

//Handles updating a specific post in mongodb.
router.put('/:id', async (req, res, next) => {
    req.article = await Article.findById(req.params.id)
    next()
    }, saveAndRedirect('edit'))

//Handles deleting a specific post from mongodb.
router.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

//Middleware responsible for both adding and updating posts, since they both had similar code they share the same middleware.
function saveAndRedirect(path) {
    return async (req, res) => {
        let article = req.article
        article.title = req.body.title
        article.description = req.body.description
        article.markdown = req.body.markdown
        try {
            article = await article.save()
            res.redirect('/articles/' + article.id)
        } catch(err) {  
            res.render('articles/' + path, {article})
        }
    }
}

module.exports = router