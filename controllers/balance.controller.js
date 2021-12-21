const BalanceModel = require('../models/balance.model')
const ObjectID = require('mongoose').Types.ObjectId

module.exports.postUserBalance = async (req, res) => {
    const data = req.body

    try {
        const balance = await BalanceModel.create(data)
        res.status(201).json(balance)
    }
    catch (err) {
        res.status(200).json(err)
    }
}

module.exports.getUserBalance = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID inconnu : ' + req.params.id)

    BalanceModel.find({ _id: req.params.id }, (err, docs) => {
        if (!err) res.send(docs)
        else console.log('ID inconnu : ' + err);
    }).select('-__v')
}

module.exports.updateBalance = async (req, res) => {
    const data = req.body

    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID inconnu : ' + req.params.id)

    try {
        await BalanceModel.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: data
            },
            { new: true, upsert: true, setDefaultsOnInsert: true },
            (err, docs) => {
                if (!err) return res.send(docs)
                if (err) return res.status(500).send({ message: err })
            }).select('-__v')
    } catch (err) {
        if (err) return res.status(500).json({ message: err })
    }
}

module.exports.deleteBalance = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown : ' + req.params.id);

    BalanceModel.findOneAndRemove({ _id: req.params.id }, (err, docs) => {
        if (!err) res.send('Fichier bien supprimé.');
        else console.log('Erreur dans la suppression : ' + err);
    })
}

module.exports.deleteOneIncome = (req, res) => {
    let data = req.body

    let unset = {};
    unset["incomes." + Object.keys(data)] = null;

    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown : ' + req.params.id)

    BalanceModel.updateOne(
        { _id: req.params.id }, { $unset: unset }, (err, docs) => {
            if (!err) {
                BalanceModel.find({ _id: req.params.id }, (err, docs) => {
                    res.send(docs)
                }).select('-__v')
            }
            else console.log('Error : ' + err)
        })
}

module.exports.deleteOneFee = (req, res) => {
    let data = req.body

    let unset = {};
    unset["fees." + Object.keys(data)] = null;

    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown : ' + req.params.id)

    BalanceModel.updateOne(
        { _id: req.params.id }, { $unset: unset }, (err, docs) => {
            if (!err) {
                BalanceModel.find({ _id: req.params.id }, (err, docs) => {
                    res.send(docs)
                }).select('-__v')
            }
            else console.log('Error : ' + err)
        })
}