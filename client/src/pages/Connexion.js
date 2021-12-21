import React from 'react'
import Log from '../components/Log'
import loginBackground from '../img/login-background.webp'

export default function Connexion() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8"
            style={{
                backgroundImage: `url(${loginBackground})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'repeat-y',
            }}>

            <div className="max-w-md w-full space-y-8">
                <img
                    className="mx-auto h-48 w-auto"
                    src="./docs/img/wallet.png"
                    alt="Waletoo logo" />
                <Log signin={true} signup={false} />
            </div>
        </div>
    )
}
