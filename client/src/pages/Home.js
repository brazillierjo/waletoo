import React from 'react'
import homeBackground from '../img/home-background.webp'

export default function Home() {

    return (
        <div className='pt-10' style={{
            backgroundImage: `url(${homeBackground})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'repeat-y',
        }}>
            <section className="relative items-center px-12">
                <h1 className="text-5xl leading-none font-extrabold tracking-tight text-gray-900 mb-8 sm:mb-10"><i className="fab fa-google-wallet text-indigo-500"></i> Waletoo</h1>
                <p className="text-gray-500 text-justify sm:text-center text-4xl sm:leading-10 font-medium mb-10 sm:mb-11">Bienvenue sur votre nouvel outil de gestion de finance favori !</p>
                <p className="text-center sm:text-right text-gray-700 text-lg mb-10">Waletoo, un outil simple qui vient éclaircir la complexité de vos finances</p>

                <hr className="w-2/4 mx-auto"></hr>

                <div className="mt-10 pb-24 sm:flex sm:flex-wrap w-full justify-evenly">
                    <div className="text-gray-700 text-center sm:w-2/5 bg-gray-200 p-5 m-2 rounded">
                        <div className="lg:flex lg:items-center">
                            <div className="lg:flex-shrink-0">
                                <img className="mx-auto rounded-lg md:w-48" src="./docs/img/simplicity.jpg" alt=""></img>
                            </div>
                            <div className="mt-4 lg:mt-0 lg:ml-6">
                                <div className="uppercase tracking-wide text-sm text-indigo-600 font-bold">
                                    Simplicité.
                                </div>
                                <p className="block mt-1 text-lg leading-tight font-semibold text-gray-900 hover:underline">Une interface d'utilisation fluide et facile à prendre en main</p>
                            </div>
                        </div>
                    </div>
                    <div className="text-gray-700 text-center sm:w-2/5 bg-gray-200 p-5 m-2 rounded">
                        <div className="lg:flex lg:items-center">
                            <div className="lg:flex-shrink-0">
                                <img className="mx-auto rounded-lg md:w-48" src="./docs/img/security.jpg" alt=""></img>
                            </div>
                            <div className="mt-4 lg:mt-0 lg:ml-6">
                                <div className="uppercase tracking-wide text-sm text-indigo-600 font-bold">
                                    Sécurité.
                                </div>
                                <p className="block mt-1 text-lg leading-tight font-semibold text-gray-900 hover:underline">Aucune donnée récoltée ou vendue. Ce qui est à vous, est à vous !</p>
                            </div>
                        </div>
                    </div>
                    <div className="text-gray-700 text-center sm:w-2/5 bg-gray-200 p-5 m-2 rounded">
                        <div className="lg:flex lg:items-center">
                            <div className="lg:flex-shrink-0">
                                <img className="mx-auto rounded-lg lg:w-48" src="./docs/img/productivity.jpg" alt=""></img>
                            </div>
                            <div className="mt-4 lg:mt-0 lg:ml-6">
                                <div className="uppercase tracking-wide text-sm text-indigo-600 font-bold">
                                    Efficacité.
                                </div>
                                <p className="block mt-1 text-lg leading-tight font-semibold text-gray-900 hover:underline">Ne rentrez que vos revenus et vos charges, Waletoo se charge du reste. Calcul, graphique, optimisation... Découvrez !</p>
                            </div>
                        </div>
                    </div>
                    <div className="text-gray-700 text-center sm:w-2/5 bg-gray-200 p-5 m-2 rounded">
                        <div className="lg:flex lg:items-center">
                            <div className="lg:flex-shrink-0">
                                <img className="rmx-auto ounded-lg lg:w-48" src="./docs/img/economy.jpg" alt=""></img>
                            </div>
                            <div className="mt-4 lg:mt-0 lg:ml-6">
                                <div className="uppercase tracking-wide text-sm text-indigo-600 font-bold">
                                    Économie.
                                </div>
                                <p className="block mt-1 text-lg leading-tight font-semibold text-gray-900 hover:underline">Aucun frais, aucun supplément. Réalisez vos économies, ne payez pas pour ça !</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}