import React, { useContext } from "react"
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { UidContext } from './AppContext'
import Logout from "./Log/Logout"

export default function Dropdown({ isOpen, toggle }) {
    const uid = useContext(UidContext)
    const userData = useSelector(state => state.userReducer)

    return (
        <div className={isOpen ? 'flex flex-col text-white text-center bg-gray-700' : 'hidden'} onClick={toggle}>
            <Link
                to="/"
                className="my-2">
                Accueil</Link>

            <Link
                to="/waletoo"
                className="mt-2 mb-5">
                Waletoo, c'est quoi ?</Link>

            <hr />

            <div className="">
                {uid ? (
                    <div className="flex flex-col">
                        <p className="mb-2 mt-5 text-gray-300 capitalize">Bonjour <span className="font-bold">{userData.firstname}</span> 👋</p>
                        <Link
                            to="/mon-profile"
                            className="my-2 text-gray-300 hover:text-black hover:bg-white px-2 py-1 rounded-sm">
                            Mon compte <i className="fas fa-user-circle text-md text-white"></i>
                        </Link>
                        <Link
                            to="/balance"
                            className="my-2 text-gray-300 hover:text-black hover:bg-white px-2 py-1 rounded-sm">
                            Mon Wallet <i className="fas fa-wallet text-md text-white"></i>
                        </Link>
                        <Logout />
                    </div>
                ) : (
                    <Link
                        to="/connexion"
                        className="text-gray-300 hover:text-black hover:bg-white rounded-sm">Se connecter
                        <i className="my-5 ml-3 fas fa-sign-in-alt text-blue-400"></i></Link>
                )}
            </div>
        </div>
    )
}
