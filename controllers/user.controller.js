const UserModel = require('../models/user.model')
const ObjectID = require('mongoose').Types.ObjectId
const fs = require('fs')
const { promisify } = require('util')
const pipeline = promisify(require('stream').pipeline)
const { uploadImageErrors } = require('../utils/errors.utils')

module.exports.userInfo = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID inconnu : ' + req.params.id)

    UserModel.findById(req.params.id, (err, docs) => {
        if (!err) res.send(docs)
        else console.log('ID inconnu : ' + err);
    }).select('-password')
}

module.exports.updateUser = async (req, res) => {
    const dataReq = req.body

    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID inconnu : ' + req.params.id)

    try {
        await UserModel.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: dataReq
            },
            { new: true, upsert: true, setDefaultsOnInsert: true },
            (err, docs) => {
                if (!err) return res.send(docs)
                if (err) return res.status(500).send({ message: err })
            }).select('-password')
    } catch (err) {
        if (err) return res.status(500).json({ message: err })
    }
}

module.exports.deleteUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID inconnu : ' + req.params.id)

    try {
        await UserModel.deleteOne({ _id: req.params.id }).exec()
        res.status(200).json({ message: "Compte supprimé avec succès" })
    } catch (err) {
        return res.status(500).json({ message: err }
        )
    }
}

module.exports.uploadProfilePicture = async (req, res) => {
    try {
        if (req.file.detectedMimeType !== "image/jpg" && req.file.detectedMimeType !== "image/png" && req.file.detectedMimeType !== "image/jpeg") {
            throw Error("invalid file")
        }
        if (req.file.size > 1000000) {
            throw Error("max size")
        }
    }
    catch (err) {
        const errors = uploadImageErrors(err)
        return res.status(201).json({ errors })
    }

    const fileName = req.body.lastname + ".jpg"

    await pipeline(
        req.file.stream,
        fs.createWriteStream(`${__dirname}/../client/public/docs/profils/${fileName}`)
    )

    try {
        await UserModel.findByIdAndUpdate(
            req.body.id,
            { $set: { profilePicture: "./docs/profils/" + fileName } },
            { new: true, upsert: true, setDefaultsOnInsert: true },
            (err, docs) => {
                if (!err) return res.send(docs)
                else return res.status(500).send({ message: err })
            }
        )
    }
    catch (err) {
        return res.status(500).send({ message: err })
    }
}