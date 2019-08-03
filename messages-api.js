const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const parserMiddleware = bodyParser.json()
app.use(parserMiddleware)

app.post('/messages', (req, res, next) => {
  if (req.body.text === undefined || req.body.text === "") {
    res.status(400).send({message: 'Text property is missing or empty'})
  }
  res.json({message: req.body.text})
  .catch(next)
})

app.get('/', (req, res) => res.send('Server is up and running'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

