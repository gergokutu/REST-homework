const Sequelize = require('sequelize')
const databaseUrl = process.env.DATABASE_URL || 'postgres://postgres:password@localhost:5432/postgres'
const db = new Sequelize(databaseUrl)

const Movie = db.define(
  'movie',
  {
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    yearOfRelease: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    synopsis: {
      type: Sequelize.STRING,
      allowNull: false
    },
  },
  { tableName: 'movies', timestamps: false }
)

db
  .sync({force: true})
  .then(() => Movie.truncate())
  .then(() => Promise.all([
    Movie.create({ title: 'Movie1', yearOfRelease: 1984, synopsis: 'Once upon a time...' }),
    Movie.create({ title: 'Movie2', yearOfRelease: 1985, synopsis: 'Once upon a time...' }),
    Movie.create({ title: 'Movie3', yearOfRelease: 1986, synopsis: 'Once upon a time...' })
  ]))
  .catch(console.error)

  const express = require('express')
  const bodyParser = require('body-parser')
  const app = express()
  const port = process.env.PORT || 3000
  
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  
  app.post(
    '/',
    (req, res, next) => {
      Movie
        .findOne({ where: { title: req.body.title }})
        .then((movie) => {
          if ((movie)) {
            res.status(403).send("Title already used.")
          } else {
            return Movie
              .create(req.body)
              .then((newMovie) => res.send((newMovie)))
          }
        })
        .catch(next)
    }
  )
  
  app.get('/collections', (req, res, next) => {
    Movie.findAll()
        .then(movies => {
            res.json(movies)
        })
        .catch(next)
  })
  
  app.get('/:id', (req, res, next) => {
    Movie.findOne({where: {id: req.params.id}})
        .then(movie => {
            if (movie) {
                return res.json(movie)
            }
            return res.status(404).end()
        })
        .catch(next)
  })

  app.patch('/:id', (req, res, next) => {
    Movie.findOne({where: {id: req.params.id}})
        .then(movie => {
            if (movie) {
                return movie.update(req.body)
                    .then(movie => res.json(movie))
            }
            return res.status(404).end()
        })
        .catch(next)
  })

  app.delete('/:id', (req, res, next) => {
    Movie.destroy({where: {id: req.params.id}})
        .then(movie => {
            if (movie) {
                res.send(`Movie with Id:${req.params.id} deleted from the database`)
            }
            res.status(404).send("Movie does not exist in the db.")
        })
        .catch(next)
  })
  
  app.listen(port, () => console.log("listening on port " + port))

