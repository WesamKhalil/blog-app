const express = require('express')
const app = express()
const articleRouter = require('./routes/articles.js')
const mongoose = require('mongoose')
const Article = require('./models/article.js')

const mongoUrl = 'mongodb+srv://FCC:' + process.env.PW + '@cluster0.1mvbk.mongodb.net/blog?retryWrites=true&w=majority'
mongoose.connect(mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))

app.get('/', async (req, res) => {
    const articles = await Article.find().sort({date: 'desc'})
    res.render('articles/index', {articles})
})

app.use('/articles', articleRouter)

app.listen(process.env.PORT || 3000, () => {
    console.log('listening on port ' + (process.env.PORT || 3000))
})