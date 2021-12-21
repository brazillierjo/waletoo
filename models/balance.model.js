const mongoose = require('mongoose')

const balanceSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'user'
    },
    incomes: { Number },
    fees: { Number },
},
    { strict: false })

const BalanceModel = mongoose.model('balance', balanceSchema)

module.exports = BalanceModel