import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class ErrorPage extends Component {
    render() {
        return (
            <div className="w-full h-screen bg-gray-50">
                <h1 className="text-9xl text-center pt-12">Oups !</h1>
                <p className="text-center text-4xl mt-6">La page que vous recherchez est introuvable. 🤨</p>
                <div className="text-center mt-12">
                    <p className="text-center text-2xl">Cliquez sur le bouton ci-dessous pour retourner à l'accueil de Waletoo 🍀</p>
                    <button className="mt-4 bg-transparent hover:bg-purple-500 text-purple-700 font-semibold hover:text-white py-2 px-4 border border-purple-500 hover:border-transparent rounded">
                        <Link to="/">Accueil</Link>
                    </button>
                </div>
            </div>
        )
    }
}
