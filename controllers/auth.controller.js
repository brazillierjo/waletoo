const UserModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const { signUpErrors, signInErrors } = require('../utils/errors.utils')
const { OAuth2Client } = require('google-auth-library')

const client = new OAuth2Client('292678622440-hmlr7qt1eicombg3lkiqbsmt5pg5n9dv.apps.googleusercontent.com')

const jwtExpire = 3 * 23 * 60 * 60 * 1000
const createToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_SECRET, {
        expiresIn: jwtExpire
    })
}

module.exports.signUp = async (req, res) => {
    const { email, password, firstname, lastname } = req.body

    try {
        const user = await UserModel.create({ email, password, firstname, lastname })
        const token = createToken(user._id)
        res.cookie('jwt', token, { httpOnly: true, jwtExpire })
        res.status(201).json({ user: user._id })
    }
    catch (err) {
        const errors = signUpErrors(err)
        res.status(200).send({ errors })
    }
}

module.exports.signIn = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await UserModel.login(email, password)
        const token = createToken(user._id)
        res.cookie('jwt', token, { httpOnly: true, jwtExpire })
        res.status(200).json({ user: user._id })
    } catch (err) {
        const errors = signInErrors(err)
        res.status(200).json({ errors })
    }
}

module.exports.logout = (req, res) => {
    res.status(202).clearCookie('jwt').send('Token JWT effacé')
}


// GOOGLE
module.exports.loginWithGoogle = (req, res) => {
    const { tokenGoogle } = req.body
    client.verifyIdToken({
        idToken: tokenGoogle, audience: '292678622440-hmlr7qt1eicombg3lkiqbsmt5pg5n9dv.apps.googleusercontent.com'
    })
        .then((res) => {
            const email = res.payload.email
            const firstname = res.payload.familyName
            const lastname = res.payload.givenName
            const userExist = UserModel.findOne({ email })

            if (userExist) {
                console.log(userExist);
                try {
                    const user = UserModel.login(email, password)
                    const token = createToken(user._id)
                    res.cookie('jwt', token, { httpOnly: true, jwtExpire })
                    res.status(200).json({ user: user._id })
                } catch (err) {
                    res.status(400).json(err)
                }
            } else {
                console.log('else');
                let password = email + process.env.TOKEN_SECRET
                const user = UserModel.create({ email, password, firstname, lastname })
                res.cookie('jwt', token, { httpOnly: true, jwtExpire })
                res.status(201).json({ user: user._id })

                try {
                    const user = UserModel.create({ email, password, firstname, lastname })
                    const token = createToken(user._id)
                    res.cookie('jwt', token, { httpOnly: true, jwtExpire })
                    res.status(201).json({ user: user._id })
                }
                catch (err) {
                    res.status(400).json(err)
                }
            }
        })
}