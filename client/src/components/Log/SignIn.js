import React, { useState } from 'react'
import { LockClosedIcon } from '@heroicons/react/solid'
import axios from 'axios'

export default function SignIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = (e) => {
        e.preventDefault()
        const emailError = document.getElementById('emailError')
        const passwordError = document.getElementById('passwordError')

        axios({
            method: "post",
            url: `https://waletoo.herokuapp.com/api/login`,
            withCredentials: true,
            data: {
                email,
                password
            }
        }).then((res) => {
            if (res.data.errors) {
                emailError.innerHTML = res.data.errors.email
                passwordError.innerHTML = res.data.errors.password
            } else {
                window.location = "/balance"
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Connectez-vous à votre compte</h2>
            <form className="mt-8 space-y-6" action="" onSubmit={handleLogin} id="signInForm">
                <div className="rounded-md shadow-sm -space-y-px">
                    <div>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Adresse e-mail"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                        <div id="emailError" className="text-red-400"></div>
                    </div>
                    <div>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Mot de passe"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                        <div id="passwordError" className="text-red-400"></div>
                    </div>
                </div>

                <button
                    type="submit"
                    className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                        <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-green-400" aria-hidden="true" />
                    </span>Se connecter</button>
            </form>
        </>
    )
}