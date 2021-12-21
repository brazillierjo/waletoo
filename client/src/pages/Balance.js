import React, { useContext, useEffect, useState } from "react"
import axios from "axios"
import balanceBackground from '../img/balance-background.webp'
import { UidContext } from "../components/AppContext"
import { TooltipIncome, TooltipFee, TooltipBalance, TooltipAdditionalCalc } from "../components/Tooltip"
import { totalIncome, totalFees, balance, maxIncome, maxFee, feeOnIncome } from "./balance.utils"
import Chart from "../components/Chart"

export default function Balance() {
    const uid = useContext(UidContext)
    const [userWalletIncomes, setUserWalletIncomes] = useState({})
    const [userWalletFees, setUserWalletFees] = useState({})
    const [formIncomes, setformIncomes] = useState(false)
    const [formFees, setformFees] = useState(false)
    const [incomeCall, setIncomeCall] = useState('nom...')
    const [incomeNum, setIncomeNum] = useState('somme...')
    const [feeCall, setFeeCall] = useState('nom...')
    const [feeNum, setFeeNum] = useState('somme...')

    useEffect(() => {
        if (uid !== null) {
            axios.get(`https://waletoo.herokuapp.com/api/balance/${uid}`)
                .then((res) => {
                    if (res.data[0].incomes && res.data[0].fees) {
                        setUserWalletIncomes(res.data[0].incomes)
                        setUserWalletFees(res.data[0].fees)
                    } else if (res.data[0].incomes && !res.data[0].fees) {
                        setUserWalletIncomes(res.data[0].incomes)
                        setUserWalletFees({ 'Charge': '' })
                    } else if (!res.data[0].incomes && res.data[0].fees) {
                        setUserWalletIncomes({ 'Revenu': '' })
                        setUserWalletFees(res.data[0].fees)
                    } else if (!res.data[0].incomes && !res.data[0].fees) {
                        setUserWalletIncomes({ 'Revenu': '' })
                        setUserWalletFees({ 'Charge': '' })
                    }
                })
        }
    }, [uid])

    // ********** ADD INCOME *********
    const handleAddIncome = () => {
        let incomeName = document.getElementById('newIncomeName').value
        let incomeAmount = document.getElementById('newIncomeAmount').value
        let data = {
            [incomeName]: parseInt(incomeAmount)
        }
        if ((incomeName.length > 0 && incomeName !== 'nom de revenu...') && incomeAmount > 0) {
            axios({
                method: "put",
                url: `https://waletoo.herokuapp.com/api/balance/${uid}`,
                withCredentials: true,
                data: { incomes: { ...userWalletIncomes, ...data } }
            }).then(() => {
                setUserWalletIncomes({ ...userWalletIncomes, ...data })
                setIncomeCall('nom de revenu...')
                setIncomeNum('somme...')
            })
        }
    }
    const handleClearIncomeCall = () => {
        setIncomeCall('')
    }
    const handleClearIncomeNum = () => {
        setIncomeNum('')
    }
    const handleEnterIncome = (e) => {
        if (e.keyCode === 13) {
            handleAddIncome()
        }
    }
    //***************************/


    // ********** ADD FEE *********
    const handleAddFee = () => {
        let feeName = document.getElementById('newFeeName').value
        let feeAmount = document.getElementById('newFeeAmount').value
        let data = {
            [feeName]: parseInt(feeAmount)
        }
        if ((feeName.length > 0 && feeName !== 'nom de mensualité...') && feeAmount > 0) {
            axios({
                method: "put",
                url: `https://waletoo.herokuapp.com/api/balance/${uid}`,
                withCredentials: true,
                data: { fees: { ...userWalletFees, ...data } }
            }).then(() => {
                setUserWalletFees({ ...userWalletFees, ...data })
                setFeeCall('nom de mensualité...')
                setFeeNum('somme...')
            })
        }
    }
    const handleClearFeeCall = () => {
        setFeeCall('')
    }
    const handleClearFeeNum = () => {
        setFeeNum('')
    }
    const handleEnterFee = (e) => {
        if (e.keyCode === 13) {
            handleAddFee()
        }
    }
    //***************************/


    // ********** UPDATE *********
    const handleUpdateIncome = () => {
        let data = {
            incomes:
                { ...userWalletIncomes }
        }
        axios({
            method: "put",
            url: `https://waletoo.herokuapp.com/api/balance/${uid}`,
            withCredentials: true,
            data: data
        }).then(setformIncomes(false)
        )
    }
    const handleUpdateFee = () => {
        let data = {
            fees:
                { ...userWalletFees }
        }
        axios({
            method: "put",
            url: `https://waletoo.herokuapp.com/api/balance/${uid}`,
            withCredentials: true,
            data: data
        }).then(setformFees(false)
        )
    }
    //***************************/


    // ********** DELETE *********
    const handleDeleteIncome = (key) => {
        let data = { [key]: "" }
        axios({
            method: "delete",
            url: `https://waletoo.herokuapp.com/api/balanceOneIncome/${uid}`,
            data: data
        }).then((res) => {
            if (res.data[0].incomes) {
                setUserWalletIncomes(res.data[0].incomes)
                setformIncomes(false)
            } else {
                setUserWalletIncomes({})
                setformIncomes(false)
            }
        })
    }
    const handleDeleteFee = (key) => {
        let data = { [key]: "" }
        axios({
            method: "delete",
            url: `https://waletoo.herokuapp.com/api/balanceOneFee/${uid}`,
            data: data
        }).then((res) => {
            if (res.data[0].fees) {
                setUserWalletFees(res.data[0].fees)
                setformFees(false)
            } else {
                setUserWalletFees({})
                setformFees(false)
            }
        })
    }
    //***************************/

    return (
        <div>
            <div style={{
                backgroundImage: `url(${balanceBackground})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                paddingBottom: '50px'
            }}>
                <div className="flex flex-wrap justify-evenly">
                    <section className="relative p-3 mt-5 w-11/12 sm:w-1/4 text-center bg-white shadow-blue rounded-sm">
                        <TooltipIncome />
                        <h1 className="text-3xl my-5 text-blue-600">Revenus</h1>

                        {/* FORM REVENU FALSE */}
                        {formIncomes === false && (
                            Object.entries(userWalletIncomes).map(([key, value]) => {
                                return (
                                    <div className="flex justify-items-center relative" key={key}>
                                        <p className="w-6/12 bg-blue-100 p-1 m-1 rounded-md">{key}</p>
                                        <p onClick={(e) => setformIncomes(true)}
                                            className="w-6/12 bg-blue-100 m-1 p-1 text-blue-600 rounded-md">
                                            {value}
                                            <span className="text-blue-300 ml-1">€</span>
                                            <button onClick={(e) => handleDeleteIncome(key)}
                                                className="absolute right-2 rounded-lg px-1">
                                                <i className="fas fa-times text-red-300 hover:text-red-600 text-sm"></i>
                                            </button>
                                        </p>
                                    </div>
                                )
                            })
                        )}
                        {formIncomes === false && (
                            <div className="flex relative">
                                <form onKeyDown={(e) => handleEnterIncome(e)} className="m-auto">
                                    <input className="w-38 bg-gray-100 italic p-1 m-1 text-blue-400 text-xs border-0 rounded-md"
                                        id="newIncomeName"
                                        name="newIncomeName"
                                        type="text"
                                        value={incomeCall}
                                        onChange={(e) => setIncomeCall(e.target.value)}
                                        onClick={handleClearIncomeCall}
                                    />

                                    <input className="w-38 bg-gray-100 italic p-1 m-1 text-blue-400 text-xs border-0 rounded-md"
                                        id="newIncomeAmount"
                                        name="newIncomeAmount"
                                        type="text"
                                        value={incomeNum}
                                        onChange={(e) => setIncomeNum(e.target.value)}
                                        onClick={handleClearIncomeNum}
                                    />
                                </form>
                                <div className="flex">
                                    <button onClick={handleAddIncome}
                                        className="absolute right-0 rounded-lg px-1">
                                        <i className="absolute right-0 fas fa-check text-blue-200 hover:text-blue-500 text-xs m-2"></i>
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* FORM REVENU TRUE */}
                        {formIncomes === true && (
                            Object.entries(userWalletIncomes).map(([key, value]) => {
                                return (
                                    <div className="mx-auto flex text-center" key={key}>
                                        <p className="w-6/12 bg-blue-50 p-1 m-1 capitalize rounded-md">{key}</p>
                                        <input className="w-6/12 bg-gray-100 p-1 m-1 text-blue-700 text-center border-0 rounded-md"
                                            value={value}
                                            type="text"
                                            pattern="[0-9]*"
                                            onChange={(e) => setUserWalletIncomes({ ...userWalletIncomes, ...userWalletIncomes.incomes, [key]: parseInt(e.target.value) })} />
                                    </div>
                                )
                            })
                        )}
                        {formIncomes === true && (
                            <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold mt-3 py-1 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" onClick={handleUpdateIncome}>
                                Enregistrer
                            </button>
                        )}
                    </section>




                    <section className="relative p-3 mt-5 w-11/12 sm:w-1/4 text-center bg-white shadow-red rounded-sm">
                        <TooltipFee />
                        <h1 className="text-3xl my-5 text-red-600">Charges</h1>
                        {/* FORM CHARGES FALSE */}
                        {formFees === false && (
                            Object.entries(userWalletFees).map(([key, value]) => {
                                return (
                                    <div className="flex justify-items-center relative" key={key}>
                                        <p className="w-6/12 bg-red-100 p-1 m-1 capitalize rounded-md">{key}</p>
                                        <p onClick={(e) => setformFees(true)}
                                            className="w-6/12 bg-red-100 m-1 p-1 text-red-600 rounded-md">{value}
                                            <span className="text-red-300 ml-1">€</span>
                                            <button onClick={(e) => handleDeleteFee(key)}
                                                className="absolute right-2 px-1">
                                                <i className="fas fa-times text-red-300 hover:text-red-600 text-sm"></i>
                                            </button>
                                        </p>
                                    </div>
                                )
                            })
                        )}
                        {formFees === false && (
                            <div className="text-left flex relative">
                                <form onKeyDown={(e) => handleEnterFee(e)} className="m-auto">
                                    <input className="w-38 bg-gray-100 italic p-1 m-1 text-red-500 text-xs border-0 rounded-md" id="newFeeName"
                                        name="newFeeName"
                                        type="text"
                                        value={feeCall}
                                        onChange={(e) => setFeeCall(e.target.value)}
                                        onClick={handleClearFeeCall}
                                    />
                                    <input className="w-38 bg-gray-100 italic p-1 m-1 text-red-500 text-xs border-0 rounded-md" id="newFeeAmount"
                                        name="newFeeAmount"
                                        type="text"
                                        value={feeNum}
                                        onChange={(e) => setFeeNum(e.target.value)}
                                        onClick={handleClearFeeNum}
                                    />
                                </form>
                                <button className="absolute right-0 px-1 m-1" onClick={handleAddFee}>
                                    <i className="fas fa-check text-red-300 hover:text-red-500 text-xs"></i>
                                </button>
                            </div>
                        )}

                        {/* FORM CHARGES TRUE */}
                        {formFees === true && (
                            Object.entries(userWalletFees).map(([key, value]) => {
                                return (
                                    <div className="mx-auto flex" key={key}>
                                        <p className="w-6/12 bg-red-50 p-1 m-1 capitalize rounded-md">{key}</p>
                                        <input className="w-6/12 bg-gray-100 p-1 m-1 text-red-500 text-center border-0 rounded-md"
                                            value={value}
                                            type="text"
                                            pattern="[0-9]*"
                                            onChange={(e) => setUserWalletFees({ ...userWalletFees, ...userWalletFees.incomes, [key]: parseInt(e.target.value) })} />
                                    </div>
                                )
                            })
                        )}
                        {formFees === true && (
                            <button className="bg-red-500 hover:bg-red-400 text-white font-bold mt-3 py-1 px-4 border-b-4 border-red-700 hover:border-red-500 rounded" onClick={(e) => handleUpdateFee(e)}>
                                Enregistrer
                            </button>
                        )}

                    </section>

                    <section className="relative p-2 mt-5 w-11/12 sm:w-1/3 text-center bg-white shadow-gray rounded-sm">
                        <TooltipBalance />
                        <h1 className="text-3xl my-5">Solde</h1>
                        <div className="mx-auto">
                            <div className="text-center mx-auto flex">
                                <p className="w-6/12 bg-gray-100 p-1 m-1 rounded-md">Montant des revenus</p>
                                <p className="w-6/12 bg-gray-100 p-1 m-1 rounded-md text-blue-500">{totalIncome(userWalletIncomes)}€</p>
                            </div>
                            <div className="text-center mx-auto flex">
                                <p className="w-6/12 bg-gray-100 p-1 m-1 rounded-md">Montant des charges</p>
                                <p className="w-6/12 bg-gray-100 p-1 m-1 rounded-md text-red-400">{totalFees(userWalletFees)}€</p>
                            </div>
                            <div className="text-center mx-auto flex">
                                <p className="w-6/12 bg-gray-100 p-1 m-1 rounded-md">Solde final</p>
                                <p className="w-6/12 bg-gray-100 p-1 m-1 rounded-md">{balance(userWalletIncomes, userWalletFees)}€</p>
                            </div>

                            <hr className="hr" />

                            <div className="w-full text-center mx-auto flex">
                                <p className="w-1/2 bg-gray-100 p-1 m-1 rounded-md">Revenu le plus élevé</p>
                                <p className="w-1/2 bg-gray-100 p-1 m-1 rounded-md text-blue-400 capitalize">{maxIncome(userWalletIncomes)}€</p>
                            </div>
                            <div className="w-full text-center mx-auto flex">
                                <p className="w-1/2 bg-gray-100 p-1 m-1 rounded-md">Charge la plus élevée</p>
                                <p className="w-1/2 bg-gray-100 p-1 m-1 rounded-md text-red-400 capitalize">{maxFee(userWalletFees)}€</p>
                            </div>
                            <div className="w-full text-center mx-auto flex">
                                <p className="w-1/2 bg-gray-100 p-1 m-1 rounded-md">Part de charge sur le(s) revenu(s)</p>
                                <p className="w-1/2 bg-gray-100 p-1 m-1 rounded-md capitalize">{feeOnIncome(userWalletIncomes, userWalletFees)}%</p>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="flex flex-wrap">
                    <section className="relative w-11/12 sm:w-9/12 mx-auto mt-12 p-2 bg-white normal-case rounded-sm">
                        <TooltipAdditionalCalc />
                        <h1 className="text-center mb-8 font-semibold text-3xl">Représentation visuelle</h1>
                        <Chart incomes={userWalletIncomes} fees={userWalletFees} />
                    </section>
                </div>

            </div >
        </div >
    )
}