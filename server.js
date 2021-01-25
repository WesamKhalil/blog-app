const express = require('express')
const app = express()
const articleRouter = require('./routes/articles.js')
const mongoose = require('mongoose')
const Article = require('./models/article.js')
const methodOverride = require('method-override')

//Connecting to mongodb atlas.
const mongoUrl = 'mongodb+srv://FCC:' + process.env.PW + '@cluster0.1mvbk.mongodb.net/blog?retryWrites=true&w=majority'
mongoose.connect(mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false})

//Set the template engine, form data and method override.
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))

//Handles requests to the index page
app.get('/', async (req, res) => {
    const articles = await Article.find().sort({date: 'desc'})
    res.render('articles/index', {articles})
})

//Where the routes/articles.js routes are appended to
app.use('/articles', articleRouter)

app.listen(process.env.PORT || 3000, () => {
    console.log('listening on port ' + (process.env.PORT || 3000))
})