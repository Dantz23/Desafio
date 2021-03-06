const express = require('express')
const nunjucks = require('nunjucks')
const app = express()

nunjucks.configure('views', {
  autoscape: true,
  express: app,
  watch: true
})

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'njk')

const verificar = (req, res, next) => {
  const { age } = req.query

  if (!age) {
    return res.redirect('/')
  } else return next()
}

app.get('/', (req, res) => {
  return res.render('form')
})

app.get('/maior', verificar, (req, res) => {
  const { age } = req.query

  return res.render('maior', { age })
})

app.get('/menor', verificar, (req, res) => {
  const { age } = req.query

  return res.render('menor', { age })
})

app.post('/check', (req, res) => {
  const { age } = req.body

  if (age >= 18) {
    return res.redirect(`/maior?age=${age}`)
  } else {
    return res.redirect(`/menor?age=${age}`)
  }
})

app.listen(3001)
