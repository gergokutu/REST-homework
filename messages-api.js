// const rateLimit = require("express-rate-limit");
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const parserMiddleware = bodyParser.json()
app.use(parserMiddleware)

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 5, // limit each IP to 5 requests per windowMs
//   message:
//     "Too many accounts created from this IP, please try again after an 15 minutes"
// });

// app.use(limiter);
const reqCount = []

app.post('/messages', (req, res, next) => {
  if (req.body.text === undefined || req.body.text === "") {
    res.status(400).send({ message: 'Text property is missing or empty' })
  }
  if (reqCount.length < 5) {
    reqCount.push(req.body)
    res.json({ message: req.body.text })
  } 
  res.status(429).send('Too many requests')
  .catch(next)
})

app.get('/', (req, res) => res.send('Server is up and running'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

