const Sequelize = require('sequelize')
const databaseUrl = process.env.DATABASE_URL || 'postgres://postgres:password@localhost:5432/postgres'
const db = new Sequelize(databaseUrl)

const Movie = db.define(
  'movie',
  {
    title: Sequelize.STRING,
    yearOfRelease: Sequelize.INTEGER,
    synopsis: Sequelize.STRING,
  }
)

db
  .sync() // moved out from sync() » { force: true }
  .then(() => console.log('Database connected'))
  .then(() => Promise.all([ // Insert 3 new rows
    Movie.create({ title: 'Movie1', yearOfRelease: 1984, synopsis: 'Once upon a time...' }),
    Movie.create({ title: 'Movie2', yearOfRelease: 1985, synopsis: 'Once upon a time...' }),
    Movie.create({ title: 'Movie3', yearOfRelease: 1986, synopsis: 'Once upon a time...' })
  ]))
  .catch(console.error)

