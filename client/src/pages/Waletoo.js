import React, { Component } from 'react'
import waletooBackground from '../img/waletoo-background.webp'

export default class Waletoo extends Component {
    render() {
        return (
            <div className="py-12 sm:flex sm:flex-wrap w-full" style={{
                backgroundImage: `url(${waletooBackground})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'repeat-y'
            }}>

                <div className="mx-auto p-8 text-white w-11/12 mb-5 sm:w-5/12 bg-gray-700 rounded">
                    <h1 className="text-3xl mb-5">Portemonnaie intelligent</h1>
                    <p className="mb-5 text-justify sm:text-left">Waletoo est le moyen le plus simple et intelligent pour gérer ses finances. 💸<br></br>
                        Une interface simple d'utilisation qui vous fera gagner du temps chaque mois, et réaliser de belles économies (si toutefois vous vous décidez à mettre en place des changements dans vos dépenses, évidemment 🏆).</p>
                    <p>Après avoir rentré vos chiffres, Waletoo génerera différents calculs qui vous permettront d'avoir du recul sur vos dépenses au mois, et à l'année. Vous obtiendrez également des graphiques pour les plus matheux d'entre-nous. 🧐</p>
                </div>

                <div className="mx-auto p-8 text-white w-11/12 mb-5 sm:w-5/12 bg-gray-700 rounded">
                    <h1 className="text-3xl mb-5">Comment ça marche ?</h1>
                    <ul className="list-disc">
                        <li>Vous rentrez le montant de vos revenus mensuels</li>
                        <li>Vous rentrez le montant de vos charges mensuels</li>
                        <li>C'est tout ! 🤗</li>
                    </ul>
                    <p className="mt-5 text-justify sm:text-left">Il ne vous reste plus qu'à voir ce qu'il vous reste chaque mois, et à ajuster vos dépenses comme bon vous semble (cette partie, c'est vous qui la gérez. Waletoo ne va pas fouiller dans vos comptes 😉).</p>
                    <p className="mt-5 text-justify sm:text-left">Jetez un oeil sur l'écran plus bas, ça vous donnera une idée du visuel 👇</p>
                </div>

                <img className="w-full mx-auto" src="./docs/img/iMac.png" alt="iMac mockup"></img>
            </div>
        )
    }
}