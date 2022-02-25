require('dotenv').config()
const express = require('express')
const User = require('./../models/users')
const router = express.Router()
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const initializePassport = require('./../passport-config')
const methodOverride = require('method-override')
const Article = require('./../models/article')
router.use(express.urlencoded({ extended: false }))

initializePassport(passport)

router.use(express.static(require('path').join(__dirname,'/public')))
router.use(flash())
router.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000*60*60*3 }
}))
router.use(passport.initialize())
router.use(passport.session())
router.use(methodOverride('_method'))

router.use((req, res, next) => {
    console.log(req.session)
    console.log(req.user)
    next()
})



router.get('/users/:id', checkAuthenticated, async (req, res) => {
    const articles = await Article.find({ createdByID: req.user.id })
    res.render('./../views/showuser', { articles: articles, user: req.user })
})

router.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('./../views/login', { user: req.user })
})

router.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('./../views/register', { user: new User(), error: req.flash('error') })
})


router.post('/login', checkNotAuthenticated, passport.authenticate('local',{
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

router.post('/register', checkNotAuthenticated, async (req, res) => {
    let user = new User({
        email: req.body.email,
        name: req.body.name,
        password: req.body.password
    })
    try{
        if(await User.findOne({ email: user.email }) != null){
            req.flash('error', 'User with that e-mail already exists');
            throw 'email-error'
        }
        if(await User.findOne({ name: user.name } ) != null){
            req.flash('error', 'User with that name already exists');
            throw 'name-error'
        }
        await user.save()
        res.redirect('/login')
    } catch (e) {
        res.redirect('/register')
    }
})

router.delete('/logout', (req, res) => {
    req.logOut();
    res.redirect('/login')
})

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/login')
}
  
function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/')
    }
    next()
}

module.exports = router