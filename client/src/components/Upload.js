import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { uploadPicture } from '../actions/user.actions'
import Modal from 'react-modal'

export default function Upload() {
    const dispatch = useDispatch()
    const userData = useSelector(state => state.userReducer)

    const [file, setFile] = useState()

    const [modalIsOpen, setModalIsOpen] = useState()

    const handlePicture = (e) => {
        e.preventDefault()

        let data = new FormData()
        data.append('file', file)
        data.append('lastname', userData.lastname)
        data.append('id', userData._id)

        dispatch(uploadPicture(data, userData._id))
    }

    return (
        <div>
            <img onClick={() => { setModalIsOpen(true) }} className="pp-pic rounded-full w-56 h-56 mx-auto my-5 hover:opacity-70" src={userData.profilePicture} alt="profile-pic" />

            <div className="text-center">
                <Modal onRequestClose={() => setModalIsOpen(false)} isOpen={modalIsOpen}
                    style={
                        {
                            overlay: {
                                backgroundColor: 'rgba(180, 180, 180, 0.5)',
                                width: '100%'
                            },
                            content: {
                                margin: 'auto',
                                height: '10%',
                                width: '50%'
                            }
                        }
                    }
                >
                    <div className="w-full">
                        <form className="my-5" action="" onSubmit={handlePicture}>
                            <label htmlFor="file"></label>
                            <input type="file" className="w-2/3" id="file" name="file" accept=".jpg, .jpeg, .png" onChange={(e) => setFile(e.target.files[0])} />
                            <input onRequestClose={() => setModalIsOpen(false)} type="submit" value="Enregistrer" className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded" />
                        </form>

                        <hr className="hr" />
                    </div>
                </Modal>
            </div>

        </div>
    )
}