import React, { useState, useContext } from 'react'
import { UidContext } from './AppContext'
import Modal from 'react-modal'
import axios from 'axios'

const DeleteUser = () => {
    const [modalIsOpen, setModalIsOpen] = useState()
    const uid = useContext(UidContext)


    const handleDelete = () => {
        axios({
            method: "delete",
            url: `https://waletoo.herokuapp.com/api/${uid}`,
        }).then((res) => {
            window.location = "/"
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <div className="text-center">
            <button onClick={() => { setModalIsOpen(true) }} className="border bg-white shadow-sm hover:bg-red-300 rounded-md p-2">Supprimer mon compte</button>
            <Modal onRequestClose={() => setModalIsOpen(false)} isOpen={modalIsOpen}
                style={
                    {
                        overlay: {
                            backgroundColor: 'rgba(180, 180, 180, 0.5)',
                            width: '100%'
                        },
                        content: {
                            margin: 'auto',
                            height: '30%'
                        }
                    }
                }
            >
                <p>Voulez-vous vraiment supprimer votre compte ?</p>
                <p className="text-gray-600 text-xs">Cette action supprimera toutes vos données et est irréversible.</p>
                <div className="flex flex-wrap">
                    <button className="border rounded-md p-2 mx-auto sm:absolute sm:left-0 sm:bottom-0 m-2 sm:m-5" onClick={() => { setModalIsOpen(false) }}>Annuler</button>
                    <button className="border rounded-md p-2 bg-red-400 text-white sm:absolute sm:right-0 sm:bottom-0 m-2 sm:m-5" onClick={handleDelete}>Oui, je veux supprimer mon compte définitivement</button>
                </div>
            </Modal>
        </div>
    )
}

export default DeleteUser