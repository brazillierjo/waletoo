import axios from 'axios'

export const GET_USER = "GET_USER"
export const UPDATE_LAST_NAME = "UPDATE_LAST_NAME"
export const UPDATE_FIRST_NAME = "UPDATE_LAST_NAME"
export const UPLOAD_PICTURE = "UPLOAD_PICTURE"

export const getUser = (uid) => {
    return (dispatch) => {
        return axios
            .get(`https://waletoo.herokuapp.com/api/${uid}`)
            .then((res) => {
                dispatch({ type: GET_USER, payload: res.data })
            })
            .catch((err) => console.log(err))
    }
}

export const updateLastName = (uid, lastname) => {
    return (dispatch) => {
        return axios
            .put(`https://waletoo.herokuapp.com/api/${uid}`, { lastname })
            .then((res) => {
                dispatch({ type: UPDATE_LAST_NAME, payload: lastname })
            })
            .catch((err) => console.log(err))
    }
}

export const updateFirstName = (uid, firstname) => {
    return (dispatch) => {
        return axios
            .put(`https://waletoo.herokuapp.com/api/${uid}`, { firstname })
            .then((res) => {
                dispatch({ type: UPDATE_FIRST_NAME, payload: firstname })
            })
            .catch((err) => console.log(err))
    }
}

export const uploadPicture = (data, id) => {
    return (dispatch) => {
        return axios
            .post(`https://waletoo.herokuapp.com/api/user/upload`, data)
            .then(() => {
                axios.get(`https://waletoo.herokuapp.com/api/${id}`)
                    .then((res) => {
                        dispatch({ type: GET_USER, payload: res.data })
                    })
            })
            .catch((err) => console.log(err))
    }
}