const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const parserMiddleware = bodyParser.json()
app.use(parserMiddleware)

app.post('/messages', (req, res, next) => res.json(req.body.text))

app.get('/', (req, res) => res.send('Server is up and running'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

