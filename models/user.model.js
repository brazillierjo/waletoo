const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [isEmail],
        lowercase: true,
        trim: true
    },
    firstname: {
        type: String,
        lowercase: true,
        minlength: 2,
        maxlength: 12
    },
    lastname: {
        type: String,
        lowercase: true,
        minLength: 2,
        maxlength: 12
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        minlength: 6
    },
    profilePicture: {
        type: String,
        default: ""
    }
},
    {
        timestamps: true
    })

// fonction avant sauvegarde dans la base de données
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email })
    if (user) {
        const auth = await bcrypt.compare(password, user.password)
        if (auth) {
            return user
        }
        throw Error('Mot de passe incorrect')
    }
    throw Error('Email incorrect')
}

const UserModel = mongoose.model('user', userSchema)

module.exports = UserModel