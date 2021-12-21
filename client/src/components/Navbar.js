import React, { useContext } from "react"
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { UidContext } from './AppContext'
import Logout from "./Log/Logout"

function Nav({ toggle }) {
    const uid = useContext(UidContext)
    const userData = useSelector(state => state.userReducer)

    return (
        <nav className="bg-gray-800 w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex md:items-center">
                        <Link to="/">
                            <div className="flex-shrink-0">
                                <i className="fab fa-google-wallet text-5xl text-indigo-500"></i>
                            </div>
                        </Link>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <Link
                                    to="/"
                                    className="hover:bg-gray-700 text-white px-3 py-1 rounded-md text-sm font-medium">
                                    Accueil</Link>

                                <Link
                                    to="/waletoo"
                                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-1 rounded-md text-sm font-medium">
                                    Waletoo, c'est quoi ?</Link>

                                <div className="sm:absolute sm:right-0 sm:items-center mt-1">
                                    {uid ? (
                                        <div className="flex">
                                            <p className="text-gray-300 px-3 rounded-md text-sm font-medium capitalize mr-12">Bonjour {userData.firstname} 👋</p>
                                            <Link
                                                to="/mon-profile"
                                                className="mr-6 text-gray-300 hover:bg-gray-700 px-3 rounded-md text-sm font-medium">
                                                Mon compte <i className="fas fa-user-circle text-xs text-white"></i>
                                            </Link>

                                            <Link
                                                to="/balance"
                                                className="mr-6 text-gray-300 hover:bg-gray-700 px-3 rounded-md text-sm font-medium">
                                                Mon Wallet <i className="fas fa-wallet text-xs text-white"></i>
                                            </Link>
                                            <Logout />
                                        </div>
                                    ) : (
                                        <Link
                                            to="/connexion"
                                            className="mr-12 text-gray-300 hover:bg-gray-700 px-3 rounded-md font-medium">
                                            <i className="fas fa-sign-in-alt text-blue-400"></i></Link>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="px-4 cursor-pointer md:hidden" onClick={toggle}>
                            <svg className="w-10 h-10 text-white absolute right-5 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Nav;