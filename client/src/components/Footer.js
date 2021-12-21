import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UidContext } from './AppContext'


export default function Footer() {
    const uid = useContext(UidContext)

    return (
        <footer className="fixed h-10 bg-gray-800 w-full bottom-0 flex items-center justify-center">
            <Link to="/" className="mx-5">
                <i className="fas fa-home text-xl text-white"></i>
            </Link>
            {
                uid ? <Link to="/mon-profile" className="mx-5">
                    <i className="fas fa-user-circle text-xl text-white"></i>
                </Link> : <Link to="/connexion" className="mx-5">
                    <i className="fas fa-user-plus text-xl text-white"></i>
                </Link>
            }
            {
                uid ? null : <Link to="/waletoo" className="mx-5">
                    <i className="fas fa-info-circle text-xl text-white"></i>
                </Link>
            }
            {
                uid ? <Link to="/balance" className="mx-5">
                    <i className="fas fa-wallet text-xl text-white"></i>
                </Link> : null
            }
        </footer>
    )
}