const express = require('express')
const app = express()
const articleRouter = require('./routes/articles.js')

const articles = [{
    title: 'working',
    date:  new Date(),
    description: 'Hellow World'
},{
    title: 'working',
    date:  new Date(),
    description: 'Hellow World'
}]

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))

app.use('/articles', articleRouter)

app.get('/', (req, res) => {
    res.render('index', {articles})
})

app.listen(process.env.PORT || 3000, () => {
    console.log('listening on port ' + (process.env.PORT || 3000))
})