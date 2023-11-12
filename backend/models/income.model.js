const mongoose = require("mongoose");

const IncomeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    label: {
        type: String,
        required: [true, "Label is required."],
    },
    amount: {
        type: Number,
        required: [true, "Amount is required."],
    },
});

module.exports = mongoose.model("Income", IncomeSchema);
