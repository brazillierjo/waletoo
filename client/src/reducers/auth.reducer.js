const initalState = { authData: null }

const AUTH = 'AUTH'
// const LOGOUT = 'LOGOUT'

export default function authReducer(state = initalState, action) {
    switch (action.type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }))
            return { ...state, authData: action?.data }

        default:
            return state
    }
}