const express = require('express')
const Article = require('./../models/article')
const router = express.Router()
const User = require('./../models/users')

router.use(express.static(require('path').join(__dirname,'/public')))


router.get('/new', checkAuthenticated , (req, res) => {
    let newArticle = new Article()
    newArticle.createdByID = req.user.id
    newArticle.createdByName = req.user.name
    res.render('./articles/new', { article: newArticle, user: req.user })
})

router.get('/edit/:id', checkAuthenticated , async (req, res) => {
    const article = await Article.findById(req.params.id)
    if(req.user.id != article.createdByID){
        res.redirect('/')
    }
    else {
        res.render('./articles/edit', { article: article, user: req.user })
    }
})

router.get('/:id', async (req, res) => {
    const article = await Article.findById(req.params.id)
    if (article == null) {
        res.redirect('/')
    }
    else{
        res.render('articles/show', { article: article, user: req.user })
    }
})

router.post('/', checkAuthenticated, async (req, res) => {
    let article = new Article({
        title: req.body.title,
        description: req.body.description,
        banner: req.body.banner,
        createdByID: req.user.id,
        createdByName: req.user.name
    })
    try{
        article = await article.save()
        res.redirect(`/articles/${article.id}`)
    } catch (e) {
        res.render('articles/new', { article: article, user: req.user })
    }
})

router.put("/:id" , async (req, res) => {
    let article = await Article.findById(req.params.id)
    article.title = req.body.title
    article.description = req.body.description
    article.banner = req.body.banner

    try{
        article = await article.save()
        res.redirect(`/articles/${article.id}`)
    } catch (e) {
        console.log(e)
        res.render('articles/edit', { article: article, user: req.user })
    }
})

router.delete('/:id', checkAuthenticated , async (req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/login')
}

module.exports = router