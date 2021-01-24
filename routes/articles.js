const express = require('express')
const router = express.Router()

router.get('/new', (req, res) => {
    res.render('articles/new')
})

router.post('/', (req, res) => {
    res.render('articles/index', {articles})
})

module.exports = router