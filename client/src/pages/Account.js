import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateLastName, updateFirstName } from '../actions/user.actions'
import accountBackground from '../img/account-background.webp'
import DeleteUser from '../components/DeleteUser'
import Upload from '../components/Upload'

export default function Account() {
    // data user
    const dispatch = useDispatch()
    const userData = useSelector(state => state.userReducer)

    // state
    const [formLastname, setformLastname] = useState(false)
    const [formFirstname, setformFirstname] = useState(false)
    const [lastname, setLastname] = useState('')
    const [firstname, setFirstname] = useState('')

    // dates
    const dateCreate = new Date(userData.createdAt)
    const dateUpdate = new Date(userData.updatedAt)
    const dateCreated = dateCreate.getDate() + '/' + dateCreate.getMonth() + '/' + dateCreate.getFullYear()
    const dateUpdated = dateUpdate.getDate() + '/' + dateUpdate.getMonth() + '/' + dateUpdate.getFullYear() + ' à ' + dateUpdate.getHours() + 'h'

    const handleLastName = () => {
        dispatch(updateLastName(userData._id, lastname))
        setformLastname(false)
    }

    const handleFirstName = () => {
        dispatch(updateFirstName(userData._id, firstname))
        setformFirstname(false)
        window.location.reload()
    }

    return (
        <div className="flex h-screen" style={{
            backgroundImage: `url(${accountBackground})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            paddingBottom: '50px'
        }}>

            <div className="m-auto w-full lg:w-3/5 bg-white rounded-lg p-5">
                <h3 className="text-center font-bold sm:text-4xl text-3xl mb-4">MES INFORMATIONS</h3>
                <div className="flex flex-wrap justify-center">

                    <div className="w-full lg:w-4/6 p-2 bg-gray-100 rounded-lg">
                        <Upload />
                        <div className="w-5/6 mx-auto">
                            {formLastname === false && (
                                <>
                                    <form className="flex flex-wrap justify-between">
                                        <label className="w-1/3 h-8 text-left rounded-md p-1 text-gray-500">Nom:</label>
                                        <p className="h-8 ml-2 text-right p-1 uppercase">{userData.lastname}
                                            <button onClick={() => { setformLastname(!formLastname) }}
                                                className="ml-2 h-8 w-8 rounded-full">
                                                <i className="far fa-edit text-gray-500"></i>
                                            </button>
                                        </p>
                                    </form>
                                </>
                            )}
                            {formLastname && (
                                <>
                                    <form className="flex flex-wrap justify-between">
                                        <label className="w-1/3 h-8 rounded-md p-1 text-gray-500">Nom:</label>
                                        <input className="w-1/3 h-8 bg-gray-200 p-1 ml-2 border-none rounded-md uppercase"
                                            type="text"
                                            defaultValue={userData.lastname}
                                            onChange={(e) => setLastname(e.target.value)}
                                            required
                                        />
                                        <button onClick={handleLastName}
                                            className="ml-2 border h-8 w-8 bg-green-500 rounded-full">
                                            <i className="fas fa-check text-white"></i>
                                        </button>
                                    </form>
                                </>
                            )}

                            {formFirstname === false && (
                                <>
                                    <form className="flex flex-wrap justify-between">
                                        <label className="w-1/3 h-8 text-left rounded-md p-1 text-gray-500">Prénom:</label>
                                        <p className="h-8 ml-2 text-right p-1 uppercase">{userData.firstname}
                                            <button onClick={() => { setformFirstname(!formFirstname) }}
                                                className="ml-2 h-8 w-8 rounded-full">
                                                <i className="far fa-edit text-gray-500"></i>
                                            </button>
                                        </p>
                                    </form>
                                </>
                            )}
                            {formFirstname && (
                                <>
                                    <form className="flex flex-wrap justify-between">
                                        <label className="w-1/3 h-8 rounded-md p-1 text-gray-500">Prénom:</label>
                                        <input className="w-1/3 h-8 bg-gray-200 p-1 ml-2 border-none rounded-md uppercase"
                                            type="text"
                                            defaultValue={userData.firstname}
                                            onChange={(e) => setFirstname(e.target.value)}
                                            required
                                        />
                                        <button onClick={handleFirstName}
                                            className="ml-2 border h-8 w-8 bg-green-500 rounded-full">
                                            <i className="fas fa-check text-white"></i>
                                        </button>
                                    </form>
                                </>
                            )}
                        </div>

                        <hr className="hr" />

                        <div className="mx-auto w-5/6">
                            <div className="flex flex-wrap justify-between">
                                <p className="mb-3 text-left text-gray-500">Email :</p>
                                <p className="text-right">{userData.email}</p>
                            </div>

                            <div className="flex flex-wrap justify-between">
                                <p className="mb-3 text-left text-gray-500">Date de création :</p>
                                <p className="text-right">{dateCreated}</p>
                            </div>

                            <div className="flex flex-wrap justify-between">
                                <p className="mb-3 text-gray-500">Dernière mise à jour :</p>
                                <p>{dateUpdated}</p>
                            </div>
                        </div>

                        <DeleteUser />

                    </div>


                </div>
            </div>
        </div>
    )
}