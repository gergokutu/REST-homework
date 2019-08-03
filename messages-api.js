const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const parserMiddleware = bodyParser.json()
app.use(parserMiddleware)

const reqCount = []

const requestCountingMiddleware = (req, res, next) => {
  if (reqCount.length >= 5) {
    res.status(429).send('Too many requests')
  } else {
      next()
  }
}

app.use(requestCountingMiddleware)

app.post('/messages', requestCountingMiddleware, (req, res, next) => {
  reqCount.push(req.body)
  console.log('req test:', reqCount)
  if (req.body.text === undefined || req.body.text === "") {
    res.status(400).send({ message: 'Text property is missing or empty' })
  } else {
    res.json({ message: req.body.text })
  }
})

app.get('/', (req, res) => res.send('Server is up and running'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

