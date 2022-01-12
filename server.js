const express = require('express')
const routes = require('./routes/routes')
const cookieParser = require('cookie-parser')
const path = require('path')
require('dotenv').config({ path: './config/.env' })
require('./config/db')
const { checkUser, requireAuth } = require('./middleware/auth.middleware')
const app = express()
const cors = require('cors')

const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(cookieParser())

app.use('/api', routes)

app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", function (_, res) {
    res.sendFile(
        path.join(__dirname, "./client/build/index.html"),
        function (err) {
            if (err) {
                res.status(500).send(err);
            }
        }
    );
});

// jwt
app.get('*', checkUser)
app.get('/jwtid', requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id)
})

// HEROKU
// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static('client/build'))
//     app.get('*', function (req, res) {
//         res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
//     })
// }

//server 
app.listen(PORT, () => {
    console.log('Serveur sur le port : ' + PORT)
})