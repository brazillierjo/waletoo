const mongoose = require('mongoose')

mongoose.connect(`${process.env.MONGODB_URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
    .then(() => console.log('Connecté à la base données MongoDB'))
    .catch((err) => console.log('Erreur de connexion à MongoDB : ', err))