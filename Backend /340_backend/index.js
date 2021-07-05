/* 
Citing this becuase it helped a lot:
https://blog.logrocket.com/node-js-express-js-mysql-rest-api-example/ 
*/
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
require('dotenv').config()

const path = require('path')

const port = process.env.PORT || 3000

const playersRouter = require('./routes/players')
const gamesRouter = require('./routes/games')
const leaguesRouter = require('./routes/leagues')
const teamsRouter = require('./routes/teams')
const rosterRouter = require('./routes/rosters')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(cors())

app.use(express.static(path.resolve(__dirname, 'build')));

app.use('/api/players', playersRouter)
app.use('/api/games', gamesRouter)
app.use('/api/leagues', leaguesRouter)
app.use('/api/teams', teamsRouter)
app.use('/api/rosters', rosterRouter)

/*To handle routing*/
app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  console.error(err.message, err.stack)
  res.status(statusCode).json({'message': err.message})

  return
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})