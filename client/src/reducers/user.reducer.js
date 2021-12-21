import { GET_USER, UPDATE_LAST_NAME, UPDATE_FIRST_NAME, UPLOAD_PICTURE } from "../actions/user.actions"

const initalState = {}

export default function userReducer(state = initalState, action) {
    switch (action.type) {
        case GET_USER:
            return action.payload

        case UPDATE_LAST_NAME:
            return {
                ...state,
                lastname: action.payload,
            }

        case UPDATE_FIRST_NAME:
            return {
                ...state,
                firstname: action.payload,
            }

        case UPLOAD_PICTURE:
            return {
                ...state,
                profilePicture: action.payload,
            }

        default:
            return state
    }
}