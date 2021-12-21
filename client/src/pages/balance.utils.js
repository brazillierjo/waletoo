export const totalIncome = (userWalletIncomes) => {
    return Object.values(userWalletIncomes).reduce((total, value) => total + value, 0)
}

export const totalFees = (userWalletFees) => {
    return Object.values(userWalletFees).reduce((total, value) => total + value, 0)
}

export const balance = (userWalletIncomes, userWalletFees) => {
    return totalIncome(userWalletIncomes) - totalFees(userWalletFees)
}

export const maxIncome = (userWalletIncomes) => {
    let maxValue = 0;
    let maxKey = '';
    for (const [key, value] of Object.entries(userWalletIncomes)) {
        if (value > maxValue) {
            maxValue = value;
            maxKey = key
        }
    }
    return `${maxKey} : ${maxValue}`
}

export const maxFee = (userWalletFees) => {
    let maxValue = 0;
    let maxKey = '';
    for (const [key, value] of Object.entries(userWalletFees)) {
        if (value > maxValue) {
            maxValue = value;
            maxKey = key
        }
    }
    return `${maxKey} : ${maxValue}`
}

export const feeOnIncome = (userWalletIncomes, userWalletFees) => {
    let percentage = (totalFees(userWalletFees) * 100) / totalIncome(userWalletIncomes)
    let formatedPercentage = percentage.toFixed(1)
    return formatedPercentage
}