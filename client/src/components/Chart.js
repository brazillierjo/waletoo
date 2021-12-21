import React from 'react'
import { Pie } from 'react-chartjs-2'

export default function Chart(props) {
    let keysIncomes = [Object.keys(props.incomes)]
    let valuesIncomes = [Object.values(props.incomes)]

    let keysFees = [Object.keys(props.fees)]
    let valuesFees = [Object.values(props.fees)]

    const colors = [
        "#25CCF7", "#FD7272", "#54a0ff", "#00d2d3", "#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#34495e", "#16a085", "#27ae60", "#2980b9", "#8e44ad", "#2c3e50", "#f1c40f", "#e67e22", "#e74c3c", "#ecf0f1", "#95a5a6", "#f39c12", "#d35400", "#c0392b", "#bdc3c7", "#7f8c8d", "#55efc4", "#81ecec", "#74b9ff", "#a29bfe", "#dfe6e9", "#00b894", "#00cec9", "#0984e3", "#6c5ce7", "#ffeaa7", "#fab1a0", "#ff7675", "#fd79a8", "#fdcb6e", "#e17055", "#d63031", "#feca57", "#5f27cd", "#54a0ff", "#01a3a4"
    ]
    const randomColor = colors[Math.floor(Math.random() * colors.length)]

    let delayed;

    return (
        <div className="flex flex-wrap justify-items-end">
            <div className="w-full sm:w-96 mx-auto mb-5">
                <h2 className="text-center text-2xl mb-4">Revenus</h2>
                <Pie
                    style={{
                        backgroundColor: 'rgba(59, 130, 246, 0.3)',
                        borderRadius: '10px',
                        padding: '5px',
                    }}
                    data={{
                        labels: keysIncomes[0],
                        datasets: [{
                            data: valuesIncomes[0],
                            backgroundColor: colors,
                            borderColor: randomColor
                        }]
                    }}
                    options={{
                        animation: {
                            onComplete: () => {
                                delayed = true;
                            },
                            delay: (context) => {
                                let delay = 0;
                                if (context.type === 'data' && context.mode === 'default' && !delayed) {
                                    delay = context.dataIndex * 700
                                }
                                return delay;
                            }
                        }
                    }} />
            </div>

            <div className="w-full sm:w-96 mx-auto mb-5">
                <h2 className="text-center text-2xl mb-4">Charges</h2>
                <Pie
                    style={{
                        backgroundColor: 'rgb(240, 128, 128, 0.5)',
                        borderRadius: '10px',
                        padding: '5px',
                    }}
                    data={{
                        labels: keysFees[0],
                        datasets: [{
                            label: 'Montant',
                            data: valuesFees[0],
                            backgroundColor: colors,
                            borderColor: randomColor
                        }]
                    }}
                    options={{
                        animation: {
                            onComplete: () => {
                                delayed = true;
                            },
                            delay: (context) => {
                                let delay = 0;
                                if (context.type === 'data' && context.mode === 'default' && !delayed) {
                                    delay = context.dataIndex * 700
                                }
                                return delay;
                            }
                        }
                    }} />
            </div>
        </div>
    )
}
