import Tooltip from '@material-ui/core/Tooltip';

export function TooltipIncome() {
    const text = "Cliquez sur le montant du revenu pour le modifier."
    return (
        <Tooltip title={text} placement="top">
            <i className="absolute right-2 text-gray-400 fas fa-question-circle"></i>
        </Tooltip>
    )
}

export function TooltipFee() {
    const text = "Cliquez sur le montant de la charge pour la modifier."
    return (
        <Tooltip title={text} placement="top">
            <i className="absolute right-2 text-gray-400 fas fa-question-circle"></i>
        </Tooltip>
    )
}

export function TooltipBalance() {
    const text = "Cette section ne nécéssite aucune action de votre part. Il s'agit de montants calculés par Waletoo."
    return (
        <Tooltip title={text} placement="top">
            <i className="absolute right-2 text-gray-400 fas fa-question-circle"></i>
        </Tooltip>
    )
}

export function TooltipAdditionalCalc() {
    const text = "Cette section ne nécéssite aucune action de votre part. Il s'agit de montants calculés par Waletoo."
    return (
        <Tooltip title={text} placement="top">
            <i className="absolute right-2 text-gray-400 fas fa-question-circle"></i>
        </Tooltip>
    )
}

export function TooltipAdvice() {
    const text = "test"
    return (
        <Tooltip title={text} placement="top">
            <i className="absolute right-2 text-gray-400 fas fa-question-circle"></i>
        </Tooltip>
    )
}
