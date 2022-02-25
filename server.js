const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const app = express()
const articleRouter = require('./routes/articles')
const loginRouter = require('./routes/login')
const methodOverride = require('method-override')

mongoose.connect('mongodb://localhost/Gamex', { useNewUrlParser: true })

app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'ejs')
app.use('/', loginRouter)
app.use('/articles', articleRouter)
app.use('/articles', express.static(require('path').join(__dirname,'/public')))

app.use(express.static(require('path').join(__dirname,'/public'))); 

app.get('/', async (req, res) => {
    const articles = await Article.find().sort({ 
    createdAt: 'desc' })
    res.render('./articles/index', { articles: articles, user: req.user})
})

app.listen(5000)